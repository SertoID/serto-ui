const AUTH_LOCALSTORAGE_KEY = "trust-agent-auth";

export interface TrustAgencyServiceConfig {
  url: string;
}

export interface Auth {
  tenantID: string;
  token: string;
}
export class TrustAgencyService {
  private auth?: Auth;
  public url: string;

  constructor(config: TrustAgencyServiceConfig) {
    this.url = config.url;
    this.loadAuthFromStorage();
  }

  public getAuth(): Auth | undefined {
    return this.auth;
  }

  public async login(tenantID: string, token: string): Promise<Auth> {
    const auth = { tenantID, token };
    this.setAuth(auth);

    if (tenantID === "admin") {
      try {
        await this.getTenants();
        console.log("logged in successfully as admin");
      } catch (err) {
        this.logout();
        throw new Error("invalid admin token");
      }
    } else {
      try {
        await this.getTenantIdentifiers();
        console.log("logged in successfully as tenant");
      } catch (err) {
        console.error("error on tenant ping:", err);
        this.logout();
        throw new Error("invalid tenant credentials");
      }
    }

    return auth;
  }

  public async logout() {
    this.clearAuth();
  }

  public isAuthenticated(): boolean {
    return !!this.auth;
  }

  public async getTenants(): Promise<any> {
    return this.request("/v1/admin/tenants");
  }

  public async createTenant(name: string): Promise<any> {
    return this.request("/v1/admin/tenants", "POST", { name });
  }

  public async activateTenant(token: string): Promise<any> {
    return this.request("/v1/tenant/activate", "POST", { activateJwt: token }, true);
  }

  public async getTenantIdentifiers(): Promise<any> {
    return this.request("/v1/tenant/identifiers");
  }

  public async createTenantIdentifier(): Promise<any> {
    return this.request("/v1/tenant/identifiers", "POST");
  }

  public async getCredentials(): Promise<any> {
    return this.request("/v1/tenant/credentials");
  }

  public async issueVc(body: any): Promise<any> {
    return this.request("/v1/tenant/credentials/issue", "POST", body);
  }

  private async request(
    path: string,
    method: "GET" | "POST" = "GET",
    body?: any,
    unauthenticated?: boolean,
  ): Promise<any> {
    if (!unauthenticated) {
      this.ensureAuthenticated();
    }

    const headers: any = {};
    if (this.auth?.token) {
      headers.authorization = `Bearer ${this.auth?.token}`;
    }
    if (this.auth?.tenantID !== "admin") {
      headers.tenant = this.auth?.tenantID;
    }
    if (body) {
      headers["Content-Type"] = "application/json";
    }

    const response = await fetch(`${this.url}${path}`, {
      method,
      headers,
      body: JSON.stringify(body),
    });
    if (!response.ok) {
      const errorMessage = await response.text();
      console.error("api error", response.status, errorMessage);
      throw new Error("api error: " + errorMessage);
    }
    const data = await response.json();

    return data;
  }

  private setAuth(auth: Auth) {
    this.auth = auth;
    localStorage.setItem(AUTH_LOCALSTORAGE_KEY, JSON.stringify(auth));
  }

  private clearAuth() {
    delete this.auth;
    localStorage.removeItem(AUTH_LOCALSTORAGE_KEY);
  }

  private ensureAuthenticated() {
    if (!this.auth) {
      throw new Error("not authenticated");
    }
  }

  private loadAuthFromStorage(): void {
    const authString = localStorage.getItem(AUTH_LOCALSTORAGE_KEY);

    if (authString === "" || authString === null) {
      return;
    }

    try {
      const auth = JSON.parse(authString);
      this.auth = auth;
    } catch (err) {
      console.error("failed to parse auth", authString);
    }
  }
}

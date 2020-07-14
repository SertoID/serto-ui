const AUTH_LOCALSTORAGE_KEY = "trust-agent-auth";

export interface TrustAgencyServiceConfig {
  url: string;
}

export interface Auth {
  jwt: string;
  tenant?: string;
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

  public async signup(jwt: string): Promise<any> {
    const user = await this.request("/v1/tenant/users/signup", "POST", { userToken: jwt }, true);
    console.log({ user });
    this.login(jwt);
  }

  public async login(jwt: string): Promise<any> {
    this.setAuth({ jwt });
    const user = await this.request("/v1/tenant/users/currentUser");
    console.log({ user });
    const tenant = user.tenants[0].id;
    this.setAuth({ jwt, tenant });
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
    return this.request("/v1/tenant/agent/identityManagerGetIdentities", "POST");
  }

  public async createTenantIdentifier(): Promise<any> {
    return this.request("/v1/tenant/agent/identityManagerCreateIdentity", "POST");
  }

  public async getCredentials(): Promise<any> {
    return this.request("/v1/tenant/agent/dataStoreORMGetVerifiableCredentials", "POST");
  }

  public async issueVc(body: any): Promise<any> {
    return this.request("/v1/tenant/agent/createVerifiableCredential", "POST", body);
  }

  public async getFeeds(): Promise<any> {
    return this.request("/v1/feeds");
  }

  public async createFeed(data: { name: string; slug: string; description: string }): Promise<any> {
    return this.request("/v1/feeds", "POST", data);
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
    if (this.auth?.jwt) {
      headers.authorization = `Bearer ${this.auth.jwt}`;
    }
    if (this.auth?.tenant) {
      headers.tenant = this.auth.tenant;
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

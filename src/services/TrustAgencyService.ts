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

    return auth;
  }

  public isAuthenticated(): boolean {
    return !!this.auth;
  }

  public async getTenants(): Promise<any> {
    this.ensureAuthenticated();
    const response = await fetch(`${this.url}/v1/admin`, {
      headers: {
        authorization: `Bearer ${this.auth?.token}`,
      },
    });
    if (response.status !== 200) {
      console.error("api error", response.status);
      throw new Error("api error");
    }
    const data = await response.json();

    return data;
  }

  private setAuth(auth: Auth) {
    this.auth = auth;
    localStorage.setItem(AUTH_LOCALSTORAGE_KEY, JSON.stringify(auth));
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

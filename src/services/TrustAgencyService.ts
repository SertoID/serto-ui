import { config } from "../config";
import { SchemaDataInput, SchemaDataResponse } from "../components/elements/components/Schemas/types";

const AUTH_LOCALSTORAGE_KEY = `trust-agent-auth-${config.API_URL}`;

export interface Auth {
  jwt: string;
  tenantid?: string;
}
export class TrustAgencyService {
  private auth?: Auth;
  private defaultFeedId?: string;
  private loggingIn?: boolean;
  public url = config.API_URL;

  constructor() {
    this.loadAuthFromStorage();
    this.onDocumentReady();
  }

  public getAuth(): Auth | undefined {
    return this.auth;
  }

  public async signup(jwt: string): Promise<any> {
    this.loggingIn = true;
    const user = await this.request("/v1/users/signup", "POST", { userToken: jwt }, true);
    console.log({ user });
    const tenantid = user.tenants[0].tenantId;
    this.setAuth({ jwt, tenantid }, true);
    this.loggingIn = false;
  }

  public async login(jwt: string): Promise<any> {
    this.loggingIn = true;
    this.setAuth({ jwt });
    const user = await this.request("/v1/users/currentUser");
    console.log({ user });
    const tenantOrg = user.tenants.find((tenant: { Tenant_type: string }) => tenant.Tenant_type === "organization");
    const tenantid = tenantOrg ? tenantOrg.Tenant_id : user.tenants[0].Tenant_id;
    this.setAuth({ jwt, tenantid }, true);
    this.loggingIn = false;

    this.authenticateExtension(jwt, tenantid);
  }

  public async getUser(): Promise<any> {
    return this.request("/v1/users/currentUser");
  }

  public async logout() {
    this.clearAuth();
  }

  public isAuthenticated(): boolean {
    return !!this.auth && !this.loggingIn;
  }

  public switchTenant(tenantid: string) {
    const jwt = this.getAuth()?.jwt;
    if (jwt) {
      this.setAuth({ jwt, tenantid }, true);
      window.location.reload();
    }
  }

  public async getTenants(): Promise<any> {
    return this.request("/v1/admin/tenants");
  }

  public async createTenant(name: string, type: string): Promise<any> {
    return this.request("/v1/tenant", "POST", { name, type });
  }

  public async activateTenant(token: string): Promise<any> {
    return this.request("/v1/tenant/activate", "POST", { activateJwt: token }, true);
  }

  public async getTenantIdentifiers(): Promise<any> {
    return this.request("/v1/tenant/agent/identityManagerGetIdentities", "POST");
  }

  public async getTenantFirstIdentifier(): Promise<any> {
    const identifiers = await this.request("/v1/tenant/agent/identityManagerGetIdentities", "POST");
    return identifiers?.[0]?.did;
  }

  public async getTenantIdentifier(did: string): Promise<any> {
    return this.request("/v1/tenant/agent/identityManagerGetIdentity", "POST", { did });
  }

  public async createTenantIdentifier(alias?: string): Promise<any> {
    return this.request("/v1/tenant/agent/identityManagerCreateIdentity", "POST", { alias });
  }

  public async setTenantIdentifierAlias(did: string, alias: string): Promise<any> {
    return this.request("/v1/tenant/agent/identityManagerSetAlias", "POST", { did, alias });
  }

  public async getCredentials(): Promise<any> {
    return this.request("/v1/tenant/agent/dataStoreORMGetVerifiableCredentials", "POST");
  }

  public async issueVc(body: any): Promise<any> {
    return this.request("/v1/tenant/agent/createVerifiableCredential", "POST", body);
  }

  public async getApiKeys(): Promise<any> {
    return this.request("/v1/tenant/apiKeys");
  }

  public async getTenantMembers(): Promise<any> {
    return this.request("/v1/tenant/members");
  }

  public async getFeeds(): Promise<any> {
    return this.request("/v1/feeds");
  }

  public async getFeedBySlug(slug: string): Promise<any> {
    return this.request(`/v1/feeds/${slug}`);
  }

  /** Get NATS JWT bearer token. */
  public async getFeedToken(feedId?: string, expirationInSeconds = 60): Promise<any> {
    return this.request("/v1/feeds/token", "POST", {
      feedId: feedId || (await this.getDefaultFeedId()),
      expirationInSeconds,
    });
  }

  public async createFeed(data: { name: string; slug: string; description?: string; public?: boolean }): Promise<any> {
    return this.request("/v1/feeds", "POST", {
      tenantId: this.getAuth()?.tenantid,
      ...data,
    });
  }

  public async getSchemas(global?: boolean): Promise<SchemaDataResponse[]> {
    return this.request(`/v1/schemas${global ? "?global=true" : ""}`);
  }

  public async createSchema(schema: SchemaDataInput): Promise<any> {
    return this.request("/v1/schemas", "POST", {
      tenantId: this.getAuth()?.tenantid,
      ...schema,
    });
  }

  public async createApiKey(data: { keyName: string }): Promise<any> {
    return this.request("/v1/tenant/apiKeys", "POST", {
      tenantId: this.getAuth()?.tenantid,
      ...data,
    });
  }

  public async getInviteCode(): Promise<any> {
    return this.request("/v1/tenant/createInvite", "POST", {
      tenantId: this.getAuth()?.tenantid,
    });
  }

  public async acceptInvite(jwt: string): Promise<any> {
    return this.request("/v1/tenant/acceptInvite", "POST", {
      invite: jwt,
    });
  }

  public async removeMember(userId: string): Promise<any> {
    return this.request("/v1/tenant/removeMember", "POST", {
      userId,
      tenantId: this.getAuth()?.tenantid,
    });
  }

  public async deleteApiKey(data: { keyName: string }): Promise<any> {
    return this.request("/v1/tenant/apiKeys", "DELETE", {
      tenantId: this.getAuth()?.tenantid,
      ...data,
    });
  }

  public async publishToFeed(data: any, _feedId?: string): Promise<any> {
    let feedId = _feedId;
    if (!feedId) {
      try {
        feedId = await this.getDefaultFeedId();
      } catch (err) {
        console.error(`Failed to get feed info for default feed slug "${config.GLOBAL_FEED_SLUG}", throwing error`);
        throw err;
      }
    }
    return this.request(`/v1/feeds/${feedId}/publish`, "POST", data);
  }

  private async getDefaultFeedId(): Promise<string> {
    if (!this.defaultFeedId) {
      const feedInfo = await this.getFeedBySlug(config.GLOBAL_FEED_SLUG);
      this.defaultFeedId = feedInfo.id;
    }
    return this.defaultFeedId!;
  }

  private async request(
    path: string,
    method: "GET" | "DELETE" | "POST" = "GET",
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
    if (this.auth?.tenantid) {
      headers.tenantid = this.auth.tenantid;
    }
    if (body) {
      headers["Content-Type"] = "application/json";
    }
    const response = await fetch(`${this.url}${path}`, {
      method,
      headers,
      body: JSON.stringify(body),
    });
    const responseIsJson = response.headers.get("content-type")?.indexOf("application/json") === 0;

    if (!response.ok) {
      if (response.status === 401) {
        // TODO: refresh token instead of logging out
        this.logout();
      }

      let errorMessage;
      if (responseIsJson) {
        const errorJson = await response.json();
        if (errorJson?.error?.message) {
          errorMessage = errorJson.error.message;
          if (errorJson.error.code) {
            errorMessage += ` (${errorJson.error.code})`;
          }
        } else {
          errorMessage = JSON.stringify(errorJson);
        }
      } else {
        errorMessage = await response.text();
      }
      console.error("API error", response.status, errorMessage);
      throw new Error("API error: " + errorMessage);
    }

    if (responseIsJson) {
      try {
        return await response.json();
      } catch (err) {
        if (response.headers.get("content-length") === "0") {
          throw new Error('API error: API returned invalid JSON: ""');
        }
        throw err;
      }
    } else {
      return await response.text();
    }
  }

  /**
   * Authenticate wallet extension
   */
  private authenticateExtension(token: string, tenantId: string) {
    // @ts-ignore
    if (window.idWallet) {
      // @ts-ignore
      idWallet.authenticate(token, tenantId);
    }
  }

  /**
   * Wait for page to load and check we have required args before trying to authenticate
   */
  private onDocumentReady() {
    document.onreadystatechange = () => {
      if (document.readyState === "complete") {
        const auth = this.getAuth();
        if (auth?.jwt && auth?.tenantid) {
          this.authenticateExtension(auth.jwt, auth.tenantid);
        }
      }
    };
  }

  private setAuth(auth: Auth, persist?: boolean) {
    this.auth = auth;
    if (persist) {
      localStorage.setItem(AUTH_LOCALSTORAGE_KEY, JSON.stringify(auth));
    }
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

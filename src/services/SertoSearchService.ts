import { config } from "../config";
import { createMockApiRequest } from "../utils/helpers";

export class SertoSearchService {
  public url;

  constructor(url?: string) {
    this.url = url || config.DEFAULT_SEARCH_API_URL;
  }

  public async getEntries(domain?: string): Promise<any> {
    return this.request("/v1/search/", "POST", { domain });
  }

  private async request(path: string, method: "GET" | "DELETE" | "POST" = "GET", body?: any): Promise<any> {
    const headers: any = {};
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
}

export const mockSertoSearchService = {
  getEntries: createMockApiRequest([]),
};

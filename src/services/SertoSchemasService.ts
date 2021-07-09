import { SchemaDataInput, SchemaDataResponse } from "../components/views/Schemas/types";
import { config } from "../config";
import { createMockApiRequest } from "../utils/helpers";

// @TODO/toby Temp dummy data for demoing, sorry
const DUMMY_SCHEMA_SAVES: { [key: string]: number } = {
  "serto-organization-profile": 3,
  "serto-team-member": 5,
  "consen-sys-employee": 3,
  "twitter-verify": 2,
  "consen-sys-retreat-2021": 4,
  "consen-sys-mesh-portfolio-company": 1,
  "consen-sys-hackathon-2021-participant": 3,
  "vaccination-certificate": 8,
  "immunoglobulin-detection-test-card": 4,
  "diploma-credential": 3,
  "tachyon-portfolio-company": 1,
};

export class SertoSchemasService {
  private url;
  private jwt?: string;
  public isAuthenticated?: boolean;
  /** Path (or URL) to send user to in order for them to create a schema. */
  public createSchemaPath: string;

  constructor(url?: string, jwt?: string, createSchemaPath?: string) {
    this.url = url || config.DEFAULT_SCHEMA_API_URL;
    this.jwt = jwt;
    this.isAuthenticated = !!jwt;
    this.createSchemaPath = createSchemaPath || config.DEFAULT_CREATE_SCHEMA_PATH;
  }

  /** Build URL at which a given schema will be hosted. */
  public buildSchemaUrl = (slug: string, type: string, version?: string): string => {
    return `${this.url}/v1/public/${slug}${version && "/" + version}/${type}.json`;
  };

  public async getSchemas(userCreated?: boolean): Promise<SchemaDataResponse[]> {
    let schemas = await this.request(`/v1/${userCreated ? "currentUser" : ""}`, "GET", undefined, userCreated);
    // @TODO/tobek This handles API bug where sometimes there is a wrapper object with schema inside `schema` property - remove when fixed.
    if (schemas?.[0]?.schema) {
      schemas = schemas.map((schema: any) => schema.schema);
    }

    schemas.forEach((schema: SchemaDataResponse) => {
      schema.favoriteCount = (schema.favoriteCount || 0) + (DUMMY_SCHEMA_SAVES[schema.slug] || 0);
    });

    return schemas;
  }

  public async getSchema(slug: string): Promise<SchemaDataResponse> {
    if (!slug) {
      throw new Error("API error: Must provide a schema ID");
    }
    let schema = await this.request(`/v1/public/${slug}`, "GET");
    // @TODO/tobek This handles API bug where sometimes there is a wrapper object with schema inside `schema` property - remove when fixed.
    schema = schema?.schema || schema;
    schema.favoriteCount = (schema.favoriteCount || 0) + (DUMMY_SCHEMA_SAVES[schema.slug] || 0);
    return schema;
  }

  public async createSchema(schema: SchemaDataInput): Promise<any> {
    return this.request("/v1/", "POST", schema, true);
  }

  public async updateSchema(schema: SchemaDataInput): Promise<any> {
    return this.request(
      `/v1/${schema.slug}/update`,
      "POST",
      {
        ...schema,
        slug: undefined, // @TODO/tobek API errors if slug is included in update request even if slug hasn't been updated - should update API so that if slug is included but not changed then it's fine
      },
      true,
    );
  }

  public async toggleSaveSchema(slug: string): Promise<any> {
    return this.request(`/v1/${slug}/favorite`, "POST");
  }

  private async request(
    path: string,
    method: "GET" | "DELETE" | "POST" = "GET",
    body?: any,
    authenticated?: boolean,
  ): Promise<any> {
    if (authenticated) {
      this.ensureAuthenticated();
    }

    const headers: any = {};
    if (this.jwt) {
      headers.authorization = `Bearer ${this.jwt}`;
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

  private ensureAuthenticated() {
    if (!this.jwt) {
      throw new Error("Not authenticated");
    }
  }
}

export const mockSertoSchemasService = {
  createSchemaPath: "/schemas/",
  buildSchemaUrl: (slug: string, type: string, version?: string): string =>
    `https://example.com/schemas/${slug}${version && "/" + version}/${type}.json`,
  createSchema: createMockApiRequest(),
  updateSchema: createMockApiRequest(),
  getSchemas: createMockApiRequest([]),
  getSchema: createMockApiRequest({}),
  toggleSaveSchema: createMockApiRequest({}),
};

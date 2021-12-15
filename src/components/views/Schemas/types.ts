import { baseVcJsonSchema, DefaultSchemaMetadata, JsonSchema, JsonSchemaNode } from "vc-schema-tools";

/** Metadata fields specific to our use-case, intended to be stored in the `$metadata` object in a JSON Schema. */
export interface SchemaMetadata extends DefaultSchemaMetadata {
  version: string;
  slug: string;
  icon?: string;
  discoverable?: boolean;
}

/** In-progress schema interface during CreateSchema flow. */
export type WorkingSchema = Partial<JsonSchema<Partial<SchemaMetadata>>>;
export type CompletedSchema = JsonSchema<SchemaMetadata>;

/** Data format expected by API. */
export interface SchemaDataInput extends SchemaMetadata {
  name: string;
  description?: string;
  jsonSchema: string;
  ldContext: string;
  /** DEPRECATED */
  ldContextPlus?: string;
}

/** Data format returned by API. */
export interface SchemaDataResponse extends SchemaDataInput {
  id: string;
  created: string;
  updated: string;
  tenant: any;
  deleted?: string;
  favorite?: boolean;
  favoriteCount?: number;
  creator?: {
    name: string;
    /** username */
    nickName: string;
    picture: string;
    /** JWT subject */
    identifier: string;
  };
  ipfsHash?: {
    jsonSchema?: string;
    ldContext?: string;
  };
}

export const defaultSchemaProperties = [
  {
    $linkedData: {
      term: "id",
      "@id": "@id",
    },
    title: "Credential ID",
    type: "string",
    format: "uri",
  },
  {
    $linkedData: {
      term: "issuanceDate",
      "@id": "http://schema.org/DateTime",
    },
    title: "Issuance Date",
    type: "string",
    format: "date-time",
  },
  {
    $linkedData: {
      term: "issuer",
      "@id": "@id",
    },
    title: "Issuer ID",
    type: "string",
    format: "uri",
  },
];
export const defaultSchemaPropertiesRequired = [false, true, true];

export const newSchemaAttribute: JsonSchemaNode = {
  $linkedData: {
    term: "",
    "@id": "http://schema.org/Text",
  },
  title: "",
  description: "",
  type: "string",
};

export const baseWorkingSchema: WorkingSchema = {
  $schema: "http://json-schema.org/draft-07/schema#",

  $metadata: {
    slug: "",
    version: "1.0",
    icon: "",
    discoverable: false,
  },
  title: "",
  description: "",

  ...baseVcJsonSchema,

  properties: {
    ...baseVcJsonSchema.properties,
    credentialSubject: {
      type: "object",
      required: [],
      properties: {
        id: {
          $linkedData: { term: "id", "@id": "@id" },
          title: "Credential Subject ID",
          type: "string",
          format: "uri",
        },
        "": {
          ...newSchemaAttribute,
        },
      },
    },
  },
};

import { LdContextPlusNode } from "./VcSchema";

/** In-progress schema interface during CreateSchema flow that will be transformed into final output. */
export interface WorkingSchema extends SchemaMetadata {
  name: string;
  properties: Partial<LdContextPlusNode<SchemaMetadata>>[];
  description?: string;
}

/** Completed schema data from CreateSchema flow. */
export interface CompletedSchema extends WorkingSchema {
  properties: LdContextPlusNode<SchemaMetadata>[];
}

/** Metadata fields specific to our use-case (i.e. not part of the LdContextPlus spec) intended to be passed in to the LdContextPlus generic types where it will be stored in the "@metadata" object. */
export interface SchemaMetadata {
  version: string;
  slug: string;
  icon?: string;
  discoverable?: boolean;
}

/** Data format expected by API. */
export interface SchemaDataInput extends SchemaMetadata {
  name: string;
  description?: string;
  ldContextPlus: string;
  ldContext: string;
  jsonSchema: string;
}

/** Data format returned by API. */
export interface SchemaDataResponse extends SchemaDataInput {
  id: string;
  created: string;
  updated: string;
  tenant: any;
  deleted?: string;
}

export const requiredSchemaProperties = [
  {
    "@id": "credentialId",
    "@type": "@id",
    "@title": "Credential ID",
    "@required": true,
  },
  {
    "@id": "issuanceDate",
    "@type": "http://schema.org/DateTime",
    "@title": "Issuance Date",
    "@required": true,
  },
  {
    "@id": "issuer",
    "@type": "@id",
    "@title": "Issuer ID",
    "@required": true,
  },
];

export const newSchemaAttribute = {
  "@id": "",
  "@type": "http://schema.org/Text",
  "@dataType": "string",
  "@title": "",
  "@description": "",
};

export const initialWorkingSchema: WorkingSchema = {
  name: "",
  description: "",
  slug: "",
  version: "1.0",
  icon: "",
  discoverable: false,
  properties: [
    {
      "@id": "id",
      "@type": "@id",
      "@dataType": "string",
      "@format": "uri",
      "@title": "Credential Subject ID",
      "@required": true,
    },
    // {
    //   "@id": "title",
    //   "@type": "http://schema.org/Text",
    //   "@dataType": "string",
    //   "@title": "Title",
    //   "@description": "A human-friendly name for this verified credential.",
    // },
    {
      ...newSchemaAttribute,
    },
  ],
};

import { LdContextPlusLeafNode } from "./VcSchema";

/** In-progress schema interface during CreateSchema flow that will be transformed into final output. */
export interface WorkingSchema extends SchemaMetadata {
  name: string;
  properties: Partial<LdContextPlusLeafNode<SchemaMetadata>>[]; // @TODO/tobek When we support nesting this will have to be LdContextPlusNode and we'll need some extra type jiggery throughout.
  description?: string;
}

/** Completed schema data from CreateSchema flow. */
export interface CompletedSchema extends WorkingSchema {
  properties: LdContextPlusLeafNode<SchemaMetadata>[];
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

export const initialWorkingSchema: WorkingSchema = {
  name: "",
  description: "",
  slug: "",
  version: "",
  icon: "",
  discoverable: false,
  properties: [
    {
      "@id": "title",
      "@type": "http://schema.org/Text",
      "@dataType": "string",
      "@title": "Title",
      "@description": "A human-friendly name for this verified credential.",
    },
    {
      "@id": "",
      "@type": "http://schema.org/Text",
      "@dataType": "string",
      "@title": "",
      "@description": "",
    },
  ],
};

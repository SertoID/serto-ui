import { LdContextPlusLeafNode, SchemaMetadata } from "./VcSchema";

/** In-progress schema interface during CreateSchema flow that will be transformed into final output. */
export interface WorkingSchema extends SchemaMetadata {
  name: string;
  properties: Partial<LdContextPlusLeafNode<SchemaMetadata>>[]; // @TODO/tobek When we support nesting this will have to be LdContextPlusNode and we'll need some extra type jiggery throughout.
  description?: string;
}

export interface CompletedSchema extends WorkingSchema {
  properties: LdContextPlusLeafNode<SchemaMetadata>[];
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

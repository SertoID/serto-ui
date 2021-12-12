/* eslint-disable @typescript-eslint/no-non-null-assertion */

import slugify from "@sindresorhus/slugify";
import {
  VcSchema,
  jsonLdSchemaTypeMap,
  JsonSchema,
  JsonSchemaNode,
  baseVcJsonSchema,
  generateLinkedData,
  generateSchemaLdTypes,
} from "vc-schema-tools";
import { SchemaDataInput, SchemaDataResponse, WorkingSchema, SchemaMetadata, newSchemaAttribute } from "./types";
import { SertoUiContextInterface } from "../../../context/SertoUiContext";

export const NESTED_TYPE_KEY = "NESTED";

export const typeOptions: { [typeName: string]: JsonSchemaNode } = { ...jsonLdSchemaTypeMap } as any;
typeOptions[NESTED_TYPE_KEY] = {
  type: "object",
  required: [],
  properties: {
    "": {
      ...newSchemaAttribute,
    },
  },
};

export function isFullSchema(schema: WorkingSchema): boolean {
  return !!(schema.$metadata && schema.properties?.credentialSubject);
}

/** Some imported/pasted schemas (like traceability ones) may only represent `credentialSubject`. This function creates a full JSON Schema document for VC from that: adding required VC properties, nesting schema properties under `credentialSubject`, adding metadata, $id, etc. */
export function ensureFullSchema(
  _schema: WorkingSchema,
  buildSchemaUrl: SertoUiContextInterface["schemasService"]["buildSchemaUrl"],
): JsonSchema<SchemaMetadata> {
  if (_schema.$metadata && _schema.properties?.credentialSubject) {
    return _schema as JsonSchema<SchemaMetadata>;
  }

  const schema = generateLinkedData(_schema) as JsonSchema<SchemaMetadata>;

  const name = schema.title || "";
  const slug = schema.$metadata?.slug || slugify(name);
  const version = schema.$metadata?.version || "1.0";

  const jsonSchemaUrl = buildSchemaUrl(slug, "json-schema", version);
  const jsonLdContextUrl = buildSchemaUrl(slug, "ld-context", version);

  const { subjectLdType, credLdType } = generateSchemaLdTypes(schema);

  return {
    $schema: "http://json-schema.org/draft-07/schema#",
    $id: jsonSchemaUrl,
    $linkedData: { term: credLdType, "@id": credLdType },
    $metadata: {
      slug,
      version,
      uris: {
        jsonLdContext: jsonLdContextUrl,
        jsonSchema: jsonSchemaUrl,
      },
      ...schema.$metadata,
    },
    title: name,
    description: schema.description,

    ...baseVcJsonSchema,

    properties: {
      ...baseVcJsonSchema.properties,
      credentialSubject: {
        $linkedData: { term: subjectLdType, "@id": subjectLdType },
        type: "object",
        required: schema.required || [],
        properties: schema.properties,
      },
    },
  };
}

/** Take a JSON Schema source, fill in any missing pieces, and wrap it in the metadata expected in the SchemaDataInput type. */
export function jsonSchemaToSchemaInput(
  schema: WorkingSchema,
  buildSchemaUrl?: SertoUiContextInterface["schemasService"]["buildSchemaUrl"],
): SchemaDataInput {
  const schemaData = {
    ...schema,
    $metadata: {
      slug: slugify(schema.title || ""),
      uris: {} as SchemaMetadata["uris"],
      ...schema.$metadata,
    },
  };

  const metadata = schema.$metadata || ({} as SchemaMetadata);
  let jsonSchemaUrl = metadata.uris?.jsonSchema;
  let jsonLdContextUrl = metadata.uris?.jsonLdContext;
  if (buildSchemaUrl) {
    jsonSchemaUrl = jsonSchemaUrl || buildSchemaUrl(metadata.slug || "", "json-schema", metadata.version);
    jsonLdContextUrl = jsonLdContextUrl || buildSchemaUrl(metadata.slug || "", "ld-context", metadata.version);
  }

  if (jsonSchemaUrl) {
    schemaData.$id = schemaData.$id || jsonSchemaUrl;
    if (!schemaData.$metadata?.uris?.jsonSchema) {
      schemaData.$metadata!.uris!.jsonSchema = jsonSchemaUrl;
    }
  }
  if (jsonLdContextUrl) {
    if (!schemaData.$metadata?.uris?.jsonLdContext) {
      schemaData.$metadata!.uris!.jsonLdContext = jsonLdContextUrl;
    }
  }

  const schemaInstance = new VcSchema(schemaData as JsonSchema);

  return {
    ...(schemaData.$metadata as SchemaMetadata),
    name: schema.title || "",
    description: schema.description,
    ldContext: schemaInstance.getJsonLdContextString(),
    jsonSchema: schemaInstance.getJsonSchemaString(),
    // @TODO/tobek Deprecated and unused, but needed until API is updated to not require it
    ldContextPlus: "",
  };
}

/** Used e.g. for taking an existing schema response from DB and using it to populate the schema creator/editor when editing a schema. */
export function schemaResponseToWorkingSchema(schemaResponse: SchemaDataResponse): WorkingSchema {
  const jsonSchema = JSON.parse(schemaResponse.jsonSchema);
  if (!schemaResponse.ldContextPlus) {
    // new version, everything is in JSON Schema
    return jsonSchema;
  }

  // old version, grab metadata from old LD Context Plus:
  const ldContextPlus = JSON.parse(schemaResponse.ldContextPlus);
  jsonSchema.$metadata = ldContextPlus["@context"]["@metadata"];
  delete jsonSchema.$metadata.uris.jsonLdContextPlus;

  const { subjectLdType, credLdType } = getLdTypesFromSchemaResponse(schemaResponse);
  jsonSchema.$linkedData = { term: credLdType, "@id": credLdType };

  if (jsonSchema.properties?.credentialSubject) {
    jsonSchema.properties.credentialSubject = generateLinkedData(jsonSchema.properties?.credentialSubject);
    jsonSchema.properties.credentialSubject.$linkedData = {
      term: subjectLdType,
      "@id": subjectLdType,
    };
  }

  return jsonSchema;
}

export function getLdTypesFromSchemaResponse(
  schemaResponse: SchemaDataInput,
): { subjectLdType?: string; credLdType: string } {
  const jsonSchema = JSON.parse(schemaResponse.jsonSchema);

  const subjectLdType = jsonSchema.properties?.credentialSubject?.$linkedData?.term;

  let credLdType = jsonSchema.$linkedData?.term;
  if (!credLdType && schemaResponse.ldContextPlus) {
    // old schema, we can get the type this way:
    credLdType = JSON.parse(schemaResponse.ldContextPlus)["@context"]["@rootType"];
  }

  if (!credLdType) {
    console.error("Invalid schema: Could not obtain LD types for schema", schemaResponse);
    throw Error("Invalid schema: Could not obtain LD types for schema");
  }

  return { subjectLdType, credLdType };
}

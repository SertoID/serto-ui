import slugify from "@sindresorhus/slugify";
import { convertToPascalCase } from "../../../utils";
import { VcSchema, jsonLdSchemaTypeMap, JsonSchema, JsonSchemaNode } from "vc-schema-tools";
import { SchemaDataInput, WorkingSchema, SchemaMetadata, SchemaDataResponse, newSchemaAttribute } from "./types";
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

export function createSchemaInput(
  schema: JsonSchema<SchemaMetadata>,
  buildSchemaUrl: SertoUiContextInterface["schemasService"]["buildSchemaUrl"],
): SchemaDataInput {
  const metadata = schema.$metadata || ({} as SchemaMetadata);
  const schemaTypeName = convertToPascalCase(schema.title || "");
  const jsonSchemaUrl = buildSchemaUrl(metadata.slug || "", "json-schema", metadata.version);
  const jsonLdContextUrl = buildSchemaUrl(metadata.slug || "", "ld-context", metadata.version);

  const schemaInstance = new VcSchema({
    $id: jsonSchemaUrl,
    ...schema,
    $metadata: {
      ...schema.$metadata,
      uris: {
        jsonLdContext: jsonLdContextUrl,
        jsonSchema: jsonSchemaUrl,
      },
    },
    $linkedData: {
      term: schemaTypeName,
      "@id": jsonLdContextUrl + "#",
    },
  });

  return {
    ...metadata,
    uris: {
      jsonLdContext: jsonLdContextUrl,
      jsonSchema: jsonSchemaUrl,
    },
    name: schema.title || "",
    description: schema.description,
    ldContext: schemaInstance.getJsonLdContextString(),
    jsonSchema: schemaInstance.getJsonSchemaString(),
  };
}

export function jsonSchemaToSchemaInput(jsonSchema: JsonSchema): SchemaDataInput {
  if (!jsonSchema.title) {
    throw Error("JSON Schema is missing required property `title`");
  }

  const schemaInstance = new VcSchema(jsonSchema);
  const metadata = jsonSchema.$metadata || {};

  return {
    name: jsonSchema.title,
    description: jsonSchema.description,

    version: "1.0",
    slug: slugify(jsonSchema.title),
    ...metadata,

    ldContext: schemaInstance.getJsonLdContextString(),
    jsonSchema: schemaInstance.getJsonSchemaString(),
  };
}

/* Convert API response into local format `WorkingSchema` for managing schema state during UI flow. */
export function schemaResponseToWorkingSchema(schemaReponse: SchemaDataResponse): WorkingSchema {
  try {
    return JSON.parse(schemaReponse.jsonSchema);
  } catch (err) {
    console.error("Failed to parse JSON from schema response:", schemaReponse);
    throw Error("Failed to parse JSON from schema response");
  }
}

/* eslint-disable @typescript-eslint/no-non-null-assertion */

import slugify from "@sindresorhus/slugify";
import { convertToPascalCase } from "../../../utils";
import {
  VcSchema,
  jsonLdSchemaTypeMap,
  JsonSchema,
  JsonSchemaNode,
  baseVcJsonSchema,
  jsonSchemaCommentToLinkedData,
} from "vc-schema-tools";
import { SchemaDataInput, WorkingSchema, SchemaMetadata, newSchemaAttribute } from "./types";
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

  const schema = jsonSchemaCommentToLinkedData(_schema) as JsonSchema<SchemaMetadata>;

  const name = schema.title || "";
  const slug = schema.$metadata?.slug || slugify(name);
  const version = schema.$metadata?.version || "1.0";

  const jsonSchemaUrl = buildSchemaUrl(slug, "json-schema", version);
  const jsonLdContextUrl = buildSchemaUrl(slug, "ld-context", version);

  const ldTypeName = schema.$linkedData?.term || convertToPascalCase(name);
  const ldId = schema.$linkedData?.["@id"] || jsonLdContextUrl + "#";

  return {
    $schema: "http://json-schema.org/draft-07/schema#",
    $id: jsonSchemaUrl,
    $linkedData: {
      term: ldTypeName,
      "@id": ldId,
    },
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
        $linkedData: { term: "credentialSubject", "@id": "https://www.w3.org/2018/credentials#credentialSubject" },
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
    $linkedData: {
      term: convertToPascalCase(schema.title || ""),
      ...schema.$linkedData,
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
    if (!schemaData.$linkedData?.["@id"]) {
      schemaData.$linkedData!["@id"] = jsonLdContextUrl + "#";
    }
    if (!schemaData.$metadata?.uris?.jsonSchema) {
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
  };
}

import { convertToPascalCase } from "../../utils";
import { VcSchema, jsonLdContextTypeMap, LdContextPlus, LdContextPlusLeafNode } from "./VcSchema";
import { CompletedSchema, SchemaMetadata, SchemaDataInput } from "./types";
import { config } from "../../../../config";

/** Adding `niceName` so that we can know what type to show in type selection dropdown. */
type NamedLdContextPlusNode = Partial<LdContextPlusLeafNode> & { niceName?: string };

export const typeOptions: { [key: string]: NamedLdContextPlusNode } = {};
Object.keys(jsonLdContextTypeMap).forEach((type) => {
  if (type.indexOf("http://schema.org/") !== 0) {
    return;
  }
  typeOptions[type] = {
    "@format": jsonLdContextTypeMap[type].format,
    "@dataType": jsonLdContextTypeMap[type].type,
    "@type": type,
    niceName: type.replace("http://schema.org/", ""),
  };
});

export function createSchemaInput(schema: CompletedSchema): SchemaDataInput {
  const schemaInstance = new VcSchema(createLdContextPlusSchema(schema), schema.slug);
  return {
    ...schema,
    ldContextPlus: schemaInstance.getLdContextPlusString(),
    ldContext: schemaInstance.getJsonLdContextString(),
    jsonSchema: schemaInstance.getJsonSchemaString(),
  };
}

export function createLdContextPlusSchema(schema: CompletedSchema): LdContextPlus<SchemaMetadata> {
  const schemaTypeName = convertToPascalCase(schema.name);
  const schemaProperties: { [key: string]: LdContextPlusLeafNode } = {};

  schema.properties.forEach((prop) => {
    schemaProperties[prop["@id"]] = {
      ...prop,
      "@id": `schema-id:${prop["@id"]}`,
    };
  });

  return {
    "@context": {
      "@metadata": {
        slug: schema.slug,
        version: schema.version,
        icon: schema.icon,
        discoverable: schema.discoverable,
      },
      "@title": schema.name,
      "@description": schema.description,
      w3ccred: "https://www.w3.org/2018/credentials#",
      "schema-id": getSchemaUrl(schema.slug, "ld-context-plus") + "#",
      "@rootType": schemaTypeName,
      [schemaTypeName]: {
        "@id": "schema-id",
        "@contains": "credentialSubject",
      },
      credentialSubject: {
        "@id": "w3ccred:credentialSubject",
        "@required": true,
        "@context": schemaProperties,
      },
    },
  };
}

/** Convert raw LdContextPlus into data format used by API and some components. */
export function ldContextPlusToSchemaInput(ldContextPlus: LdContextPlus<SchemaMetadata>): SchemaDataInput {
  const metadata = ldContextPlus["@context"]["@metadata"];
  if (!metadata) {
    throw Error("Missing schema metadata");
  }
  const schemaInstance = new VcSchema(ldContextPlus, metadata.slug);
  return {
    ...metadata,
    name: ldContextPlus["@context"]["@title"] || ldContextPlus["@context"]["@rootType"],
    description: ldContextPlus["@context"]["@description"],
    ldContextPlus: schemaInstance.getLdContextPlusString(),
    ldContext: schemaInstance.getJsonLdContextString(),
    jsonSchema: schemaInstance.getJsonSchemaString(),
  };
}

export function getSchemaUrl(slug: string, type: "ld-context-plus" | "ld-context" | "json-schema"): string {
  return `${config.API_URL}/v1/schemas/${slug}/${type}.json`;
}

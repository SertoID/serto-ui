import { mapValuesDeep } from "deepdash-es/standalone";
import { convertToPascalCase } from "../../../utils";
import { VcSchema, jsonLdContextTypeMap, LdContextPlus, LdContextPlusNode } from "vc-schema-tools";
import { CompletedSchema, SchemaMetadata, SchemaDataInput, newSchemaAttribute } from "./types";
import { SertoUiContextInterface } from "../../../context/SertoUiContext";

/** Adding `niceName` so that we can know what type to show in type selection dropdown. */
type NamedLdContextPlusNode = Partial<LdContextPlusNode<SchemaMetadata>> & { niceName?: string };

export const NESTED_TYPE_KEY = "NESTED";

export const typeOptions: { [key: string]: NamedLdContextPlusNode } = {};
Object.keys(jsonLdContextTypeMap).forEach((type) => {
  if (type !== "@id" && type.indexOf("http://schema.org/") !== 0) {
    return;
  }
  typeOptions[type] = {
    "@format": jsonLdContextTypeMap[type].format,
    "@dataType": jsonLdContextTypeMap[type].type,
    "@type": type,
    niceName: type === "@id" ? "Identifier" : type.replace("http://schema.org/", "").replace("URL", "URI"),
  };
});
typeOptions[NESTED_TYPE_KEY] = {
  "@context": {
    "": {
      ...newSchemaAttribute,
    },
  },
  niceName: "[nest attributes]",
};

export function createSchemaInput(
  schema: CompletedSchema,
  buildSchemaUrl: SertoUiContextInterface["buildSchemaUrl"],
): SchemaDataInput {
  const schemaInstance = new VcSchema(createLdContextPlusSchema(schema, buildSchemaUrl));
  const schemaInput = { ...schema };
  delete (schemaInput as any).properties;
  return {
    ...schemaInput,
    ldContextPlus: schemaInstance.getLdContextPlusString(),
    ldContext: schemaInstance.getJsonLdContextString(),
    jsonSchema: schemaInstance.getJsonSchemaString(),
  };
}

export function createLdContextPlusSchema(
  schema: CompletedSchema,
  buildSchemaUrl: SertoUiContextInterface["buildSchemaUrl"],
): LdContextPlus<SchemaMetadata> {
  const schemaTypeName = convertToPascalCase(schema.name);

  // Prefix each `@id` value with "schema-id:" to make it a valid JSON-LD Context identifier:
  // @TODO/tobek In the edge case where a nested property has the same ID as another property elsewhere in the schema, the resulting `@id`s will be duplicates which would result in a technically incorrect JSON-LD Context.
  const schemaProperties: { [key: string]: LdContextPlusNode<SchemaMetadata> } = {};
  schema.properties.forEach((prop) => {
    schemaProperties[prop["@id"]] = mapValuesDeep({ ...prop }, (value, key) => {
      if (key === "@id") {
        return `schema-id:${value}`;
      } else if (typeof value === "object") {
        return { ...value }; // new object reference to avoid changing deeper values in-place
      } else {
        return value;
      }
    });
  });

  return {
    "@context": {
      "@metadata": {
        slug: schema.slug,
        version: schema.version,
        icon: schema.icon,
        discoverable: schema.discoverable,
        uris: {
          jsonLdContextPlus: buildSchemaUrl(schema.slug, "ld-context-plus"),
          jsonLdContext: buildSchemaUrl(schema.slug, "ld-context"),
          jsonSchema: buildSchemaUrl(schema.slug, "json-schema"),
        },
      },
      "@title": schema.name,
      "@description": schema.description,
      w3ccred: "https://www.w3.org/2018/credentials#",
      "schema-id": buildSchemaUrl(schema.slug, "ld-context") + "#",
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
  const schemaInstance = new VcSchema(ldContextPlus);
  return {
    ...metadata,
    name: ldContextPlus["@context"]["@title"] || ldContextPlus["@context"]["@rootType"],
    description: ldContextPlus["@context"]["@description"],
    ldContextPlus: schemaInstance.getLdContextPlusString(),
    ldContext: schemaInstance.getJsonLdContextString(),
    jsonSchema: schemaInstance.getJsonSchemaString(),
  };
}

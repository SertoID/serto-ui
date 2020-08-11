import { convertToPascalCase } from "../../../utils";
import { jsonLdContextTypeMap, LdContextPlus, LdContextPlusLeafNode, SchemaMetadata } from "../VcSchema";

/** In-progress schema interface that will be transformed into final LdContextPlus output. */
export interface WorkingSchema extends SchemaMetadata {
  name: string;
  version: string;
  properties: LdContextPlusLeafNode<SchemaMetadata>[]; // @TODO/tobek When we support nesting this will have to be LdContextPlusNode and we'll need some extra type jiggery throughout.
}

export const initialWorkingSchema: WorkingSchema = {
  name: "",
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

export function createLdContextPlusSchema(schema: WorkingSchema): LdContextPlus<SchemaMetadata> {
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
      w3ccred: "https://www.w3.org/2018/credentials#",
      "schema-id": `https://uport.me/schema/${schema.slug}#`, // @TODO/tobek ensure this matches up with API
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

import Ajv from "ajv";
import { omitDeep, mapValuesDeep } from "deepdash-es/standalone";

const ajv = new Ajv();

interface JsonSchemaNode {
  type: string;
  properties?: { [key: string]: JsonSchemaNode };
  title?: string;
  description?: string;
  format?: string;
  required?: string[];
}
interface JsonSchema extends JsonSchemaNode {
  $schema: string;
  $id: string;
}

const contextPlusFields = [
  "@rootType",
  "@replaceWith",
  "@contains",
  "@dataType",
  "@format",
  "@required",
  "@title",
  "@description",
];
const contextPlusFieldsRegexes = contextPlusFields.map((field) => new RegExp(field));

export class VcSchema {
  public jsonSchemaMessage?: string; // @TODO/tobek This should probably be an array and some of the compilation warnings should get added to it.

  private schema: any;
  private debugMode?: boolean;
  private jsonLdContext?: any;
  private jsonSchema?: JsonSchema;
  private jsonSchemaValidate?: Ajv.ValidateFunction;

  constructor(schemaString: string, debugMode?: boolean) {
    this.debugMode = debugMode;
    try {
      this.schema = JSON.parse(schemaString);
    } catch (err) {
      throw Error("Failed to parse JSON: " + err.message);
    }

    this.jsonLdContext = omitDeep(this.schema, contextPlusFieldsRegexes);

    // This is a bit of a hack. We want to be able to add JSON Schema info to "@id" properties. To do this we can have @context+ nodes such as `{ "id" : { "@id": "@id", "@required": true } }` which compiles to JSON-LD @context `{ "id" : { "@id": "@id" } }`. This works and simply aliases "id" to "@id". However, the W3C Credentials JSON-LD @context thatn we import defines `{ @protected: true, "id": "@id" }`. Because of the "@protected" we can't redefine "id" even to an expanded type definition that is functionally identical. So, this mapValuesDeep call replaces `{ "id" : { "@id": "@id" } }` with `{ "id" : "@id" }` which is allowed by "@protected" since it is functionally *and* syntactically the same.
    this.jsonLdContext = mapValuesDeep(
      this.jsonLdContext,
      (value) => {
        if (value?.["@id"] === "@id") {
          return "@id";
        }
        return value;
      },
      { callbackAfterIterate: true },
    );

    try {
      this.jsonSchema = this.generateJsonSchema();
      if (this.jsonSchema) {
        ajv.removeSchema(this.jsonSchema["$id"]);
        this.jsonSchemaValidate = ajv.compile(this.jsonSchema);
      }
    } catch (err) {
      throw Error("Failed to generate JSON Schema from input: " + err.message);
    }
  }

  public getJsonLdContextString(prettyPrint?: boolean): string {
    return JSON.stringify(this.jsonLdContext, null, prettyPrint ? 2 : undefined);
  }

  public getJsonSchemaString(prettyPrint?: boolean): string {
    if (!this.jsonSchema) {
      // @TODO/tobek Should this throw an error? Explanation available in instance.jsonSchemaMessage but that's a bit of a weird paradigm
      return "";
    }
    return JSON.stringify(this.jsonSchema, null, prettyPrint ? 2 : undefined);
  }

  public async validateVc(vc: any, cb: (isValid: boolean, message?: string) => any): Promise<void> {
    let vcObj: any;
    try {
      vcObj = JSON.parse(vc);
    } catch (err) {
      return cb(false, "VC is invalid: Invalid JSON: " + err.message);
    }
    if (!this.jsonSchema || !this.jsonSchemaValidate) {
      return cb(true, "VC assumed valid since JSON Schema could not be generated: " + this.jsonSchemaMessage);
    }

    const isValid = await this.jsonSchemaValidate(vcObj);
    cb(
      isValid,
      this.jsonSchemaValidate.errors
        ? "VC is invalid: " + JSON.stringify(this.jsonSchemaValidate.errors)
        : "VC is valid according to schema",
    );
  }

  public openGoogleJsonLdValidatorPage(_vc: any): void {
    const vc = typeof _vc === "string" ? JSON.parse(_vc) : _vc;

    const form = document.createElement("form");
    form.method = "post";
    form.target = "_blank";
    form.action = "https://search.google.com/structured-data/testing-tool";

    const field = document.createElement("input");
    field.type = "hidden";
    field.name = "code";
    field.value = JSON.stringify(
      {
        ...vc,
        ...this.jsonLdContext, // this will overwrite VC's @context with given context, which may not be what we want?
      },
      null,
      2,
    );
    form.appendChild(field);

    document.body.appendChild(form);
    form.submit();
  }

  public openJsonLdPlaygroundPage(_vc: any): void {
    const vc = typeof _vc === "string" ? JSON.parse(_vc) : _vc;
    const jsonLd = JSON.stringify(
      {
        ...vc,
        ...this.jsonLdContext, // this will overwrite VC's @context with given context, which may not be what we want?
      },
      null,
      2,
    );
    window.open(
      "https://json-ld.org/playground/#startTab=tab-compacted&json-ld=" + encodeURIComponent(jsonLd),
      "_blank",
    );
  }

  private debug(...args: any[]): void {
    this.debugMode && console.log(...args);
  }

  private generateJsonSchema(): JsonSchema | undefined {
    let context = this.schema["@context"] || this.schema;
    if (Array.isArray(context)) {
      context = context[context.length - 1];
    }

    if (typeof context !== "object") {
      // @TODO/tobek If it's a URL we should fetch that URL
      this.jsonSchemaMessage = "Invalid @context+ schema: could not find @context object";
      return;
    }

    const rootType = context["@rootType"];
    if (!rootType) {
      this.jsonSchemaMessage = 'Invalid @context+ schema: no "@rootType" property';
      return;
    }
    if (!context[rootType]) {
      // @TODO/tobek If it was defined in another context referenced by this one we need to get it - though we probably won't be able to generate JSON Schema from it
      this.jsonSchemaMessage = `Invalid @context+ schema: "@rootType" property "${rootType}" is not defined`;
      return;
    }

    return {
      $schema: "http://json-schema.org/schema#",
      $id: "http://consensysidentity.com/schemas/schema-id.json", // @TODO
      type: "object",
      ...this.parseContextPlus(context, context[rootType], "root"),
    };
  }

  private parseContextPlus(context: any, node: any, key: string): JsonSchemaNode | undefined {
    if (typeof node !== "object") {
      console.warn(
        `Unsupported @context+ node type at ${key}: node is not an object. Excluding from JSON Schema. Node:`,
        node,
      );
      return;
    }
    // @TODO/tobek handle arrays

    if (node["@dataType"]) {
      this.debug(`Parsing "${key}": leaf node`, node);
      return {
        type: node["@dataType"],
        format: node["@format"],
        title: node["@title"],
        description: node["@description"],
      };
    }

    const replaceWithType = node["@replaceWith"];
    let replaceWithNode;
    if (replaceWithType) {
      this.debug(`Parsing "${key}": replace with type "${replaceWithType}"`, node);
      if (!context[replaceWithType]) {
        console.warn(
          `Referenced type "${replaceWithType}" could not be found; excluding from JSON Schema. replaceWith from node:`,
          node,
        );
        return;
      }
      return this.parseContextPlus(context, context[replaceWithType], replaceWithType);
    }

    const nestedProperties = {
      ...node["@context"],
    };
    if (node["@contains"]) {
      (Array.isArray(node["@contains"]) ? node["@contains"] : [node["@contains"]]).forEach((containedType) => {
        if (context[containedType]) {
          nestedProperties[containedType] = context[containedType];
        } else {
          console.warn(
            `Referenced type "${containedType}" could not be found; excluding from JSON Schema. Referenced from node:`,
            node,
          );
        }
      });
    }

    if (!Object.keys(nestedProperties).length) {
      console.warn(`Unsupported @context+ node type at ${key}; excluding from JSON Schema. Node:`, node);
      return;
    }

    this.debug(`Parsing "${key}": inner @context and/or @contains`, node);
    const nestedRequired: string[] = [];
    const parsedNestedProperties: { [key: string]: JsonSchemaNode } = {};

    Object.keys(nestedProperties)
      .filter((nestedKey) => nestedKey[0] !== "@")
      .forEach((nestedKey) => {
        const nestedNode = nestedProperties[nestedKey];
        const property = this.parseContextPlus(context, nestedNode, nestedKey);
        if (property) {
          if (
            nestedNode["@required"] ||
            (nestedNode["@replaceWith"] && context[nestedNode["@replaceWith"]]?.["@required"])
          ) {
            nestedRequired.push(nestedKey);
          }
          parsedNestedProperties[nestedKey] = property;
        }
      });

    return {
      type: "object",
      title: node["@title"],
      description: node["@description"],
      required: nestedRequired.length ? nestedRequired : undefined,
      properties: parsedNestedProperties,
    };
  }
}

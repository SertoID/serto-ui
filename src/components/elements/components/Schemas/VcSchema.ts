import Ajv from "ajv";
import { omitDeep } from "deepdash-es/standalone";

const ajv = new Ajv();

export class VcSchema {
  static contextPlusFields = ["@rootType", "@contains", "@dataType", "@format", "@required", "@title", "@description"];
  static contextPlusFieldsRegexes = VcSchema.contextPlusFields.map((field) => new RegExp(field));

  public jsonSchemaMessage?: string; // @TODO/tobek This should probably be an array and some of the compilation warnings should get added to it.

  private schema: any;
  private debugMode?: boolean;
  private jsonLdContext?: any;
  private jsonSchema?: any;
  private jsonSchemaValidate?: Ajv.ValidateFunction;

  constructor(schemaString: string, debugMode?: boolean) {
    this.debugMode = debugMode;
    try {
      this.schema = JSON.parse(schemaString);
    } catch (err) {
      throw Error("Failed to parse JSON: " + err.message);
    }

    this.jsonLdContext = omitDeep(this.schema, VcSchema.contextPlusFieldsRegexes);

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

  private generateJsonSchema(): any {
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
      ...this.parseContextPlus(context, context[rootType], "root"),
    };
  }

  private parseContextPlus(context: any, node: any, key: string): any {
    if (typeof node !== "object") {
      console.warn(
        `Unsupported @context+ node type at ${key}: node is not an object. Excluding from JSON Schema. Node:`,
        node,
      );
      return;
    }
    // @TODO/tobek handle arrays

    if (node["@dataType"]) {
      this.debug(`Parsed "${key}": leaf node`, node);
      return {
        type: node["@dataType"],
        format: node["@format"],
        title: node["@title"],
        description: node["@description"],
      };
    }

    const containedType = node["@contains"];
    if (containedType) {
      this.debug(`Parsing "${key}": containedType`, node);
      const containedNode = context[containedType];
      if (containedNode) {
        const containedTypeProperties = this.parseContextPlus(context, containedNode, containedType);
        if (containedTypeProperties) {
          return {
            type: "object",
            required: containedNode["@required"] ? [containedType] : undefined,
            title: node["@title"],
            description: node["@description"],
            properties: {
              [containedType]: containedTypeProperties,
            },
          };
        } else {
          console.warn(
            `Referenced type "${containedType}" could not be parsed for JSON Schema; including "${key}" as freeform object. Node:`,
            node,
            "Referenced type resolved to:",
            containedNode,
          );
        }
      } else {
        console.warn(
          `Referenced type "${containedType}" could not be found in schema; including "${key}" as freeform object. Referenced from node:`,
          node,
        );
      }
      return {
        type: "object",
        properties: {},
      };
    }

    const innerContext = node["@context"];
    const innerContextProperties: { [key: string]: any } = {};
    if (innerContext) {
      this.debug(`Parsing "${key}": innerContext`, node);
      const required: string[] = [];
      Object.keys(innerContext)
        .filter((key) => key[0] !== "@")
        .forEach((key) => {
          if (innerContext[key]["@required"]) {
            required.push(key);
          }
          innerContextProperties[key] = this.parseContextPlus(context, innerContext[key], key);
        });
      return {
        type: "object",
        title: node["@title"],
        description: node["@description"],
        required: required.length ? required : undefined,
        properties: innerContextProperties,
      };
    }

    console.warn(`Unsupported @context+ node type at ${key}. excluding from JSON Schema. Node:`, node);
    return;
  }
}

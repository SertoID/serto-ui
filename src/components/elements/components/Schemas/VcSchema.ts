export class VcSchema {
  private schema: any;

  constructor(schemaString: string) {
    try {
      this.schema = JSON.parse(schemaString);
    } catch (err) {
      throw Error("Failed to parse JSON: " + err.message);
    }
  }

  public getJsonLdContext(): any {
    return this.schema;
  }

  public getJsonLdContextString(prettyPrint?: boolean): string {
    return JSON.stringify(this.getJsonLdContext(), null, prettyPrint ? 2 : undefined);
  }

  public getJsonSchema(): any {
    return {
      $schema: "http://json-schema.org/schema#",
      $id: "http://consensysidentity.com/schemas/schema-id.json", // @TODO
      title: "Content Publish Credential", // @TODO
      type: "object",
      properties: {
        "@context": {
          type: "array", // @TODO/tobek should be array or string
          items: {
            type: "string",
          },
        },
        id: {
          type: "string",
        },
        type: {
          type: "array",
          items: {
            type: "string",
          },
        },
        issuer: {
          type: "string",
        },
        issuanceDate: {
          type: "string",
          format: "date-time",
        },
        credentialSubject: {},
      },
    };
  }

  public getJsonSchemaString(prettyPrint?: boolean): string {
    return JSON.stringify(this.getJsonSchema(), null, prettyPrint ? 2 : undefined);
  }

  public validateVc(vc: any, cb: (isValid: boolean, invalidity?: string) => any): void {
    try {
      JSON.parse(vc);
    } catch (err) {
      return cb(false, "Invalid JSON: " + err.message);
    }
    cb(true);
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
        ...this.getJsonLdContext(), // this will overwrite VC's @context with given context, which may not be what we want?
      },
      null,
      2,
    );
    form.appendChild(field);

    document.body.appendChild(form);
    form.submit();
  }
}

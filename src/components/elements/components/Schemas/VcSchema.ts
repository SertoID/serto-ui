export class VcSchema {
  private schema: any;

  constructor(schemaString: string) {
    try {
      this.schema = JSON.parse(schemaString);
    } catch (err) {
      throw Error("Failed to parse JSON: " + err.message);
    }
  }

  public getJsonLdContext(prettyPrint?: boolean): string {
    return JSON.stringify(this.schema, null, prettyPrint ? 2 : undefined);
  }

  public getJsonSchema(prettyPrint?: boolean): string {
    return JSON.stringify(this.schema, null, prettyPrint ? 2 : undefined);
  }

  public validateVc(vc: any, cb: (isValid: boolean, invalidity?: string) => any): void {
    try {
      JSON.parse(vc);
    } catch (err) {
      return cb(false, "Invalid JSON: " + err.message);
    }
    cb(true);
  }
}

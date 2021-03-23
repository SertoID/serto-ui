import * as React from "react";
import { Home, Send } from "@rimble/icons";

import { SchemaDataInput, SchemaDataResponse } from "../components/views/Schemas";
import { NavItemProps } from "../components/layouts/Global/Nav";

export interface SertoUiContextInterface {
  navItems: NavItemProps[];

  /** URL or path to send user to in order for them to create a schema. */
  createSchemaUrl: string;
  /** Build URL at which a given schema will be hosted. */
  buildSchemaUrl(slug: string, type: "ld-context-plus" | "ld-context" | "json-schema", version?: string): string;
  createSchema(schema: SchemaDataInput): Promise<any>;
  updateSchema(schema: SchemaDataInput): Promise<any>;
  saveSchema?(schemaSlug: string): Promise<any>;
  unsaveSchema?(schemaSlug: string): Promise<any>;
  getSchemas(global?: boolean): Promise<SchemaDataResponse[]>;
  issueVc(body: any): Promise<any>;
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const createMockApiRequest = (response?: any): ((...args: any[]) => Promise<any>) => {
  return (async (...args: any[]) => {
    return new Promise((resolve) =>
      setTimeout(() => {
        console.log("SertoUiContext mock API request resolving. Request args:", ...args);
        resolve(response);
      }, 500),
    );
  }) as any;
};

export const defaultSertoUiContext: SertoUiContextInterface = {
  navItems: [
    { text: "Home", url: "/", icon: Home },
    { text: "Nowhere", url: "/nowhere", icon: Send },
  ],
  buildSchemaUrl: (slug, type, version) =>
    `https://example.com/schemas/${slug}${version && "/" + version}/${type}.json`,
  createSchemaUrl: "/schemas/",
  createSchema: createMockApiRequest(),
  updateSchema: createMockApiRequest(),
  getSchemas: createMockApiRequest([]),
  issueVc: createMockApiRequest(),
};

export const SertoUiContext = React.createContext(defaultSertoUiContext);

import * as React from "react";
import { Home, Send } from "@rimble/icons";

import { SchemaDataInput, SchemaDataResponse } from "../components/views/Schemas";
import { NavItemProps } from "../components/layouts/Global/Nav";

export interface SertoUiContextInterface {
  navItems: NavItemProps[];

  /** Base URL on which schema JSON URLs will be built according to `getSchemaUrl` util. */
  schemaHostBaseUrl: string;
  /** URL or path to send user to in order for them to create a schema. */
  createSchemaUrl: string;
  createSchema(schema: SchemaDataInput): Promise<any>;
  getSchemas(global?: boolean): Promise<SchemaDataResponse[]>;
  issueVc(body: any): Promise<any>;
}

const createMockApiRequest = (response?: any) => {
  return (async () => {
    return new Promise((resolve) =>
      setTimeout(() => {
        console.log("SertoUiContext mock API request resolving");
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
  schemaHostBaseUrl: "https://alpha.consensysidentity.com",
  createSchemaUrl: "/schemas/",
  createSchema: createMockApiRequest(),
  getSchemas: createMockApiRequest([]),
  issueVc: createMockApiRequest(),
};

export const SertoUiContext = React.createContext(defaultSertoUiContext);

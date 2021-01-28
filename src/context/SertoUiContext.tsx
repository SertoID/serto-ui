import * as React from "react";
import { Home, Send } from "@rimble/icons";

import { SchemaDataInput, SchemaDataResponse } from "../components/elements/components/Schemas/types";
import { NavItemProps } from "../components/elements/layouts/Global/Nav";

export interface SertoUiContextInterface {
  navItems: NavItemProps[];
  createSchemaUrl: string;
  createSchema(schema: SchemaDataInput): Promise<any>;
  getSchemas(global?: boolean): Promise<SchemaDataResponse[]>;
  issueVc(body: any): Promise<any>;
}

const createMockApiRequest = (response?: any) => {
  return (async () => {
    return new Promise((resolve) => setTimeout(resolve(response), 500));
  }) as any;
};

const mockContext: SertoUiContextInterface = {
  navItems: [
    { text: "Home", url: "/", icon: Home },
    { text: "Nowhere", url: "/nowhere", icon: Send },
  ],
  createSchemaUrl: "/schemas/",
  createSchema: createMockApiRequest(),
  getSchemas: createMockApiRequest([]),
  issueVc: createMockApiRequest(),
};

export const SertoUiContext = React.createContext(mockContext);

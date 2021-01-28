import * as React from "react";
import { Home, Send } from "@rimble/icons";

import { SchemaDataInput, SchemaDataResponse } from "../components/views/Schemas";
import { NavItemProps } from "../components/layouts/Global/Nav";

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

const defaultContext: SertoUiContextInterface = {
  navItems: [
    { text: "Home", url: "/", icon: Home },
    { text: "Nowhere", url: "/nowhere", icon: Send },
  ],
  createSchemaUrl: "/schemas/",
  createSchema: createMockApiRequest(),
  getSchemas: createMockApiRequest([]),
  issueVc: createMockApiRequest(),
};

export const SertoUiContext = React.createContext(defaultContext);

export interface SertoUiContextProviderProps {
  value?: Partial<SertoUiContextInterface>;
}
export const SertoUiContextProvider: React.FunctionComponent<SertoUiContextProviderProps> = (props) => (
  <SertoUiContext.Provider value={{ ...defaultContext, ...props.value }}>{props.children}</SertoUiContext.Provider>
);

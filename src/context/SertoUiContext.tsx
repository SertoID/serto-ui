import * as React from "react";
import { Home, Send } from "@rimble/icons";

import { SertoSchemasService, mockSertoSchemasService } from "../services/SertoSchemasService";
import { NavItemProps } from "../components/layouts/Global/Nav";
import { Identifier } from "../types";

export interface SertoUiContextInterface {
  navItems: NavItemProps[];
  schemasService: Omit<SertoSchemasService, "url" | "request" | "ensureAuthenticated">;
  userDids?: Identifier[];
  issueVc?(body: any): Promise<any>;
}

export const defaultSertoUiContext: SertoUiContextInterface = {
  navItems: [
    { text: "Home", url: "/", icon: Home },
    { text: "Nowhere", url: "/nowhere", icon: Send },
  ],
  schemasService: mockSertoSchemasService,
};

export const SertoUiContext = React.createContext(defaultSertoUiContext);

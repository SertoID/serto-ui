import * as React from "react";
import { Home, Send } from "@rimble/icons";

import { SertoSchemasService, mockSertoSchemasService } from "../services/SertoSchemasService";
import { NavItemProps } from "../components/layouts/Global/Nav";
import { Identifier } from "../types";

export interface SertoUiContextInterface {
  navItems: NavItemProps[];
  schemasService: Omit<SertoSchemasService, "url" | "request" | "ensureAuthenticated">;
  schemasUiUrl?: string;
  userDids?: Identifier[];
  issueVc?(body: any): Promise<any>;
}

export const defaultSertoUiContext: SertoUiContextInterface = {
  navItems: [
    { text: "Home", url: "/", icon: Home },
    { text: "Nowhere", url: "/nowhere", icon: Send },
  ],
  schemasService: mockSertoSchemasService,
  schemasUiUrl: "https://staging.schemas.serto.id",
};

export const SertoUiContext = React.createContext(defaultSertoUiContext);

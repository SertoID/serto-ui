import * as React from "react";
import { Home, Send } from "@rimble/icons";

import { SertoSchemasService, mockSertoSchemasService } from "../services/SertoSchemasService";
import { SertoSearchService, mockSertoSearchService } from "../services/SertoSearchService";
import { NavItemProps } from "../components/layouts/Global/Nav";
import { Identifier, VeramoIssueVcOptions } from "../types";

export interface SertoUiContextInterface {
  navItems: NavItemProps[];
  schemasService: Omit<SertoSchemasService, "url" | "request" | "ensureAuthenticated">;
  schemasUiUrl?: string;
  searchService: Omit<SertoSearchService, "url" | "request">;
  userDids?: Identifier[];
  issueVc?(vc: any, options: VeramoIssueVcOptions): Promise<any>;
  sendVc?(from: string, to: string, vc: { [key: string]: any }): Promise<any>;
}

export const defaultSertoUiContext: SertoUiContextInterface = {
  navItems: [
    { text: "Home", url: "/", icon: Home },
    { text: "Nowhere", url: "/nowhere", icon: Send },
  ],
  schemasService: mockSertoSchemasService,
  schemasUiUrl: "https://beta.schemas.serto.id",
  searchService: mockSertoSearchService,
};

export const SertoUiContext = React.createContext(defaultSertoUiContext);

import * as React from "react";
import { Home, Send } from "@rimble/icons";

import { config } from "../config";
import { SertoSchemasService, mockSertoSchemasService } from "../services/SertoSchemasService";
import { SertoSearchService, mockSertoSearchService } from "../services/SertoSearchService";
import { NavItemProps } from "../components/layouts/Global/Nav";
import { Identifier, VeramoIssueVcOptions } from "../types";

export enum RENDER_CONTEXT {
  AGENT,
  SCHEMAS,
  SEARCH,
  VC_EMBED,
}

export interface ToastInterface {
  addMessage(
    message: string,
    options: {
      colorTheme?: string;
      variant?: string;
      [key: string]: any;
    },
  ): void;
  [key: string]: any;
}

export interface SertoUiContextInterface {
  toastProvider: ToastInterface;
  navItems?: NavItemProps[];
  renderContext?: RENDER_CONTEXT;
  schemasService: Omit<SertoSchemasService, "url" | "request" | "ensureAuthenticated">;
  schemasUiUrl?: string;
  searchService: Omit<SertoSearchService, "url" | "request">;
  userDids?: Identifier[];
  issueVc?(vc: any, options: VeramoIssueVcOptions): Promise<any>;
  sendVc?(from: string, to: string, vc: { [key: string]: any }): Promise<any>;
}

export const defaultSertoUiContext: SertoUiContextInterface = {
  toastProvider: window.toastProvider,
  navItems: [
    { text: "Home", url: "/", icon: Home, section: "home" },
    { text: "Nowhere", url: "/nowhere", icon: Send, section: "nowhere" },
  ],
  schemasService: mockSertoSchemasService,
  schemasUiUrl: config.SCHEMAS_UI_URL,
  searchService: mockSertoSearchService,
};

export const SertoUiContext = React.createContext(defaultSertoUiContext);

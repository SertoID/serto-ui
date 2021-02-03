import * as React from "react";
import { IdentityThemeProvider } from "../themes/IdentityTheme";
import { SertoUiContext, SertoUiContextInterface, defaultSertoUiContext } from "./SertoUiContext";

export interface SertoUiContextProviderProps {
  theme?: any;
  context?: Partial<SertoUiContextInterface>;
}

export const SertoUiProvider: React.FunctionComponent<SertoUiContextProviderProps> = (props) => (
  <SertoUiContext.Provider value={{ ...defaultSertoUiContext, ...props.context }}>
    <IdentityThemeProvider theme={props.theme}>{props.children}</IdentityThemeProvider>
  </SertoUiContext.Provider>
);

import * as React from "react";
import { IdentityThemeProvider } from "../themes/IdentityTheme";
import { SertoUiContext, SertoUiContextInterface, defaultSertoUiContext } from "./SertoUiContext";
import { SertoSearchService } from "../services/SertoSearchService";
import { SertoSchemasService } from "../services/SertoSchemasService";

type DeepPartial<T> = {
  [P in keyof T]?: DeepPartial<T[P]>;
};

export interface SertoUiContextProviderProps {
  schemasApiUrl?: string;
  schemasApiJwt?: string;
  searchApiUrl?: string;
  theme?: any;
  context?: DeepPartial<SertoUiContextInterface>;
}

export const SertoUiProvider: React.FunctionComponent<SertoUiContextProviderProps> = (props) => {
  // We want to merge props.context.schemasService into the default SertoSchemasService, but can't use the spread operator cause it will ignore the prototype properties of SertoSchemasService. So instead instantiate the class and then apply any overrides from props:
  const schemasService = new SertoSchemasService(props.schemasApiUrl, props.schemasApiJwt);
  Object.keys(props.context?.schemasService || {}).forEach((key) => {
    // "as any" cause TypeScript doesn't like indexing a class instance with an arbitrary string, and `Object.keys` doesn't seem to preserve types.
    (schemasService as any)[key] = (props.context?.schemasService as any)[key];
  });
  const searchService = new SertoSearchService(props.searchApiUrl);
  Object.keys(props.context?.searchService || {}).forEach((key) => {
    (searchService as any)[key] = (props.context?.searchService as any)[key];
  });

  const context = {
    ...defaultSertoUiContext,
    ...props.context,
    schemasService,
    searchService,
  } as SertoUiContextInterface;

  return (
    <SertoUiContext.Provider value={context}>
      <IdentityThemeProvider theme={props.theme}>{props.children}</IdentityThemeProvider>
    </SertoUiContext.Provider>
  );
};

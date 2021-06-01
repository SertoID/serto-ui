import { createContext, useMemo } from "react";
import { SertoSearchService } from "../services/SertoSearchService";

// eslint-disable-next-line
// @ts-ignore
export const SertoSearchContext = createContext<SertoSearchService>({});

export const SertoSearchProvider: React.FunctionComponent = ({ children }) => {
  const sertoSearch = useMemo(() => new SertoSearchService(), []);
  return <SertoSearchContext.Provider value={sertoSearch}>{children}</SertoSearchContext.Provider>;
};

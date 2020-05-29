import * as React from "react";

import { TrustAgencyService } from "../services/TrustAgencyService";

// typescript hack to get around having to initialize the object
// @ts-ignore
export const TrustAgencyContext = React.createContext<TrustAgencyService>({});

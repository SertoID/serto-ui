import * as React from "react";
import { FeatureFlagService } from "../services/FeatureFlagService";
import { TrustAgencyService } from "../services/TrustAgencyService";

// typescript hack to get around having to initialize the object
// @ts-ignore
export const TrustAgencyContext = React.createContext<TrustAgencyService>({});
// @ts-ignore
export const FeatureFlagContext = React.createContext<FeatureFlagService>({});

export interface TrustAgencyProviderProps {
  featureFlags?: string[];
}

export const TrustAgencyProvider: React.FunctionComponent<TrustAgencyProviderProps> = ({ children, featureFlags }) => {
  const trustAgent = React.useMemo(() => new TrustAgencyService(), []);
  const features = new FeatureFlagService(featureFlags);

  return (
    <TrustAgencyContext.Provider value={trustAgent}>
      <FeatureFlagContext.Provider value={features}>{children}</FeatureFlagContext.Provider>
    </TrustAgencyContext.Provider>
  );
};

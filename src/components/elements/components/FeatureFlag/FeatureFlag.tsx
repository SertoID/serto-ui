import * as React from "react";
import { FeatureFlagContext } from "../../../../context/TrustAgentProvider";
import { FeatureFlagService } from "../../../../services/FeatureFlagService";

export interface FeatureFlagProps {
  feature: string;
  replacement?: JSX.Element;
  replacementComponent?: React.ComponentType;
  children: any;
}

export const FeatureFlag: React.FunctionComponent<FeatureFlagProps> = (props) => {
  const features = React.useContext<FeatureFlagService>(FeatureFlagContext);
  const { feature, children, replacement, replacementComponent } = props;

  if (features.featureEnabled?.(feature)) {
    return <>{children}</>;
  } else if (replacementComponent) {
    const Replacement = replacementComponent;
    return <Replacement />;
  } else {
    return <>{replacement}</>;
  }
};

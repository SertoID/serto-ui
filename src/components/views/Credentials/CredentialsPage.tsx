import * as React from "react";
import { useParams, useHistory, generatePath } from "react-router-dom";
import { GlobalLayout, Header, HeaderBox, Tabs } from "../../elements/layouts";
import { featureFlags, routes } from "../../../constants";
import { IssuedCredentials } from "./IssuedCredentials";
import { ReceivedCredentials } from "./ReceivedCredentials";
import { FeatureFlagContext } from "../../../context/TrustAgentProvider";
import { FeatureFlagService } from "../../../services/FeatureFlagService";
import { IssueCredentialButton } from "../../elements/components/Credential/IssueCredentialButton";

export const CredentialsPage: React.FunctionComponent = (props) => {
  const features = React.useContext<FeatureFlagService>(FeatureFlagContext);
  const { tabName } = useParams();
  const history = useHistory();
  if (tabName && tabName !== "issued" && tabName !== "received") {
    history.push(generatePath(routes.CREDENTIALS));
  }

  return (
    <GlobalLayout url={routes.CREDENTIALS}>
      <HeaderBox>
        <Header heading="Credentials">
          <IssueCredentialButton />
        </Header>
      </HeaderBox>
      <Tabs
        activeTabName={tabName || "issued"}
        tabs={[
          {
            tabName: "issued",
            title: "Issued Credentials",
            content: <IssuedCredentials />,
          },
        ].concat(
          features.featureEnabled(featureFlags.VC_WIP)
            ? {
                tabName: "received",
                title: "Received Credentials",
                content: <ReceivedCredentials />,
              }
            : [],
        )}
        onTabClicked={(tabName) => {
          history.push(generatePath(routes.CREDENTIALS, { tabName }));
        }}
      />
    </GlobalLayout>
  );
};

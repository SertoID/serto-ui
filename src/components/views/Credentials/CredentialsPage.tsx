import * as React from "react";
import useSWR from "swr";
import { useParams, useHistory, generatePath } from "react-router-dom";
import { TrustAgencyContext } from "../../../context/TrustAgentProvider";
import { TrustAgencyService } from "../../../services/TrustAgencyService";
import { Button } from "rimble-ui";
import { GlobalLayout, Header, HeaderBox, Tabs } from "../../elements/layouts";
import { ModalWithX } from "../../elements/components/Modals";
import { featureFlags, routes } from "../../../constants";
import { IssueVc } from "./IssueVc";
import { IssuedCredentials } from "./IssuedCredentials";
import { ReceivedCredentials } from "./ReceivedCredentials";
import { FeatureFlagContext } from "../../../context/TrustAgentProvider";
import { FeatureFlagService } from "../../../services/FeatureFlagService";

export const CredentialsPage: React.FunctionComponent = (props) => {
  const features = React.useContext<FeatureFlagService>(FeatureFlagContext);
  const { tabName } = useParams();
  const history = useHistory();
  if (tabName && tabName !== "issued" && tabName !== "received") {
    history.push(generatePath(routes.CREDENTIALS));
  }

  const TrustAgent = React.useContext<TrustAgencyService>(TrustAgencyContext);
  const [isIssueModalOpen, setIsIssueModalOpen] = React.useState(false);
  const { data: identifiers } = useSWR("/v1/tenant/agent/identityManagerGetIdentities", () =>
    TrustAgent.getTenantIdentifiers(),
  );
  const hasIdentifier = !!identifiers?.[0]?.did;

  return (
    <GlobalLayout url={routes.CREDENTIALS}>
      <HeaderBox>
        <Header heading="Credentials">
          {hasIdentifier && (
            <Button.Outline size="small" onClick={() => setIsIssueModalOpen(true)}>
              Issue Credential
            </Button.Outline>
          )}
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

      <ModalWithX isOpen={isIssueModalOpen} close={() => setIsIssueModalOpen(false)} width={11}>
        <IssueVc defaultIssuer={identifiers?.[0]?.did} onComplete={() => setIsIssueModalOpen(false)} />
      </ModalWithX>
    </GlobalLayout>
  );
};

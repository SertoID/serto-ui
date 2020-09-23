import * as React from "react";
import { Box, Button, Loader, Tooltip } from "rimble-ui";
import useSWR, { mutate } from "swr";
import { TrustAgencyContext } from "../../../context/TrustAgentProvider";
import { TrustAgencyService } from "../../../services/TrustAgencyService";
import { ModalWithX } from "../../elements/components/Modals";
import { baseColors } from "../../elements/themes";
import { IssueVc } from "./IssueVc";

export const Issue: React.FunctionComponent = (props) => {
  const TrustAgent = React.useContext<TrustAgencyService>(TrustAgencyContext);

  const [error, setError] = React.useState<string | undefined>();
  const [isIssueModalOpen, setIsIssueModalOpen] = React.useState(false);

  const {
    data: identifiers,
    error: getIdentifiersError,
    isValidating: identifiersLoading,
  } = useSWR("/v1/tenant/agent/identityManagerGetIdentities", () => TrustAgent.getTenantIdentifiers());
  if (getIdentifiersError) {
    console.error("failed to get identifiers:", getIdentifiersError);
  }
  const hasIdentifier = !!identifiers?.[0]?.did;

  async function createIdentifier() {
    try {
      await TrustAgent.createTenantIdentifier();
    } catch (err) {
      console.error("failed to create identifier:", err);
      setError(err.message);
      return;
    }
    mutate("/v1/tenant/agent/identityManagerGetIdentities");
  }

  return (
    <>
      <Box bg={baseColors.white} borderRadius={1} p={3}>
        <Box width="100%" mb={2}>
          <Button onClick={createIdentifier} disabled={identifiersLoading && !hasIdentifier}>
            {identifiersLoading && !hasIdentifier ? <Loader color="white" /> : "Create Identifier"}
          </Button>
        </Box>
        <pre>identifiers:</pre>
        {identifiers &&
          identifiers.map((id: any, i: number) => {
            return <pre key={i}>{id.did}</pre>;
          })}
        <pre>{error || getIdentifiersError ? `error: ${error || getIdentifiersError}` : undefined}</pre>

        <Box my={10}>
          {identifiers?.[0] ? (
            <Button onClick={() => setIsIssueModalOpen(true)}>Issue Credential</Button>
          ) : (
            <Tooltip message="You must have at least one identifier in order to issue a VC" placement="top">
              <Button.Base>Issue Credential</Button.Base>
            </Tooltip>
          )}
        </Box>
      </Box>

      <ModalWithX isOpen={isIssueModalOpen} close={() => setIsIssueModalOpen(false)} width={11}>
        <IssueVc defaultIssuer={identifiers?.[0]?.did} onComplete={() => setIsIssueModalOpen(false)} />
      </ModalWithX>
    </>
  );
};

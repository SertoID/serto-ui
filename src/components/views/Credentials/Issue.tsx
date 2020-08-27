import * as React from "react";
import useSWR, { mutate } from "swr";
import { Box, Button, Modal, Card, Tooltip, Loader } from "rimble-ui";
import { TrustAgencyContext } from "../../../context/TrustAgentProvider";
import { TrustAgencyService } from "../../../services/TrustAgencyService";
import { IssueVc } from "./IssueVc";
import { baseColors } from "../../elements/themes";

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

      <Modal isOpen={isIssueModalOpen}>
        <Card p={0}>
          <Button.Text
            icononly
            icon="Close"
            position="absolute"
            top={0}
            right={0}
            mt={3}
            mr={3}
            onClick={() => setIsIssueModalOpen(false)}
          />
          <Box p={4} width={11} maxWidth="95%" maxHeight="95vh" style={{ overflowY: "auto" }}>
            <IssueVc defaultIssuer={identifiers?.[0]?.did} onComplete={() => setIsIssueModalOpen(false)} />
          </Box>
        </Card>
      </Modal>
    </>
  );
};

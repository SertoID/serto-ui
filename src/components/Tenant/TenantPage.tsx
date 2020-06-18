import * as React from "react";
import { Link } from "react-router-dom";
import { Box, Button, Heading, Modal, Card, Tooltip } from "rimble-ui";
import { TrustAgencyContext } from "../../context/TrustAgentProvider";
import { TrustAgencyService } from "../../services/TrustAgencyService";
import { Credentials } from "./Credentials";
import { IssueVc } from "./IssueVc";
import { LogOut } from "../auth/LogOut";

export const TenantPage: React.FunctionComponent = (props) => {
  const TrustAgent = React.useContext<TrustAgencyService>(TrustAgencyContext);

  const [error, setError] = React.useState<string | undefined>();
  const [identifiers, setIdentifiers] = React.useState<any[]>([]);
  const [isIssueModalOpen, setIsIssueModalOpen] = React.useState(false);

  const getIdentifiers = React.useCallback(async () => {
    try {
      const data = await TrustAgent.getTenantIdentifiers();
      setIdentifiers(data);
    } catch (err) {
      console.error("failed to get identifiers:", err);
      setError(err.message);
    }
  }, [TrustAgent]);

  async function createIdentifier() {
    try {
      await TrustAgent.createTenantIdentifier();
    } catch (err) {
      console.error("failed to create identifier:", err);
      setError(err.message);
      return;
    }
    getIdentifiers();
  }

  React.useEffect(() => {
    getIdentifiers();
  }, [getIdentifiers]);

  return (
    <div>
      <LogOut />
      <Box width={"auto"} position={"absolute"} top={"0"} right={"100px"}>
        <Link to="/tenant/feeds">
          <Button.Text>Feeds</Button.Text>
        </Link>
      </Box>

      <Heading as={"h1"}>Tenant</Heading>

      <Box width={[1]} mb={10}>
        <Button onClick={createIdentifier}>Create Identifier</Button>
      </Box>
      <Box width={[1]} mb={10}>
        <Button.Outline onClick={getIdentifiers}>Refresh Identifiers</Button.Outline>
      </Box>
      <pre>{identifiers ? `identifiers: ${JSON.stringify(identifiers)}` : undefined}</pre>
      <pre>{error ? `error: ${error}` : undefined}</pre>

      <Box my={10}>
        {identifiers[0] ? (
          <Button onClick={() => setIsIssueModalOpen(true)}>Issue Credential</Button>
        ) : (
          <Tooltip message="You must have at least one identifier in order to issue a VC" placement="top">
            <Button.Base>Issue Credential</Button.Base>
          </Tooltip>
        )}
      </Box>

      <Credentials />

      <Modal isOpen={isIssueModalOpen}>
        <Card p={0}>
          <Button.Text
            icononly
            icon={"Close"}
            position={"absolute"}
            top={0}
            right={0}
            mt={3}
            mr={3}
            onClick={() => setIsIssueModalOpen(false)}
          />
          <Box p={4} width={480} maxWidth="95%" maxHeight="95vh" style={{ overflowY: "auto" }}>
            <IssueVc defaultIssuer={identifiers[0]} onComplete={() => setIsIssueModalOpen(false)} />
          </Box>
        </Card>
      </Modal>
    </div>
  );
};

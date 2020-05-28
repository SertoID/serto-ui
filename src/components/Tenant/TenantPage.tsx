import * as React from "react";
import { useHistory } from "react-router-dom";
import { Box, Button, Heading } from "rimble-ui";
import { TrustAgencyContext } from "../../context/TrustAgentProvider";
import { TrustAgencyService } from "../../services/TrustAgencyService";

export const TenantPage: React.FunctionComponent = props => {
  const TrustAgent = React.useContext<TrustAgencyService>(TrustAgencyContext);

  const [error, setError] = React.useState<string | undefined>();
  const [identifiers, setIdentifiers] = React.useState<any[]>([]);
  const history = useHistory();

  async function getIdentifiers() {
    try {
      const data = await TrustAgent.getTenantIdentifiers();
      setIdentifiers(data);
    } catch (err) {
      console.error();
      setError(err.message);
    }
  }

  async function createIdentifier() {
    try {
      await TrustAgent.createTenantIdentifier();
    } catch (err) {
      console.error();
      setError(err.message);
      return;
    }
    getIdentifiers();
  }

  function logOut(event: React.MouseEvent) {
    event.preventDefault();
    TrustAgent.logout();
    history.push("/login");
  }

  return (
    <div>
      <Heading as={"h1"}>Tenant</Heading>
      <Box width={[1]} mb={10}>
        <Button onClick={createIdentifier}>Create Identifier</Button>
      </Box>
      <Box width={[1]} mb={10}>
        <Button onClick={getIdentifiers}>Get Identifiers</Button>
      </Box>
      <Box width={[1]} mb={10}>
        <Button onClick={logOut}>Log Out</Button>
      </Box>
      <pre>{error ? `error: ${error}` : undefined}</pre>
      <pre>{identifiers ? `identifiers: ${JSON.stringify(identifiers)}` : undefined}</pre>
    </div>
  );
};

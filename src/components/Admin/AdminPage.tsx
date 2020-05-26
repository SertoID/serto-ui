import * as React from "react";
import { Box, Button, Heading, Input } from "rimble-ui";
import { TrustAgencyContext } from "../../context/TrustAgentProvider";
import { TrustAgencyService } from "../../services/TrustAgencyService";

export const AdminPage: React.FunctionComponent = props => {
  const TrustAgent = React.useContext<TrustAgencyService>(TrustAgencyContext);

  const [error, setError] = React.useState<string | undefined>();
  const [tenants, setTenants] = React.useState<any[] | undefined>();

  async function getTenants() {
    try {
      const data = await TrustAgent.getTenants();
      setTenants(data);
    } catch (err) {
      console.error();
      setError(err.message);
    }
  }

  return (
    <div>
      <Heading as={"h1"}>Create Tenant</Heading>
      <Box width={[1]} mb={10}>
        <Input type="text" required={true} placeholder="Tenant name" />
      </Box>
      <Box width={[1]} mb={10}>
        <Button onClick={getTenants}>Create Tenant</Button>
      </Box>
      <Box width={[1]} mb={10}>
        <Button onClick={getTenants}>Get Tenants</Button>
      </Box>
      <div>{error ? `error: ${error}` : undefined}</div>
      <div>{tenants ? `tenants: ${JSON.stringify(tenants)}` : undefined}</div>
    </div>
  );
};

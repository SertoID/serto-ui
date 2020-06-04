import * as React from "react";
import { Box, Button, Heading, Input } from "rimble-ui";
import { useHistory } from "react-router-dom";
import { TrustAgencyContext } from "../../context/TrustAgentProvider";
import { TrustAgencyService } from "../../services/TrustAgencyService";

export const AdminPage: React.FunctionComponent = props => {
  const TrustAgent = React.useContext<TrustAgencyService>(TrustAgencyContext);

  const [error, setError] = React.useState<string | undefined>();
  const [tenants, setTenants] = React.useState<any[]>([]);
  const [tenantName, setTenantName] = React.useState("");
  const history = useHistory();

  const getTenants = React.useCallback(async () => {
    try {
      const data = await TrustAgent.getTenants();
      setTenants(data);
    } catch (err) {
      console.error();
      setError(err.message);
    }
  }, [TrustAgent])

  async function createTenant() {
    try {
      TrustAgent.createTenant(tenantName);
    } catch (err) {
      console.error();
      setError(err.message);
      return;
    }
    await getTenants();
  }

  function logOut(event: React.MouseEvent) {
    event.preventDefault();
    TrustAgent.logout();
    history.push("/login");
  }

  React.useEffect(() => {
    getTenants();
  }, [getTenants]);

  return (
    <div>
      <Heading as={"h1"}>Admin</Heading>
      <Box width={[1]} mb={10}>
        <Input
          type="text"
          required={true}
          placeholder="Tenant name"
          value={tenantName}
          onChange={(event: any) => setTenantName(event.target.value)}
        />
        <Button onClick={createTenant}>Create Tenant</Button>
      </Box>
      <Box width={[1]} mb={10}>
        <Button onClick={getTenants}>Refresh Tenants</Button>
      </Box>
      <Box width={[1]} mb={10}>
        <Button onClick={logOut}>Log Out</Button>
      </Box>
      <pre>{error ? `error: ${error}` : undefined}</pre>
      <pre style={{whiteSpace: "pre-wrap"}}>{tenants ? `tenants: ${JSON.stringify(tenants)}` : undefined}</pre>
    </div>
  );
};

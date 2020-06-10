import * as React from "react";
import { Box, Button, Heading, Input } from "rimble-ui";
import { TrustAgencyContext } from "../../context/TrustAgentProvider";
import { TrustAgencyService } from "../../services/TrustAgencyService";
import { LogOut } from "../auth/LogOut";

export const AdminPage: React.FunctionComponent = props => {
  const TrustAgent = React.useContext<TrustAgencyService>(TrustAgencyContext);

  const [error, setError] = React.useState<string | undefined>();
  const [tenants, setTenants] = React.useState<any[]>([]);
  const [tenantName, setTenantName] = React.useState("");

  const getTenants = React.useCallback(async () => {
    try {
      const data = await TrustAgent.getTenants();
      setTenants(data);
    } catch (err) {
      console.error("failed to get tenants:", err);
      setError(err.message);
    }
  }, [TrustAgent])

  async function createTenant() {
    try {
      const response = await TrustAgent.createTenant(tenantName);
      prompt("Tenant activation key:", response.activationJwt);
    } catch (err) {
      console.error("failed to create tenant:", err);
      setError(err.message);
      return;
    }
    await getTenants();
  }

  React.useEffect(() => {
    getTenants();
  }, [getTenants]);

  return (
    <div>
      <LogOut />
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
        <Button.Outline onClick={getTenants}>Refresh Tenants</Button.Outline>
      </Box>
      <pre>{error ? `error: ${error}` : undefined}</pre>
      <pre style={{whiteSpace: "pre-wrap"}}>{tenants ? `tenants: ${JSON.stringify(tenants)}` : undefined}</pre>
    </div>
  );
};

import * as React from "react";
import { Redirect } from "react-router-dom";
import { Box, Button, Card, Field, Heading, Input } from "rimble-ui";
import { TrustAgencyContext } from "../../context/TrustAgentProvider";
import { TrustAgencyService } from "../../services/TrustAgencyService";

export const LoginPage = () => {
  const TrustAgent = React.useContext<TrustAgencyService>(TrustAgencyContext);

  const [error, setError] = React.useState<string | undefined>();
  const [tenants, setTenants] = React.useState<any[] | undefined>();
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");

  async function doLogin() {
    const tenantID = username;
    const token = password;
    try {
      await TrustAgent.login(tenantID, token);
      setTenants([]);
    } catch (err) {
      console.error();
      setError(err.message);
    }
  }

  return (
    <Card width={"auto"} maxWidth={"400px"}>
      <Heading as={"h1"}>Login</Heading>
      <Box width={[1]} mb={10}>
        <Field label="Username">
          <Input
            value={username}
            onChange={(event: any) => setUsername(event.target.value)}
            name="username"
            type="text"
            required={true}
          />
        </Field>
      </Box>
      <Box width={[1]} mb={10}>
        <Field label="Password">
          <Input
            value={password}
            onChange={(event: any) => setPassword(event.target.value)}
            name="password"
            type="password"
            required={true}
          />
        </Field>
      </Box>
      <Box width={[1]}>
        {TrustAgent.isAuthenticated() ? (
          <Redirect to={"/admin"} />
        ) : (
          <Button onClick={doLogin}>Login</Button>
        )}
      </Box>
      <div>{error ? `error: ${error}` : undefined}</div>
      <div>{tenants ? `tenants: ${JSON.stringify(tenants)}` : undefined}</div>
    </Card>
  );
};

import * as React from "react";
import { useHistory } from "react-router-dom";
import { Box, Button, Card, Field, Heading, Input } from "rimble-ui";
import { TrustAgencyContext } from "../../context/TrustAgentProvider";
import { TrustAgencyService } from "../../services/TrustAgencyService";

export const LoginPage = () => {
  const TrustAgent = React.useContext<TrustAgencyService>(TrustAgencyContext);

  const [error, setError] = React.useState<string | undefined>();
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const history = useHistory();

  async function doLogin() {
    const tenantID = username;
    const token = password;
    try {
      await TrustAgent.login(tenantID, token);
      history.push(username === "admin" ? "/admin" : "/tenant");
    } catch (err) {
      console.error("error logging in:", err);
      setError("Login failed: " + err.message);
    }
  }

  async function activateTenant() {
    try {
      const activationToken = prompt("Enter activation token:");
      if (activationToken) {
        const response = await TrustAgent.activateTenant(activationToken);
        prompt("Success. Credentials:\n\n", JSON.stringify(response));
      }
    } catch (err) {
      console.error("error activating tenant:", err);
      setError("Activation failed: " + err.message);
    }
  }

  return (
    <Card width={"auto"} maxWidth={"400px"}>
      <Heading as={"h1"}>Login</Heading>
      <Box width={[1]} mb={10}>
        <Field label="Username or ID">
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
        <Field label="API Key">
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
        <Button onClick={doLogin}>Login</Button>
      </Box>
      <Box width={[1]} my={10}>
        <Button.Outline onClick={activateTenant}>Activate new tenant</Button.Outline>
      </Box>
      <pre>{error ? `error: ${error}` : undefined}</pre>
    </Card>
  );
};

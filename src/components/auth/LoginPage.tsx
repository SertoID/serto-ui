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
      setError(err.message);
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
      <h5><i>test creds:</i></h5>
      <pre><h5>admin</h5>ID: admin<br />API key: 02a52238-900a-4206-bb11-2842082f3b66</pre>
      <pre><h5>tenant "Noodle"</h5>ID: a83b4c2d-3faa-4e1c-b1ea-d68f30e9336d<br />API key: 59d7f74b-11c5-4709-812d-422355d757ab</pre>
      <pre>{error ? `error: ${error}` : undefined}</pre>
    </Card>
  );
};

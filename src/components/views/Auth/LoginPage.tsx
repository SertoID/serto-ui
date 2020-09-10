import * as React from "react";
import { Redirect, useHistory } from "react-router-dom";
import { Box, Button, Card, Flash, Text } from "rimble-ui";
import { useAuth0 } from "@auth0/auth0-react";
import { TrustAgencyContext } from "../../../context/TrustAgentProvider";
import { TrustAgencyService } from "../../../services/TrustAgencyService";
import { routes } from "../../../constants";
import { LoginErrorMsg } from "../../elements/text";
import { colors } from "../../elements/themes";

export const LoginPage = () => {
  const { loginWithPopup, getIdTokenClaims, logout, isAuthenticated } = useAuth0();
  const TrustAgent = React.useContext<TrustAgencyService>(TrustAgencyContext);

  const [error, setError] = React.useState<any | undefined>();
  const history = useHistory();

  const doLogout = () => {
    TrustAgent.logout();
    logout();
  };

  async function doLogin() {
    try {
      await loginWithPopup();
      const token = await getIdTokenClaims();
      console.log({ token });
      await TrustAgent.login(token.__raw);
      history.push(routes.HOMEPAGE);
    } catch (err) {
      console.error("error logging in:", err);
      setError(LoginErrorMsg);
      doLogout();
    }
  }

  async function doSignup() {
    try {
      await loginWithPopup();
      const token = await getIdTokenClaims();
      console.log({ token });
      await TrustAgent.signup(token.__raw);
      history.push(routes.ONBOARDING);
    } catch (err) {
      console.error("error signing up:", err);
      setError("Sign up failed: " + err.message);
      doLogout();
    }
  }

  if (isAuthenticated && TrustAgent.isAuthenticated()) {
    return <Redirect to={routes.HOMEPAGE} />;
  }

  return (
    <Box bg={colors.primary.base} height="100vh" width="100%">
      <Card
        borderTopRightRadius={5}
        borderBottomRightRadius={5}
        bottom={0}
        left={0}
        position="fixed"
        top={0}
        width="525px"
      >
        <Text color={colors.primary.base} fontSize={5} fontWeight={3} mb={5} mt={7}>
          Login to TrustAgent
        </Text>
        <Box width="100%">
          <Button onClick={doLogin} mb={3} width="100%">
            Login
          </Button>
          <Button.Outline onClick={doSignup} mb={3} width="100%">
            Create Account
          </Button.Outline>
        </Box>

        {error && (
          <Box p={1} mb={1}>
            <Flash my={3} variant="danger">
              {error}
            </Flash>
          </Box>
        )}
      </Card>
    </Box>
  );
};

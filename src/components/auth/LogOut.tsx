import * as React from "react";
import { useHistory } from "react-router-dom";
import { Box, Button } from "rimble-ui";
import { TrustAgencyContext } from "../../context/TrustAgentProvider";
import { TrustAgencyService } from "../../services/TrustAgencyService";

export const LogOut: React.FunctionComponent = (props) => {
  const TrustAgent = React.useContext<TrustAgencyService>(TrustAgencyContext);
  const history = useHistory();

  function logOut(event: React.MouseEvent) {
    event.preventDefault();
    TrustAgent.logout();
    history.push("/login");
  }

  return (
    <>
      <Box width={"auto"} position={"absolute"} top={"0"} right={"10px"}>
        <Button.Text onClick={logOut}>Log Out</Button.Text>
      </Box>
    </>
  );
};

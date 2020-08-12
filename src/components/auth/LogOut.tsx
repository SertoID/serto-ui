import * as React from "react";
import { useHistory } from "react-router-dom";
import { routes } from "../../constants";
import { Button } from "rimble-ui";
import { TrustAgencyContext } from "../../context/TrustAgentProvider";
import { TrustAgencyService } from "../../services/TrustAgencyService";
import { useAuth0 } from "@auth0/auth0-react";

export const LogOut: React.FunctionComponent = (props) => {
  const { logout } = useAuth0();
  const TrustAgent = React.useContext<TrustAgencyService>(TrustAgencyContext);
  const history = useHistory();

  function logOut(event: React.MouseEvent) {
    event.preventDefault();
    TrustAgent.logout();
    logout();
    history.push(routes.LOGIN);
  }

  return (
    <Button.Outline onClick={logOut} size="small" mt={3} width="100%">
      Log Out
    </Button.Outline>
  );
};

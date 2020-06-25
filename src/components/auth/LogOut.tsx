import * as React from "react";
import { useHistory } from "react-router-dom";
import { Button } from "rimble-ui";
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
    <Button.Outline onClick={logOut} height={"2.5rem"} mt={"12px"} width={1}>
      Log Out
    </Button.Outline>
  );
};

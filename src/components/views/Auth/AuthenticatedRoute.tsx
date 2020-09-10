import React from "react";
import { Redirect, Route } from "react-router-dom";
import { routes } from "../../../constants";
import { TrustAgencyContext } from "../../../context/TrustAgentProvider";
import { TrustAgencyService } from "../../../services/TrustAgencyService";
import { useAuth0 } from "@auth0/auth0-react";
import { Flex, Loader } from "rimble-ui";

export const AuthenticatedRoute = ({ ...otherProps }) => {
  const TrustAgent = React.useContext<TrustAgencyService>(TrustAgencyContext);
  const { isAuthenticated, isLoading, logout } = useAuth0();

  if (isLoading) {
    return (
      <Flex alignItems="center" justifyContent="center" height="100vh">
        <Loader size="30px" />
      </Flex>
    );
  }

  if (!isAuthenticated || !TrustAgent.isAuthenticated()) {
    TrustAgent.logout();
    logout();
    return <Redirect to={routes.LOGIN} />;
  }

  return <Route {...otherProps} />;
};

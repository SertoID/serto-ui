import React from "react";
import { Redirect, Route } from "react-router-dom";
import { routes } from "../../constants";
import { TrustAgencyContext } from "../../context/TrustAgentProvider";
import { TrustAgencyService } from "../../services/TrustAgencyService";

export const AuthenticatedRoute = ({ ...otherProps }) => {
  const TrustAgent = React.useContext<TrustAgencyService>(TrustAgencyContext);
  const isLoggedIn = TrustAgent.isAuthenticated();

  if (!isLoggedIn) {
    return <Redirect to={routes.LOGIN} />;
  }

  return <Route {...otherProps} />;
};

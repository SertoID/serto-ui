import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { createGlobalStyle } from "styled-components";
import { Auth0Provider } from "@auth0/auth0-react";

import { routes } from "./constants";
import { TrustAgencyContext } from "./context/TrustAgentProvider";
import { TrustAgencyService, TrustAgencyServiceConfig } from "./services/TrustAgencyService";
import { IdentityThemeProvider, fonts } from "./components/elements";
import { AuthenticatedRoute } from "./components/auth/AuthenticatedRoute";
import { HomePage } from "./components/HomePage";
import { AdminPage } from "./components/Admin/AdminPage";
import { TenantPage } from "./components/Tenant/TenantPage";
import { FeedsPage } from "./components/Tenant/FeedsPage";
import { IssuedCredentialsPage } from "./components/Tenant/IssuedCredentialsPage";
import { ReceivedCredentialsPage } from "./components/Tenant/ReceivedCredentialsPage";
import { LoginPage } from "./components/auth/LoginPage";

const GlobalStyle = createGlobalStyle`
  html {
    box-sizing: border-box;
  }
  body {
    background-color: #F6F6FE;
    font-family: ${fonts.sansSerif};
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    margin: 0;
  }
  *, :after, :before {
    box-sizing: inherit;
  }
`;

const serviceConfig: TrustAgencyServiceConfig = {
  url: "https://alpha.consensysidentity.com",
  // url: "http://localhost:8000",
};

// TODO load from config
const auth0ClientID = "sAnzetlNs0HbyokOncaTUZmLRijPazBc";
const auth0Domain = "dev-mdazdke4.us.auth0.com";

export const App = () => {
  const trustAgent = React.useMemo(() => new TrustAgencyService(serviceConfig), []);

  return (
    <Auth0Provider domain={auth0Domain} clientId={auth0ClientID} redirectUri={window.location.origin}>
      <BrowserRouter>
        <TrustAgencyContext.Provider value={trustAgent}>
          <React.Suspense fallback={<></>}>
            <IdentityThemeProvider>
              <GlobalStyle />
              <Switch>
                <Route path={routes.LOGIN} component={LoginPage} />
                <AuthenticatedRoute exact path={routes.HOMEPAGE} component={HomePage} />
                <AuthenticatedRoute path={routes.ADMIN} component={AdminPage} />
                <AuthenticatedRoute exact path={routes.TENANT} component={TenantPage} />
                <AuthenticatedRoute path={routes.FEEDS} component={FeedsPage} />
                <AuthenticatedRoute path={routes.ISSUED_CREDENTIAL} component={IssuedCredentialsPage} />
                <AuthenticatedRoute path={routes.RECEIVED_CREDENTIAL} component={ReceivedCredentialsPage} />
              </Switch>
            </IdentityThemeProvider>
          </React.Suspense>
        </TrustAgencyContext.Provider>
      </BrowserRouter>
    </Auth0Provider>
  );
};

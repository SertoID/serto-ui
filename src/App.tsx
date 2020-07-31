import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { createGlobalStyle } from "styled-components";
import { Auth0Provider } from "@auth0/auth0-react";

import { config } from "./config";
import { routes } from "./constants";
import { TrustAgencyContext } from "./context/TrustAgentProvider";
import { TrustAgencyService } from "./services/TrustAgencyService";
import { IdentityThemeProvider, fonts } from "./components/elements";
import { AuthenticatedRoute } from "./components/auth/AuthenticatedRoute";
import { HomePage } from "./components/HomePage";
import { AdminPage } from "./components/Admin/AdminPage";
import { TenantPage } from "./components/Tenant/TenantPage";
import { FeedsPage } from "./components/Tenant/FeedsPage";
import { IssuedCredentialsPage } from "./components/Tenant/IssuedCredentialsPage";
import { ReceivedCredentialsPage } from "./components/Tenant/ReceivedCredentialsPage";
import { LoginPage } from "./components/auth/LoginPage";
import { DeveloperPage } from "./components/Tenant/DeveloperPage";

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

export const App = () => {
  const trustAgent = React.useMemo(() => new TrustAgencyService(), []);

  return (
    <Auth0Provider domain={config.AUTH0_DOMAIN} clientId={config.AUTH0_CLIENT_ID} redirectUri={window.location.origin}>
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
                <AuthenticatedRoute path={routes.DEVELOPER} component={DeveloperPage} />
              </Switch>
            </IdentityThemeProvider>
          </React.Suspense>
        </TrustAgencyContext.Provider>
      </BrowserRouter>
    </Auth0Provider>
  );
};

import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { AuthenticatedRoute } from "./components/auth/AuthenticatedRoute";
import { Explore } from "./components/Dashboard/Explore";
import { AdminPage } from "./components/Admin/AdminPage";
import { TenantPage } from "./components/Tenant/TenantPage";
import { LoginPage } from "./components/auth/LoginPage";
import { TrustAgencyContext } from "./context/TrustAgentProvider";
import {
  TrustAgencyService,
  TrustAgencyServiceConfig,
} from "./services/TrustAgencyService";

const serviceConfig: TrustAgencyServiceConfig = {
  url: "https://alpha.trustagent.civil.co",
  // url: "http://localhost:8000",
};

export const App = () => {
  const trustAgent = React.useMemo(
    () => new TrustAgencyService(serviceConfig),
    []
  );

  return (
    <BrowserRouter>
      <TrustAgencyContext.Provider value={trustAgent}>
        <React.Suspense fallback={<></>}>
          <Switch>
            <Route path="/login" component={LoginPage} />
            <AuthenticatedRoute path="/admin" component={AdminPage} />
            <AuthenticatedRoute path="/tenant" component={TenantPage} />
            <AuthenticatedRoute path="/" component={Explore} />
          </Switch>
        </React.Suspense>
      </TrustAgencyContext.Provider>
    </BrowserRouter>
  );
};

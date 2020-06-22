import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { AuthenticatedRoute } from "./components/auth/AuthenticatedRoute";
import { HomePage } from "./components/HomePage";
import { AdminPage } from "./components/Admin/AdminPage";
import { TenantPage } from "./components/Tenant/TenantPage";
import { FeedsPage } from "./components/Tenant/FeedsPage";
import { LoginPage } from "./components/auth/LoginPage";
import { TrustAgencyContext } from "./context/TrustAgentProvider";
import { TrustAgencyService, TrustAgencyServiceConfig } from "./services/TrustAgencyService";

const serviceConfig: TrustAgencyServiceConfig = {
  url: "https://alpha.consensysidentity.com",
  // url: "http://localhost:8000",
};

export const App = () => {
  const trustAgent = React.useMemo(() => new TrustAgencyService(serviceConfig), []);

  return (
    <BrowserRouter>
      <TrustAgencyContext.Provider value={trustAgent}>
        <React.Suspense fallback={<></>}>
          <Switch>
            <Route path="/login" component={LoginPage} />
            <AuthenticatedRoute path="/admin" component={AdminPage} />
            <AuthenticatedRoute path="/tenant/feeds" component={FeedsPage} />
            <AuthenticatedRoute path="/tenant" component={TenantPage} />
            <AuthenticatedRoute path="/" component={HomePage} />
          </Switch>
        </React.Suspense>
      </TrustAgencyContext.Provider>
    </BrowserRouter>
  );
};

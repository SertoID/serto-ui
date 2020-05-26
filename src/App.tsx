import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Explore } from "./components/Dashboard/Explore";
import { ContentView } from "./components/Content/ContentView";
import { LoginPage } from "./components/auth/LoginPage";
import { TrustAgencyContext } from "./context/TrustAgentProvider";
import {
  TrustAgencyService,
  TrustAgencyServiceConfig,
} from "./services/TrustAgencyService";

const serviceConfig: TrustAgencyServiceConfig = {
  url: "https://alpha.trustagent.civil.co/",
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
            <Route path="/content/:contentId?" component={ContentView} />
            <Route path="/login" component={LoginPage} />
            <Route path="/" component={Explore} />
          </Switch>
        </React.Suspense>
      </TrustAgencyContext.Provider>
    </BrowserRouter>
  );
};

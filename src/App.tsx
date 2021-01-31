import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import { SertoUiProvider } from "./context/SertoUiProvider";
import { GlobalStyle } from "./components/layouts/Global/GlobalLayout";
import { HomePage } from "./HomePage";
import { Home, Send, People } from "@rimble/icons";

export const App = (): JSX.Element => {
  const sertoUiContext = {
    navItems: [
      { text: "Home", url: "/", icon: Home },
      { text: "Nowhere", url: "/nowhere", icon: Send },
      { text: "Everywhere", url: "/everywhere", icon: People },
    ],
  };
  return (
    <BrowserRouter>
      <React.Suspense fallback={<></>}>
        <SertoUiProvider value={sertoUiContext}>
          <GlobalStyle />
          <Switch>
            <Route exact path={"/"} component={HomePage} />
          </Switch>
        </SertoUiProvider>
      </React.Suspense>
    </BrowserRouter>
  );
};

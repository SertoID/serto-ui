import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { createGlobalStyle } from "styled-components";

import { HomePage } from "./HomePage";
import { fonts, IdentityThemeProvider } from "./themes";
import { SertoUiContextProvider } from "./context/SertoUiContext";
import { Home, Send, People } from "@rimble/icons";

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
        <SertoUiContextProvider value={sertoUiContext}>
          <IdentityThemeProvider>
            <GlobalStyle />
            <Switch>
              <Route exact path={"/"} component={HomePage} />
            </Switch>
          </IdentityThemeProvider>
        </SertoUiContextProvider>
      </React.Suspense>
    </BrowserRouter>
  );
};

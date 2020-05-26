import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Explore } from "./components/Dashboard/Explore";
import { ContentView } from "./components/Content/ContentView";

export const App = () => {
  return (
    <BrowserRouter>
      <React.Suspense fallback={<></>}>
        <Switch>
          <Route path="/content/:contentId?" component={ContentView} />
          <Route path="/" component={Explore} />
        </Switch>
      </React.Suspense>
    </BrowserRouter>
  );
}

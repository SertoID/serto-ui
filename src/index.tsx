// NOTE: This is the entry point for create-react-app webserver. The entry point for actual Serto UI components for export is `serto-ui.ts`.

import React from "react";
import ReactDOM from "react-dom";
import { App } from "./App";

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root"),
);

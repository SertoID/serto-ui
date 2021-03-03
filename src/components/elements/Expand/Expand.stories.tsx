import React from "react";
import { storiesOf } from "@storybook/react";
import { Expand } from "./Expand";
import { IdentityThemeProvider } from "../../../themes/IdentityTheme";

storiesOf("Expand", module).add("Expand", () => {
  return (
    <IdentityThemeProvider>
      <Expand>More content...</Expand>
    </IdentityThemeProvider>
  );
});

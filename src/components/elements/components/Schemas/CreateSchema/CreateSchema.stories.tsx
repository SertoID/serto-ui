import React from "react";
import { storiesOf } from "@storybook/react";
import { IdentityThemeProvider } from "../../../";
import { CreateSchema } from "./";

storiesOf("Schemas", module).add("Create Schema", () => {
  return (
    <IdentityThemeProvider>
      <CreateSchema />
    </IdentityThemeProvider>
  );
});

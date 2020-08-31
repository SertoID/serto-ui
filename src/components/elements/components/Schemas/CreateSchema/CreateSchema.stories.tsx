import React from "react";
import { storiesOf } from "@storybook/react";
import { IdentityThemeProvider } from "../../../";
import { CreateSchema } from "./";
import { HighlightedJson } from "../../HighlightedJson/HighlightedJson";

storiesOf("Schemas", module).add("Create Schema", () => {
  const [schema, setSchema] = React.useState({});
  return (
    <IdentityThemeProvider>
      <CreateSchema onSchemaUpdate={setSchema} onSchemaCreated={setSchema} />
      <HighlightedJson json={JSON.stringify(typeof schema === "string" ? JSON.parse(schema) : schema, null, 2)} />
    </IdentityThemeProvider>
  );
});

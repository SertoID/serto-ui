import React from "react";
import { storiesOf } from "@storybook/react";
import { IdentityThemeProvider } from "../../../";
import { CreateSchema } from "./";

storiesOf("Schemas", module).add("Create Schema", () => {
  const [schema, setSchema] = React.useState({});
  return (
    <IdentityThemeProvider>
      <CreateSchema onSchemaUpdate={setSchema} onSchemaCreated={setSchema} />
      <pre>{JSON.stringify(typeof schema === "string" ? JSON.parse(schema) : schema, null, 2)}</pre>
    </IdentityThemeProvider>
  );
});

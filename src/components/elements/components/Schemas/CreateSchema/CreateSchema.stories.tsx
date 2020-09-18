import React from "react";
import { storiesOf } from "@storybook/react";
import { Box } from "rimble-ui";
import { IdentityThemeProvider } from "../../../";
import { CreateSchema } from "./";
import { HighlightedJson } from "../../HighlightedJson/HighlightedJson";

storiesOf("Schemas", module).add("Create Schema", () => {
  const [schema, setSchema] = React.useState({});
  return (
    <IdentityThemeProvider>
      <Box width={9}>
        <CreateSchema onSchemaUpdate={setSchema} onSchemaCreated={setSchema} />
      </Box>
      <HighlightedJson json={JSON.stringify(typeof schema === "string" ? JSON.parse(schema) : schema, null, 2)} />
    </IdentityThemeProvider>
  );
});

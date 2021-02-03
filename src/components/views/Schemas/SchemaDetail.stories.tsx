import React from "react";
import { storiesOf } from "@storybook/react";
import { Box, Flash } from "rimble-ui";
import { EXAMPLE_SCHEMAS } from "vc-schema-tools";
import { SchemaDetail } from "./SchemaDetail";
import { ldContextPlusToSchemaInput } from "./utils";
import { SchemaDataInput } from "./types";
import { IdentityThemeProvider } from "../../../themes/IdentityTheme";

const DEFAULT_SCHEMA = "ContentPublishCredential";

storiesOf("Schemas", module).add("SchemaDetail", () => {
  const [schemaKey, setSchemaKey] = React.useState<string>(DEFAULT_SCHEMA);

  let ldContextPlus: SchemaDataInput | undefined;
  let error: string | undefined;
  try {
    ldContextPlus = ldContextPlusToSchemaInput(JSON.parse(EXAMPLE_SCHEMAS[schemaKey]));
  } catch (err) {
    console.error("Failed to generate schema input from schema:", err);
    error = err.message || JSON.stringify(err);
  }

  return (
    <IdentityThemeProvider>
      <Box mb={3}>
        <select value={schemaKey} onChange={(event: any) => setSchemaKey(event.target.value)}>
          {Object.keys(EXAMPLE_SCHEMAS).map((key) => (
            <option key={key} value={key}>
              {key}
            </option>
          ))}
        </select>
      </Box>

      <Box width={480} key={schemaKey}>
        {ldContextPlus && <SchemaDetail schema={ldContextPlus} />}
        {error && <Flash variant="danger">Error: {error}</Flash>}
      </Box>
    </IdentityThemeProvider>
  );
});

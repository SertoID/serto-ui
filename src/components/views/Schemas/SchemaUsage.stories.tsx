import React from "react";
import { storiesOf } from "@storybook/react";
import { Box, Flash } from "rimble-ui";
import { EXAMPLE_SCHEMAS } from "vc-schema-tools";
import { SchemaUsage } from "./SchemaUsage";
import { jsonSchemaToSchemaInput } from "./utils";
import { SchemaDataInput } from "./types";
import { IdentityThemeProvider } from "../../../themes/IdentityTheme";

const DEFAULT_SCHEMA = "ContentPublishCredential";

const SchemaUsageStory = () => {
  const [schemaKey, setSchemaKey] = React.useState<string>(DEFAULT_SCHEMA);

  let schemaData: SchemaDataInput | undefined;
  let error: string | undefined;
  try {
    schemaData = jsonSchemaToSchemaInput(EXAMPLE_SCHEMAS[schemaKey]);
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

      <Box width={350} key={schemaKey} border={1}>
        {schemaData && <SchemaUsage schema={schemaData} />}
        {error && <Flash variant="danger">Error: {error}</Flash>}
      </Box>
    </IdentityThemeProvider>
  );
};

storiesOf("Schemas", module).add("SchemaUsage", SchemaUsageStory);

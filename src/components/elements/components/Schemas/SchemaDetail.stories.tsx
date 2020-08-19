import React from "react";
import { storiesOf } from "@storybook/react";
import { Box, Flash } from "rimble-ui";
import { SchemaDetail } from "./SchemaDetail";
import { ldContextPlusToSchemaInput } from "./utils";
import { EXAMPLE_SCHEMAS } from "./examples";
import { SchemaDataInput } from "./types";

const DEFAULT_SCHEMA = "ContentPublishCredential (flat)";

storiesOf("Schemas", module).add("SchemaDetail", () => {
  const [schemaKey, setSchemaKey] = React.useState<string>(DEFAULT_SCHEMA);

  let ldContextPlus: SchemaDataInput | undefined;
  let foo: string | undefined;
  try {
    ldContextPlus = ldContextPlusToSchemaInput(JSON.parse(EXAMPLE_SCHEMAS[schemaKey]));
  } catch (err) {
    console.error("Failed to generate schema input from schema:", err);
    foo = err.message || JSON.stringify(err);
  }

  return (
    <>
      <Box mb={3}>
        <select value={schemaKey} onChange={(event: any) => setSchemaKey(event.target.value)}>
          {Object.keys(EXAMPLE_SCHEMAS).map((key) => (
            <option key={key} value={key}>
              {key}
            </option>
          ))}
        </select>
      </Box>

      <Box width={480}>
        {ldContextPlus && <SchemaDetail schema={ldContextPlus} />}
        {foo && <Flash variant="danger">Error: {foo}</Flash>}
      </Box>
    </>
  );
});

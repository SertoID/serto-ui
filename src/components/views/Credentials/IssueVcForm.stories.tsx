import React from "react";
import { storiesOf } from "@storybook/react";
import { Box, Flash } from "rimble-ui";
import { EXAMPLE_SCHEMAS } from "../../elements/components/Schemas/examples";
import { SchemaDataInput } from "../../elements/components/Schemas";
import { ldContextPlusToSchemaInput } from "../../elements/components/Schemas/utils";
import { IssueVcForm } from "./IssueVcForm";
import { SchemaDataResponse } from "../../elements";

const DEFAULT_SCHEMA = "ContentPublishCredential (flat)";

storiesOf("Credential", module).add("IssueVcForm", () => {
  const [schemaKey, setSchemaKey] = React.useState<string>(DEFAULT_SCHEMA);

  let ldContextPlus: SchemaDataInput | undefined;
  let error: string | undefined;
  if (schemaKey) {
    try {
      ldContextPlus = ldContextPlusToSchemaInput(JSON.parse(EXAMPLE_SCHEMAS[schemaKey]));
    } catch (err) {
      console.error("Failed to generate schema input from schema:", err);
      error = err.message || JSON.stringify(err);
    }
  }

  return (
    <>
      <Box mb={3}>
        Schema:{" "}
        <select value={schemaKey} onChange={(event: any) => setSchemaKey(event.target.value)}>
          <option value="">[Raw JSON input]</option>
          {Object.keys(EXAMPLE_SCHEMAS).map((key) => (
            <option key={key} value={key}>
              {key}
            </option>
          ))}
        </select>
      </Box>

      <Box width={480}>
        {error && <Flash variant="danger">Error: {error}</Flash>}
        <IssueVcForm
          schema={ldContextPlus as SchemaDataResponse}
          defaultIssuer="0xabc123"
          onSuccessResponse={() => {}}
        />
      </Box>
    </>
  );
});

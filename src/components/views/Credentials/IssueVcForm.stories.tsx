import React from "react";
import { storiesOf } from "@storybook/react";
import { Box, Flex, Flash } from "rimble-ui";
import { TrustAgencyProvider } from "../../../context/TrustAgentProvider";
import { EXAMPLE_SCHEMAS } from "../../elements/components/Schemas/examples";
import { SchemaDataInput } from "../../elements/components/Schemas";
import { ldContextPlusToSchemaInput } from "../../elements/components/Schemas/utils";
import { IssueVcForm } from "./IssueVcForm";
import { SchemaDataResponse } from "../../elements";
import { HighlightedJson } from "../../elements/components/HighlightedJson/HighlightedJson";
import { IdentityThemeProvider } from "../../elements/themes/IdentityTheme";

const DEFAULT_SCHEMA = "TestCredential";

storiesOf("Credential", module).add("IssueVcForm", () => {
  const [vcData, setVcData] = React.useState({});
  const [error, setError] = React.useState("");
  const [schemaKey, setSchemaKey] = React.useState<string>(DEFAULT_SCHEMA);

  const ldContextPlus: SchemaDataInput | undefined = React.useMemo(() => {
    setError("");
    if (schemaKey) {
      try {
        return ldContextPlusToSchemaInput(JSON.parse(EXAMPLE_SCHEMAS[schemaKey]));
      } catch (err) {
        console.error("Failed to generate schema input from schema:", err);
        setError(err.toString());
      }
    }
  }, [schemaKey]);

  return (
    <TrustAgencyProvider>
      <IdentityThemeProvider>
        <Flex>
          <div>
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
              {error && <Flash variant="danger">{error}</Flash>}
              <IssueVcForm
                schema={ldContextPlus as SchemaDataResponse}
                identifiers={["0xabc123", "0x123abc"]}
                onSuccessResponse={() => {}}
                onVcDataChange={setVcData}
              />
            </Box>
          </div>
          <Box flexGrow={1}>
            <Box mb={1}>debug:</Box>
            <HighlightedJson json={JSON.stringify(vcData, null, 2)} />
          </Box>
        </Flex>
      </IdentityThemeProvider>
    </TrustAgencyProvider>
  );
});

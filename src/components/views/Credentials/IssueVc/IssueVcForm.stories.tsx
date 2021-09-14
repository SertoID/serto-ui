import React from "react";
import { storiesOf } from "@storybook/react";
import { Box, Flex, Flash } from "rimble-ui";
import { EXAMPLE_SCHEMAS } from "vc-schema-tools";
import { SchemaDataInput, SchemaDataResponse } from "../../Schemas";
import { ldContextPlusToSchemaInput } from "../../Schemas/utils";
import { IssueVcForm } from "./IssueVcForm";
import { HighlightedJson } from "../../../elements/HighlightedJson/HighlightedJson";
import { IdentityThemeProvider } from "../../../../themes/IdentityTheme";
import { Identifier } from "../../../../types";
import { SertoUiProvider } from "../../../../context/SertoUiProvider";
import { createMockApiRequest } from "../../../../utils/helpers";

const DEFAULT_SCHEMA = "TestCredential";

const IDENTIFIERS: Identifier[] = [
  { did: "did:ethr:rinkeby:0xcfa8829812f1b4fe09b27cacf7d36e4d1b5dce76", provider: "did:ethr:rinkeby", alias: "Admin" },
  {
    did: "did:ethr:rinkeby:0x88298d36e4d1b5dce76cf9b27cacf7a12f1b4fe0",
    provider: "did:ethr:rinkeby",
    alias: "Another User",
  },
  {
    did: "did:ethr:rinkeby:0x1b5dce8826e4d76cf9b27cac12f1b4fe098d3f7a",
    provider: "did:ethr:rinkeby",
    alias: "Really really really really really really long alias",
  },
  { did: "did:ethr:rinkeby:0x9812f1d36e4d1b5dce7acf76cfa882b4fe09b27c", provider: "did:ethr:rinkeby" },
];

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
    <IdentityThemeProvider>
      <SertoUiProvider
        context={{
          issueVc: createMockApiRequest(),
        }}
      >
        <Flex>
          <div>
            <Box mb={3}>
              Schema:{" "}
              <select
                value={schemaKey}
                onChange={(event: any) => {
                  setSchemaKey(event.target.value);
                  setVcData({});
                  setError("");
                }}
              >
                <option value="">[Raw JSON input]</option>
                {Object.keys(EXAMPLE_SCHEMAS).map((key) => (
                  <option key={key} value={key}>
                    {key}
                  </option>
                ))}
              </select>
            </Box>

            <Box width={10}>
              {error && <Flash variant="danger">{error}</Flash>}
              <IssueVcForm
                key={schemaKey}
                schema={ldContextPlus as SchemaDataResponse}
                identifiers={IDENTIFIERS}
                onComplete={() => {}}
                onVcDataChange={setVcData}
              />
            </Box>
          </div>
          <Box flexGrow={1}>
            <Box mb={1}>debug:</Box>
            <HighlightedJson json={vcData} />
          </Box>
        </Flex>
      </SertoUiProvider>
    </IdentityThemeProvider>
  );
});

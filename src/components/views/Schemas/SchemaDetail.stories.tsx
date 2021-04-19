import React from "react";
import { storiesOf } from "@storybook/react";
import { Box, Flash } from "rimble-ui";
import { EXAMPLE_SCHEMAS } from "vc-schema-tools";
import { SchemaDetail } from "./SchemaDetail";
import { ldContextPlusToSchemaInput } from "./utils";
import { SchemaDataInput } from "./types";
import { IdentityThemeProvider } from "../../../themes/IdentityTheme";
import { SertoUiProvider } from "../../../context/SertoUiProvider";
import { createMockApiRequest } from "../../../utils/helpers";
import { Identifier } from "../../../types";

const DEFAULT_SCHEMA = "ContentPublishCredential";
const IDENTIFIERS: Identifier[] = [
  {
    did: "did:ethr:rinkeby:0xcfa8829812f1b4fe09b27cacf7d36e4d1b5dce76",
    provider: "did:ethr:rinkeby",
    alias: "Admin",
  },
  {
    did: "did:ethr:rinkeby:0x88298d36e4d1b5dce76cf9b27cacf7a12f1b4fe0",
    provider: "did:ethr:rinkeby",
    alias: "Another User",
  },
];

const SchemaDetailStory = () => {
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
};

storiesOf("Schemas", module)
  .add("SchemaDetail", SchemaDetailStory)
  .add("SchemaDetail (saveable)", () => {
    return (
      <SertoUiProvider
        context={{
          schemasService: {
            isAuthenticated: true,
          },
        }}
      >
        <SchemaDetailStory />
      </SertoUiProvider>
    );
  })
  .add("SchemaDetail (VC issuable)", () => {
    return (
      <SertoUiProvider
        context={{
          userDids: IDENTIFIERS,
          issueVc: createMockApiRequest(),
        }}
      >
        <SchemaDetailStory />
      </SertoUiProvider>
    );
  });

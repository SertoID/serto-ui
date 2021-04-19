import React from "react";
import { BrowserRouter } from "react-router-dom";
import { storiesOf } from "@storybook/react";
import { EXAMPLE_SCHEMAS } from "vc-schema-tools";
import { ldContextPlusToSchemaInput } from "./utils";
import { IdentityThemeProvider } from "../../../themes/IdentityTheme";
import { SertoUiProvider } from "../../../context/SertoUiProvider";
import { SchemasTable } from "./SchemasTable";

const schemas = Object.values(EXAMPLE_SCHEMAS)
  .map((schema) => {
    try {
      return ldContextPlusToSchemaInput(JSON.parse(schema));
    } catch {
      return undefined;
    }
  })
  .filter((schema) => !!schema);

const SchemasTableStory = () => {
  return (
    <BrowserRouter>
      <IdentityThemeProvider>
        <SertoUiProvider
          context={{
            schemasService: {
              getSchemas: () => schemas,
            },
          }}
        >
          <SchemasTable />
        </SertoUiProvider>
      </IdentityThemeProvider>
    </BrowserRouter>
  );
};

storiesOf("Schemas", module).add("SchemasTable", SchemasTableStory);

import React from "react";
import { BrowserRouter } from "react-router-dom";
import { storiesOf } from "@storybook/react";
import { EXAMPLE_SCHEMAS } from "vc-schema-tools";
import { jsonSchemaToSchemaInput } from "./utils";
import { IdentityThemeProvider } from "../../../themes/IdentityTheme";
import { SertoUiProvider } from "../../../context/SertoUiProvider";
import { SchemaCards } from "./SchemaCards";

const schemas = Object.entries(EXAMPLE_SCHEMAS)
  .map(([key, schema]) => {
    if (key === "[no schema]") {
      return undefined;
    }
    try {
      return jsonSchemaToSchemaInput(schema);
    } catch (err) {
      console.error(`failed to create schema input for schema "${key}"`, err);
      return undefined;
    }
  })
  .filter((schema) => !!schema);

const SchemaCardsStory = () => {
  return (
    <BrowserRouter>
      <IdentityThemeProvider>
        <SertoUiProvider
          context={{
            schemasService: {
              getSchemas: () => schemas.concat(schemas),
            },
          }}
        >
          <SchemaCards />
        </SertoUiProvider>
      </IdentityThemeProvider>
    </BrowserRouter>
  );
};

storiesOf("Schemas", module).add("SchemaCards", SchemaCardsStory);

import React from "react";
import { storiesOf } from "@storybook/react";
import { Box } from "rimble-ui";
import { IdentityThemeProvider } from "../../../../themes/IdentityTheme";
import { CreateSchema } from "./";
import { HighlightedJson } from "../../../elements/HighlightedJson/HighlightedJson";
import { WorkingSchema } from "../types";

const schemaToUpdate = {
  discoverable: true,
  slug: "employment-credential",
  name: "Employment Credential",
  description: "Credential representing employment at an employer.",
  version: "1.0",
  icon: "👔",
  required: ["id", "employeeName"],
  properties: [
    {
      "@id": "id",
      "@type": "@id",
      "@dataType": "string",
      "@format": "uri",
      "@title": "Employee ID",
      "@required": true,
    },
    {
      "@id": "employeeName",
      "@type": "http://schema.org/Text",
      "@dataType": "string",
      "@title": "Employee Name",
      "@description": "",
      "@required": true,
    },
    {
      "@id": "jobTitle",
      "@type": "http://schema.org/Text",
      "@dataType": "string",
      "@title": "Job Title",
      "@description": "",
      "@required": true,
    },
    {
      "@id": "hireDate",
      "@type": "http://schema.org/Date",
      "@dataType": "string",
      "@title": "Hire Date",
      "@description": "",
      "@format": "date",
    },
    {
      "@id": "employer",
      "@title": "Employer",
      "@description": "",
      "@context": {
        employerId: {
          "@id": "employerId",
          "@type": "@id",
          "@dataType": "string",
          "@title": "Employer ID",
          "@description": "",
          "@format": "uri",
        },
        name: {
          "@id": "name",
          "@type": "http://schema.org/Text",
          "@dataType": "string",
          "@title": "Name",
          "@description": "",
        },
        website: {
          "@id": "website",
          "@type": "http://schema.org/URL",
          "@dataType": "string",
          "@title": "Website",
          "@description": "",
          "@format": "uri",
        },
      },
    },
  ],
};

const createSchemaStory = (schemaToUpdate?: WorkingSchema) => () => {
  const [schema, setSchema] = React.useState({});
  return (
    <IdentityThemeProvider>
      <CreateSchema isUpdate={!!schemaToUpdate} initialSchemaState={schemaToUpdate} onSchemaUpdate={setSchema} />
      <Box mt={3}>
        <Box mb={1}>
          debug <code>schema</code> prop:
        </Box>
        <HighlightedJson json={schema} />
      </Box>
    </IdentityThemeProvider>
  );
};

storiesOf("Schemas", module)
  .add("Create Schema", createSchemaStory())
  .add("Update Schema", createSchemaStory(schemaToUpdate));

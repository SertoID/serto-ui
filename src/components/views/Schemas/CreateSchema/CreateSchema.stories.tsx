import React from "react";
import { storiesOf } from "@storybook/react";
import { Card, Flex, Box } from "rimble-ui";
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
      "@type": "http://schema.org/DateTime",
      "@dataType": "string",
      "@title": "Hire Date",
      "@description": "",
      "@format": "date-time",
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
      <Flex>
        <Card width={9} mr={4} p={0} pb={3} pt="48px">
          <Flex flexDirection="column" minHeight="0" maxHeight="calc(95vh - 48px)">
            <CreateSchema
              isUpdate={!!schemaToUpdate}
              initialSchemaState={schemaToUpdate}
              onSchemaUpdate={setSchema}
              onSchemaCreated={setSchema}
            />
          </Flex>
        </Card>
        <Box flexGrow={1}>
          <Box mb={1}>debug:</Box>
          <HighlightedJson json={JSON.stringify(typeof schema === "string" ? JSON.parse(schema) : schema, null, 2)} />
        </Box>
      </Flex>
    </IdentityThemeProvider>
  );
};

storiesOf("Schemas", module)
  .add("Create Schema", createSchemaStory())
  .add("Update Schema", createSchemaStory(schemaToUpdate));

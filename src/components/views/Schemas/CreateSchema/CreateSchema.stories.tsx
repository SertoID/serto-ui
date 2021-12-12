import React from "react";
import { storiesOf } from "@storybook/react";
import { baseVcJsonSchema } from "vc-schema-tools";
import { IdentityThemeProvider } from "../../../../themes/IdentityTheme";
import { CreateSchema } from "./";
import { WorkingSchema } from "../types";

const schemaToUpdate = {
  ...baseVcJsonSchema,
  $id: "https://example.com/schemas/employment-credential/1.0/json-schema.json",
  $schema: "http://json-schema.org/draft-07/schema#",
  $metadata: {
    slug: "employment-credential",
    version: "1.0",
    icon: "👔",
    discoverable: false,
    uris: {
      jsonLdContext: "https://example.com/schemas/employment-credential/1.0/ld-context.json",
      jsonSchema: "https://example.com/schemas/employment-credential/1.0/json-schema.json",
    },
  },
  title: "Employment Credential",
  description: "Credential representing employment at an employer.",
  $linkedData: {
    term: "EmploymentCredential",
    "@id": "https://example.com/schemas/employment-credential/1.0/ld-context.json#",
  },

  properties: {
    ...baseVcJsonSchema.properties,
    credentialSubject: {
      $linkedData: {
        term: "credentialSubject",
        "@id": "https://www.w3.org/2018/credentials#credentialSubject",
      },
      type: "object",
      required: ["jobTitle", "employer", "employeeSubjectId"],
      properties: {
        employeeSubjectId: {
          $linkedData: {
            term: "employeeSubjectId",
            "@id": "@id",
          },
          title: "Employee DID",
          type: "string",
          format: "uri",
        },
        jobTitle: {
          $linkedData: {
            term: "jobTitle",
            "@id": "http://schema.org/Text",
          },
          title: "Job Title",
          description: "",
          type: "string",
        },
        hireDate: {
          $linkedData: {
            term: "hireDate",
            "@id": "http://schema.org/Date",
          },
          title: "Hire Date",
          description: "",
          type: "string",
          format: "date",
        },
        employer: {
          $linkedData: {
            term: "employer",
            "@id": "employer",
          },
          title: "Employer",
          description: "",
          type: "object",
          required: ["employerId", "name"],
          properties: {
            employerId: {
              $linkedData: {
                term: "employerId",
                "@id": "@id",
              },
              title: "Employer DID",
              description: "",
              type: "string",
              format: "uri",
            },
            name: {
              $linkedData: {
                term: "name",
                "@id": "http://schema.org/Text",
              },
              title: "Name",
              description: "",
              type: "string",
            },
            website: {
              $linkedData: {
                term: "website",
                "@id": "http://schema.org/URL",
              },
              title: "Website",
              description: "",
              type: "string",
              format: "uri",
            },
          },
        },
      },
    },
  },
};

const createSchemaStory = (schemaToUpdate?: WorkingSchema) => () => {
  return (
    <IdentityThemeProvider>
      <CreateSchema isUpdate={!!schemaToUpdate} initialSchemaState={schemaToUpdate} />
    </IdentityThemeProvider>
  );
};

storiesOf("Schemas", module)
  .add("Create Schema", createSchemaStory())
  .add("Update Schema", createSchemaStory(schemaToUpdate));

import * as React from "react";
import { Box, Button, Flash, Form } from "rimble-ui";
import { colors } from "../../../../themes";
import { WorkingSchema, newSchemaAttribute, defaultSchemaProperties } from "../types";
import { SchemaAttribute } from "./SchemaAttribute";

export interface AttributesStepProps {
  schema: WorkingSchema;
  updateSchema(updates: Partial<WorkingSchema>): void;
  onComplete(): void;
}

export const AttributesStep: React.FunctionComponent<AttributesStepProps> = (props) => {
  const { schema, updateSchema } = props;
  const [doValidation, setDoValidation] = React.useState(false);
  const [error, setError] = React.useState("");

  function addAttribute(e: Event) {
    if (schema.properties?.credentialSubject?.properties?.[""]) {
      // We have a property with no name - have them update that before creating a no one. We don't have to do anything, since the un-preventDefaulted event will trigger browser UI on empty required title field
      return;
    }

    e.preventDefault();

    updateSchema({
      ...schema,
      properties: {
        ...schema.properties,
        credentialSubject: {
          ...schema.properties?.credentialSubject,
          properties: {
            ...schema.properties?.credentialSubject?.properties,
            "": { ...newSchemaAttribute },
          },
        },
      },
    });
  }

  function goNext(e: Event) {
    e.preventDefault();
    setError("");

    const propertyIds = new Set();
    let missingField = false;
    let duplicateId = false;
    // @TODO/tobek These checks should be recursive. Empty `title`'s are already handled by native browser form checks, but `$linkedData.term` collisions (which would have to be unique only among sibling properties) are not handled.
    Object.values(schema.properties?.credentialSubject?.properties || {}).forEach((prop) => {
      if (!prop.title) {
        missingField = true;
      }
      if (!prop.$linkedData?.term) {
        missingField = true;
      } else if (propertyIds.has(prop.$linkedData.term)) {
        setError(`Two attribute names result in ID "${prop.$linkedData.term}" - all attributes must have unique IDs.`);
        duplicateId = true;
      } else {
        propertyIds.add(prop.$linkedData.term);
      }
    });

    if (missingField || duplicateId) {
      setDoValidation(true);
    } else {
      setDoValidation(false);
      props.onComplete();
    }
  }

  return (
    <Form validated={doValidation} onSubmit={goNext}>
      {defaultSchemaProperties.map((prop, i) => (
        <SchemaAttribute key={i + "required"} attr={prop} readOnly={true} />
      ))}

      {schema.properties?.credentialSubject && (
        <SchemaAttribute
          key={"credentialSubject"}
          attr={schema.properties.credentialSubject}
          isCredSubject
          updateAttribute={(attr) => {
            updateSchema({
              ...schema,
              properties: {
                ...schema.properties,
                credentialSubject: attr,
              },
            });
          }}
        />
      )}

      <Box mt={3}>
        <Button.Outline
          mb={3}
          mx="auto"
          type="submit"
          width="100%"
          onClick={addAttribute}
          style={{ borderColor: colors.primary.base }}
        >
          Add Another Attribute
        </Button.Outline>
        {error && (
          <Flash mb={3} variant="danger">
            Error: {error}
          </Flash>
        )}
        <Button type="submit" width="100%">
          Review
        </Button>
      </Box>
    </Form>
  );
};

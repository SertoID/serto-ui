import * as React from "react";
import { Box, Button, Flash, Form } from "rimble-ui";
import { colors } from "../../../";
import { WorkingSchema, requiredSchemaProperties } from "../types";
import { typeOptions } from "../utils";
import { LdContextPlusNode } from "../VcSchema";
import { ModalContent, ModalHeader } from "../../Modals";
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
    e.preventDefault();
    const newProp = {
      "@title": "",
      ...typeOptions["http://schema.org/Text"],
    };
    delete newProp.niceName;
    updateSchema({ properties: [...schema.properties, newProp] });
  }

  function updateAttribute(i: number, attribute: Partial<LdContextPlusNode>) {
    updateSchema({
      properties: [...schema.properties.slice(0, i), attribute, ...schema.properties.slice(i + 1)],
    });
  }

  function removeAttribute(i: number) {
    updateSchema({ properties: [...schema.properties.slice(0, i), ...schema.properties.slice(i + 1)] });
  }

  function goNext(e: Event) {
    e.preventDefault();
    setError("");

    const propertyIds = new Set();
    let missingField = false;
    let duplicateId = false;
    schema.properties.forEach((prop) => {
      if (!prop["@title"]) {
        missingField = true;
      }
      if (propertyIds.has(prop["@id"])) {
        setError(`Two attribute names result in ID "${prop["@id"]}" - all attributes must have unique IDs.`);
        duplicateId = true;
      } else {
        propertyIds.add(prop["@id"]);
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
    <>
      <ModalHeader>Define Schema Attributes</ModalHeader>
      <ModalContent>
        <Form validated={doValidation} onSubmit={goNext}>
          {requiredSchemaProperties.map((prop, i) => (
            <SchemaAttribute key={i + "required"} attr={prop} readOnly={true} />
          ))}
          {schema.properties.map((prop, i) => (
            <SchemaAttribute
              key={i}
              attr={prop}
              updateAttribute={(attr) => updateAttribute(i, attr)}
              removeAttribute={() => removeAttribute(i)}
            />
          ))}
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
      </ModalContent>
    </>
  );
};

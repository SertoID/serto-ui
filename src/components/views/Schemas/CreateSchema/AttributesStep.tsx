import * as React from "react";
import { Flex, Box, Button, Flash, Form } from "rimble-ui";
import { LdContextPlusNode } from "vc-schema-tools";
import { colors } from "../../../../themes";
import { WorkingSchema, newSchemaAttribute, requiredSchemaProperties } from "../types";
import { ModalContent, ModalHeader } from "../../../elements/Modals";
import { SchemaAttribute } from "./SchemaAttribute";
import { SchemaMetadata, SchemaDataInput } from "../types";
import { SchemaDetail } from "../SchemaDetail";

export interface AttributesStepProps {
  schema: WorkingSchema;
  builtSchema: SchemaDataInput;
  updateSchema(updates: Partial<WorkingSchema>): void;
  onComplete(): void;
}

export const AttributesStep: React.FunctionComponent<AttributesStepProps> = (props) => {
  const { schema, updateSchema, builtSchema } = props;
  const [doValidation, setDoValidation] = React.useState(false);
  const [error, setError] = React.useState("");

  function addAttribute(e: Event) {
    e.preventDefault();
    updateSchema({
      properties: [
        ...schema.properties,
        {
          ...newSchemaAttribute,
        },
      ],
    });
  }

  function updateAttribute(i: number, attribute: Partial<LdContextPlusNode<SchemaMetadata>>) {
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
    // @TODO/tobek These checks should be recursive. Empty `@title`'s are already handled by native browser form checks, but `@id` collisions (which would have to be unique only among sibling properties) are not handled.
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
      <ModalContent width={11}>
        <Flex>
          <Form validated={doValidation} onSubmit={goNext} width="50%">
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
          <Box ml={4} width="50%">
            <SchemaDetail schema={builtSchema} initialView="JSON source" noTools={true} paneView={true} />
          </Box>
        </Flex>
      </ModalContent>
    </>
  );
};

import * as React from "react";
import styled from "styled-components";
import { Box, Button, Checkbox, Flash, Flex, Form, Input } from "rimble-ui";
import { colors, fonts } from "../../../";
import { WorkingSchema, requiredSchemaProperties } from "../types";
import { typeOptions } from "../utils";
import { LdContextPlusLeafNode } from "../VcSchema";
import { convertToCamelCase } from "../../../utils";
import { ModalContent, ModalHeader } from "../../Modals";
import { DropDown } from "../../DropDown/DropDown";

const AttributeBox = styled(Box)`
  &:first-child {
    margin-top: 4px;
  }
`;

export interface AttributesStepProps {
  schema: WorkingSchema;
  updateSchema(updates: Partial<WorkingSchema>): void;
  onComplete(): void;
}

export const AttributesStep: React.FunctionComponent<AttributesStepProps> = (props) => {
  const { schema, updateSchema } = props;
  const [doValidation, setDoValidation] = React.useState(false);
  const [error, setError] = React.useState("");

  function addProperty(e: Event) {
    e.preventDefault();
    const newProp = {
      "@title": "",
      ...typeOptions[Object.keys(typeOptions)[0]],
    };
    delete newProp.niceName;
    updateSchema({ properties: [...schema.properties, newProp] });
  }

  function updateProperty(i: number, propertyProperty: keyof LdContextPlusLeafNode, value: any) {
    const updatedProperty = { ...schema.properties[i], [propertyProperty]: value };
    if (propertyProperty === "@title") {
      updatedProperty["@id"] = convertToCamelCase(value);
    }
    updateSchema({
      properties: [...schema.properties.slice(0, i), updatedProperty, ...schema.properties.slice(i + 1)],
    });
  }

  function updateType(i: number, type: string) {
    const updatedProp = {
      ...schema.properties[i],
      ...typeOptions[type],
    };
    if (type === "http://schema.org/Boolean") {
      delete updatedProp["@required"];
    }

    delete updatedProp.niceName;
    updateSchema({ properties: [...schema.properties.slice(0, i), updatedProp, ...schema.properties.slice(i + 1)] });
  }

  function removeProperty(i: number) {
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

  function renderSchemaProperty(prop: Partial<LdContextPlusLeafNode>, i: number, readOnly = false): JSX.Element {
    return (
      <AttributeBox
        key={i + readOnly.toString()}
        border={1}
        borderRadius={1}
        p={3}
        pb={readOnly ? 3 : 1}
        my={3}
        backgroundColor={readOnly ? colors.nearWhite : "transparent"}
      >
        <Flex>
          <Input
            width="100%"
            type="text"
            required={true}
            placeholder="Attribute Name"
            mr={2}
            value={prop["@title"]}
            onChange={(event: any) => updateProperty(i, "@title", event.target.value)}
            disabled={readOnly}
            style={{ borderColor: colors.lightGray }}
          />
          <DropDown
            onChange={(value) => updateType(i, value)}
            defaultSelectedValue={prop["@type"] || "http://schema.org/Text"}
            disabled={readOnly}
            options={Object.keys(typeOptions).map((type) => ({
              name: typeOptions[type].niceName || type,
              value: type,
            }))}
            style={{ borderColor: colors.lightGray }}
          />
          {/* @TODO/tobek Add "custom" option that opens fields to manually enter type details. */}
        </Flex>
        {!readOnly && (
          <Input
            width="100%"
            placeholder="Description"
            value={prop["@description"] || ""}
            style={{ borderColor: colors.lightGray }}
            onChange={(event: any) => updateProperty(i, "@description", event.target.value)}
          />
        )}
        <Flex justifyContent="space-between">
          {prop["@type"] !== "http://schema.org/Boolean" ? (
            <Checkbox
              fontFamily={fonts.sansSerif}
              label="Required"
              checked={!!prop["@required"]}
              onChange={() => updateProperty(i, "@required", !prop["@required"])}
              disabled={readOnly}
            />
          ) : (
            <div></div>
          )}
          {!readOnly && (
            <Button.Text
              icononly
              icon="DeleteForever"
              onClick={(e: Event) => {
                e.preventDefault();
                removeProperty(i);
              }}
            />
          )}
        </Flex>
      </AttributeBox>
    );
  }

  return (
    <>
      <ModalHeader>Define Credential Attributes</ModalHeader>
      <ModalContent>
        <Form validated={doValidation} onSubmit={goNext}>
          {requiredSchemaProperties.map((prop, i) => renderSchemaProperty(prop, i, true))}
          {schema.properties.map((prop, i) => renderSchemaProperty(prop, i))}
          <Box mt={3}>
            <Button.Outline
              mb={3}
              mx="auto"
              type="submit"
              width="100%"
              onClick={addProperty}
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

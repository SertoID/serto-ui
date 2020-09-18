import * as React from "react";
import { Box, Button, Checkbox, Flash, Flex, Form, Input } from "rimble-ui";
import { colors, fonts } from "../../../";
import { WorkingSchema } from "../types";
import { typeOptions } from "../utils";
import { LdContextPlusLeafNode } from "../VcSchema";
import { convertToCamelCase } from "../../../utils";
import { ModalContentFullWidth, ModalHeader } from "../../Modals";

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

  return (
    <>
      <ModalHeader>Define Credential Attributes</ModalHeader>
      <ModalContentFullWidth>
        <Form validated={doValidation} onSubmit={goNext}>
          {schema.properties.map((prop, i) => (
            <Box
              key={i}
              backgroundColor={colors.nearWhite}
              p={4}
              mt={i === 0 ? 1 : 4 /* can't believe i am reimplementing `:first-child` */}
              mb={4}
            >
              <Flex>
                <Input
                  width="100%"
                  type="text"
                  required={true}
                  placeholder="Attribute name"
                  mr={2}
                  value={schema.properties[i]["@title"]}
                  onChange={(event: any) => updateProperty(i, "@title", event.target.value)}
                />
                <select
                  onChange={(event: any) => updateType(i, event.target.value)}
                  style={{ fontSize: 16, padding: "0 16px" }}
                  value={schema.properties[i]["@type"]}
                >
                  {Object.keys(typeOptions).map((type) => (
                    <option key={type} value={type}>
                      {typeOptions[type].niceName}
                    </option>
                  ))}
                  {/* @TODO/tobek Add "custom" option that opens fields to manually enter type details. */}
                </select>
              </Flex>
              <textarea
                placeholder="Description"
                value={schema.properties[i]["@description"] || ""}
                style={{
                  width: "100%",
                  boxSizing: "border-box",
                  minHeight: "50px",
                  fontFamily: fonts.sansSerif,
                  fontSize: 16,
                  padding: 16,
                  margin: "16px 0",
                }}
                onChange={(event: any) => updateProperty(i, "@description", event.target.value)}
              />
              <Flex justifyContent="space-between">
                <Checkbox
                  fontFamily={fonts.sansSerif}
                  label="Required"
                  checked={!!schema.properties[i]["@required"]}
                  onChange={() => updateProperty(i, "@required", !prop["@required"])}
                />
                <Button.Text
                  icononly
                  icon="DeleteForever"
                  onClick={(e: Event) => {
                    e.preventDefault();
                    removeProperty(i);
                  }}
                />
              </Flex>
            </Box>
          ))}
          <Box px={4} mt={3}>
            <Button.Outline mb={3} mx="auto" type="submit" width="100%" onClick={addProperty}>
              Add Attribute
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
      </ModalContentFullWidth>
    </>
  );
};

import slugify from "@sindresorhus/slugify";
import * as React from "react";
import { Box, Button, Checkbox, Flash, Flex, Form, Heading, Input } from "rimble-ui";
import { baseColors, colors, fonts } from "../../../";
import { jsonLdContextTypeMap } from "../VcSchema";
import { SchemaSchema } from "./";

const typeOptions: { [key: string]: any } = {};
Object.keys(jsonLdContextTypeMap).forEach((type) => {
  if (type.indexOf("http://schema.org/") !== 0) {
    return;
  }
  typeOptions[type] = {
    ...jsonLdContextTypeMap[type],
    niceName: type.replace("http://schema.org/", ""),
    semanticType: type,
  };
});

export interface AttributesStepProps {
  schema: SchemaSchema;
  updateSchema(field: string, value: any): void;
  onComplete(): void;
}

export const AttributesStep: React.FunctionComponent<AttributesStepProps> = (props) => {
  const { schema, updateSchema } = props;
  const [doValidation, setDoValidation] = React.useState(false);
  const [error, setError] = React.useState("");

  // const defaultSchemaSlug = React.useMemo(() => slugify(schema.name), [schema.name]);

  function addProperty(e: Event) {
    e.preventDefault();
    updateSchema("properties", [
      ...schema.properties,
      {
        title: "",
        ...typeOptions[Object.keys(typeOptions)[0]],
      },
    ]);
  }

  function updateProperty(i: number, propertyProperty: string, value: any) {
    const updatedProperty = { ...schema.properties[i], [propertyProperty]: value };
    if (propertyProperty === "title") {
      updatedProperty.id = slugify(value);
    }
    updateSchema("properties", [...schema.properties.slice(0, i), updatedProperty, ...schema.properties.slice(i + 1)]);
  }

  function updateType(i: number, type: string) {
    updateSchema("properties", [
      ...schema.properties.slice(0, i),
      {
        ...schema.properties[i],
        ...typeOptions[type],
      },
      ...schema.properties.slice(i + 1),
    ]);
  }

  function removeProperty(i: number) {
    updateSchema("properties", [...schema.properties.slice(0, i), ...schema.properties.slice(i + 1)]);
  }

  function goNext(e: Event) {
    e.preventDefault();
    setError("");

    const propertyIds = new Set();
    let missingField = false;
    let duplicateId = false;
    schema.properties.forEach((prop) => {
      if (!prop.title) {
        missingField = true;
      }
      if (propertyIds.has(prop.id)) {
        setError(`Two attribute names result in ID "${prop.id}" - all attributes must have unique IDs.`);
        duplicateId = true;
      } else {
        propertyIds.add(prop.id);
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
      <Heading mt={4} mb={3} color={baseColors.black} fontFamily={fonts.sansSerif} fontSize={4} fontWeight={3}>
        Define Credential Attributes
      </Heading>
      <Form validated={doValidation} onSubmit={goNext}>
        {schema.properties.map((prop, i) => (
          <Box
            key={i}
            backgroundColor={colors.nearWhite}
            width="calc(100% + 48px)"
            p={4}
            my={4}
            left="-24px"
            position="relative"
          >
            <Flex>
              <Input
                width="100%"
                type="text"
                required={true}
                placeholder="Attribute name"
                mr={2}
                value={schema.properties[i].title}
                onChange={(event: any) => updateProperty(i, "title", event.target.value)}
              />
              <select
                onChange={(event: any) => updateType(i, event.target.value)}
                style={{ fontSize: 16, padding: "0 16px" }}
                value={schema.properties[i].semanticType}
              >
                {Object.keys(typeOptions).map((type) => (
                  <option value={type}>{typeOptions[type].niceName}</option>
                ))}
                {/* @TODO/tobek Add "custom" option that opens fields to manually enter type details. */}
              </select>
            </Flex>
            <textarea
              placeholder="Description"
              value={schema.properties[i].description || ""}
              style={{
                width: "100%",
                boxSizing: "border-box",
                minHeight: "50px",
                fontFamily: fonts.sansSerif,
                fontSize: 16,
                padding: 16,
                margin: "16px 0",
              }}
              onChange={(event: any) => updateProperty(i, "description", event.target.value)}
            />
            <Flex justifyContent="space-between">
              <Checkbox
                fontFamily={fonts.sansSerif}
                label="Required"
                checked={!!schema.properties[i].isRequired}
                onChange={() => updateProperty(i, "isRequired", !prop.isRequired)}
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
        <Box style={{ textAlign: "center" }}>
          <Button.Outline mb={5} mx="auto" type="submit" width="75%" onClick={addProperty}>
            Add Attribute
          </Button.Outline>
        </Box>
        {error && (
          <Flash mb={3} variant="danger">
            Error: {error}
          </Flash>
        )}
        <Button type="submit" width="100%">
          Review
        </Button>
      </Form>
    </>
  );
};

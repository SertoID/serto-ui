/* eslint-disable @typescript-eslint/no-non-null-assertion */

import * as React from "react";
import styled from "styled-components";
import { Box, Button, Checkbox, Flex, Input } from "rimble-ui";
import { JsonSchemaNode, nodeToTypeName } from "vc-schema-tools";
import { fonts, colors } from "../../../../themes";
import { NESTED_TYPE_KEY, typeOptions } from "../utils";
import { convertToCamelCase } from "../../../../utils";
import { DropDown } from "../../../elements/DropDown/DropDown";
import { newSchemaAttribute } from "../types";

const AttributeBox = styled(Box)`
  &:first-child {
    margin-top: 4px;
  }
  &:last-child {
    margin-bottom: 0;
  }
`;
const IconButton = styled(Button.Text)`
  color: ${colors.midGray};
  &:hover {
    color: ${colors.primary.base};
  }
`;

export interface SchemaAttributeProps {
  attr: Partial<JsonSchemaNode>;
  attrName?: string;
  /** For the credential subject attribute we only want to display the nested attributes. */
  isCredSubject?: boolean;
  parentRequired?: string[];
  readOnly?: boolean;
  setParentRequired?(required: string[]): void;
  updateAttribute?(attribute: Partial<JsonSchemaNode>): void;
  removeAttribute?(): void;
}

export const SchemaAttribute: React.FunctionComponent<SchemaAttributeProps> = (props) => {
  const {
    attr,
    attrName,
    isCredSubject,
    parentRequired,
    readOnly,
    setParentRequired,
    updateAttribute,
    removeAttribute,
  } = props;

  function updateAttrProperty(attrProperty: keyof JsonSchemaNode, value: any) {
    const updatedProperty = { ...attr, [attrProperty]: value };
    if (attrProperty === "title") {
      updatedProperty.$linkedData = {
        "@id": updatedProperty.$linkedData?.["@id"] || "",
        term: convertToCamelCase(value),
      };
    }
    updateAttribute?.(updatedProperty);
  }

  function toggleRequired() {
    const term = attr.$linkedData?.term || "";
    if (parentRequired?.includes(term)) {
      const requiredI = parentRequired.indexOf(term);
      setParentRequired?.([...parentRequired.slice(0, requiredI), ...parentRequired.slice(requiredI + 1)]);
    } else {
      setParentRequired?.([...(parentRequired || []), term]);
    }
  }

  function updateType(type: string) {
    const newType = typeOptions[type];

    const updatedAttr = {
      ...attr,
      ...newType,
      $linkedData: {
        term: attr.$linkedData?.term || "",
        "@id": typeOptions[type].$linkedData?.["@id"] || "",
      },
    };

    if (!newType.format) {
      delete updatedAttr.format;
    }

    if (type === NESTED_TYPE_KEY) {
      updatedAttr.$linkedData["@id"] = updatedAttr.$linkedData.term;
    } else if (type !== NESTED_TYPE_KEY) {
      delete updatedAttr.properties;
    }

    updateAttribute?.(updatedAttr);
  }

  function addNestedAttribute(e: Event) {
    if (attr.properties?.[""]) {
      // Do nothing, an un-preventDefaulted event will trigger browser UI on empty required title field
      return;
    }
    e.preventDefault();

    updateAttrProperty("properties", {
      ...attr.properties,
      "": {
        ...newSchemaAttribute,
      },
    });
  }

  const updateNestedAttribute = (key: string, updatedAttr: Partial<JsonSchemaNode>) => {
    let updatedProperties: { [key: string]: Partial<JsonSchemaNode> } = {};
    let updatedRequired = attr.required || [];
    if (updatedAttr.$linkedData?.term !== key) {
      // Key has changed. Since nested attributes are listed by iterating over object keys, if we rename object key by deleting and adding, React will reorder inputs while user is typing and lose focus. So here we re-create object key by key in order to rename the updated key while preserving order. (Yes order isn't necessarily stable in JS objects but it's better than nothing and converting everything to use Maps would be a pain.)
      const oldKey = key;
      let newKey = updatedAttr.$linkedData?.term || "";

      if (attr.properties && newKey in attr.properties) {
        // Edge case but will clobber existing property with that key so let's give it a different one.
        newKey = `${newKey}2`;
      }

      Object.keys(attr.properties || {}).forEach((existingKey) => {
        if (existingKey === oldKey) {
          updatedProperties[newKey] = updatedAttr;
        } else {
          updatedProperties[existingKey] = attr.properties![existingKey];
        }
      });

      if (attr.required?.includes(oldKey)) {
        // We need to update this too when the key changes
        const requiredI = attr.required.indexOf(oldKey);
        updatedRequired = [...attr.required.slice(0, requiredI), ...attr.required.slice(requiredI + 1), newKey];
      }
    } else {
      updatedProperties = {
        ...attr.properties,
        [key]: updatedAttr,
      };
    }

    updateAttribute?.({
      ...attr,
      properties: updatedProperties,
      required: updatedRequired,
    });
  };

  const removeNestedAttribute = (key: string) => {
    const updatedProperties = { ...attr.properties };
    delete updatedProperties[key];

    let required = attr.required || [];
    const requiredI = required.indexOf(key);
    if (requiredI !== -1) {
      required = [...required.slice(0, requiredI), ...required.slice(requiredI + 1)];
    }

    updateAttribute?.({
      ...attr,
      properties: updatedProperties,
      required,
    });

    if (!Object.keys(updatedProperties).length) {
      if (!isCredSubject) {
        // No nested attributes left so delete the parent one. Maybe a weird flow but certainly simpler than either allowing empty nested attributes or performing a recursive check for empty nested attributes before letting user continue.
        removeAttribute?.();
      } else {
        // Gotta leave at least one in
        updateAttrProperty("properties", { "": { ...newSchemaAttribute } });
      }
    }
  };

  function renderNestedAttributes(): JSX.Element {
    return (
      <>
        {Object.entries(attr.properties || {}).map(([key, node], i) => {
          return (
            <SchemaAttribute
              key={i}
              attrName={key}
              attr={node}
              updateAttribute={(attr) => updateNestedAttribute(key, attr)}
              removeAttribute={() => removeNestedAttribute(key)}
              parentRequired={attr.required}
              setParentRequired={(required) => updateAttrProperty("required", required)}
            />
          );
        })}
      </>
    );
  }

  if (isCredSubject) {
    return renderNestedAttributes();
  }

  const currentTypeValue = attr.type === "object" ? NESTED_TYPE_KEY : nodeToTypeName(attr);

  return (
    <AttributeBox
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
          value={attr.title || attr.$linkedData?.term || attrName || ""}
          onChange={(event: any) => updateAttrProperty("title", event.target.value)}
          disabled={readOnly}
          style={{ borderColor: colors.lightGray }}
        />

        {currentTypeValue && currentTypeValue in typeOptions ? (
          <DropDown
            onChange={(value) => updateType(value)}
            defaultSelectedValue={currentTypeValue}
            disabled={readOnly}
            options={Object.keys(typeOptions).map((typeName) => ({
              name: typeName === NESTED_TYPE_KEY ? "[nested properties]" : typeName,
              value: typeName,
            }))}
            style={{ borderColor: colors.lightGray }}
          />
        ) : (
          <Box
            width="100%"
            maxWidth="50%"
            pt={1}
            px={2}
            style={{ overflow: "hidden", textOverflow: "ellipsis" }}
            title={currentTypeValue}
          >
            {currentTypeValue}
          </Box>
        )}
        {/* @TODO/tobek Add "custom" option that opens fields to manually enter type details. */}
      </Flex>
      {!readOnly && (
        <Input
          width="100%"
          placeholder="Description"
          value={attr.description || ""}
          style={{ borderColor: colors.lightGray }}
          onChange={(event: any) => updateAttrProperty("description", event.target.value)}
        />
      )}

      {attr.type === "object" && <Box mt={3}>{renderNestedAttributes()}</Box>}

      <Flex justifyContent="space-between">
        <Checkbox
          fontFamily={fonts.sansSerif}
          label="Required"
          checked={attr.$linkedData?.term && parentRequired?.includes(attr.$linkedData?.term)}
          onChange={toggleRequired}
          disabled={readOnly}
          mt={readOnly ? 2 : 0}
        />
        {attr.type === "object" && (
          <Button.Text onClick={addNestedAttribute} fontSize={1}>
            Add Nested Attribute
          </Button.Text>
        )}
        {!readOnly && (
          <IconButton
            icononly
            icon="DeleteForever"
            onClick={(e: Event) => {
              e.preventDefault();
              removeAttribute?.();
            }}
          />
        )}
      </Flex>
    </AttributeBox>
  );
};

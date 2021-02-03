/* eslint-disable @typescript-eslint/no-non-null-assertion */

import * as React from "react";
import styled from "styled-components";
import { Box, Button, Checkbox, Flex, Input } from "rimble-ui";
import { LdContextPlusInnerNode, LdContextPlusNode, LdContextPlusNodeKey } from "vc-schema-tools";
import { fonts, colors } from "../../../../themes";
import { NESTED_TYPE_KEY, typeOptions } from "../utils";
import { convertToCamelCase } from "../../../../utils";
import { DropDown } from "../../../elements/DropDown/DropDown";
import { newSchemaAttribute, SchemaMetadata } from "../types";

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
  attr: Partial<LdContextPlusNode<SchemaMetadata>>;
  readOnly?: boolean;
  updateAttribute?(attribute: Partial<LdContextPlusNode<SchemaMetadata>>): void;
  removeAttribute?(): void;
}

export const SchemaAttribute: React.FunctionComponent<SchemaAttributeProps> = (props) => {
  const nestedAttr = props.attr as LdContextPlusInnerNode<SchemaMetadata>;

  function updateAttrProperty(attrProperty: LdContextPlusNodeKey, value: any) {
    const updatedProperty = { ...props.attr, [attrProperty]: value };
    if (attrProperty === "@title") {
      updatedProperty["@id"] = convertToCamelCase(value);
    }
    props.updateAttribute?.(updatedProperty);
  }

  function updateType(type: string) {
    const updatedAttr = {
      ...props.attr,
      ...typeOptions[type],
    };

    if (type === NESTED_TYPE_KEY && "@type" in updatedAttr) {
      delete updatedAttr["@type"];
      delete updatedAttr["@dataType"];
      delete updatedAttr["@format"];
    } else if (type !== NESTED_TYPE_KEY && "@context" in updatedAttr) {
      delete updatedAttr["@context"];
    }

    if (type === NESTED_TYPE_KEY || type === "http://schema.org/Boolean") {
      delete updatedAttr["@required"];
    }

    delete updatedAttr.niceName;

    props.updateAttribute?.(updatedAttr);
  }

  function addNestedAttribute(e: Event) {
    if (nestedAttr["@context"] && "" in nestedAttr["@context"]) {
      // Do nothing, and un-default-prevented event will trigger browser UI on empty required title field
      return;
    }
    e.preventDefault();
    props.updateAttribute?.({
      ...nestedAttr,
      "@context": {
        ...nestedAttr["@context"],
        "": {
          ...newSchemaAttribute,
        },
      },
    });
  }

  const updateNestedAttribute = (key: string, updatedAttr: Partial<LdContextPlusNode<SchemaMetadata>>) => {
    let updatedContext: { [key: string]: Partial<LdContextPlusNode<SchemaMetadata>> } = {};
    if (updatedAttr["@id"] !== key) {
      // Since nested attributes are listed by iterating over object keys, if we rename object key by deleting and adding, React will reorder inputs while user is typing and lose focus. So here we re-create object key by key in order to rename the updated key while preserving order.
      Object.keys(nestedAttr["@context"]!).forEach((contextKey) => {
        if (contextKey === key) {
          updatedContext[updatedAttr["@id"]!] = updatedAttr;
        } else {
          updatedContext[contextKey] = nestedAttr["@context"]![contextKey];
        }
      });
    } else {
      updatedContext = {
        ...nestedAttr["@context"],
        [key]: updatedAttr,
      };
    }
    updateAttrProperty("@context", updatedContext);
  };

  const removeNestedAttribute = (key: string) => {
    const updatedContext = { ...nestedAttr["@context"] };
    delete updatedContext[key];
    if (Object.keys(updatedContext).length) {
      updateAttrProperty("@context", updatedContext);
    } else {
      // No nested attributes left so delete the parent one. Maybe a weird flow but certainly simpler than either allowing empty nested attributes or performing a recursive check for empty nested attributes before letting user continue.
      props.removeAttribute?.();
    }
  };

  return (
    <AttributeBox
      border={1}
      borderRadius={1}
      p={3}
      pb={props.readOnly ? 3 : 1}
      my={3}
      backgroundColor={props.readOnly ? colors.nearWhite : "transparent"}
    >
      <Flex>
        <Input
          width="100%"
          type="text"
          required={true}
          placeholder="Attribute Name"
          mr={2}
          value={props.attr["@title"]}
          onChange={(event: any) => updateAttrProperty("@title", event.target.value)}
          disabled={props.readOnly}
          style={{ borderColor: colors.lightGray }}
        />
        <DropDown
          onChange={(value) => updateType(value)}
          defaultSelectedValue={
            "@context" in props.attr
              ? NESTED_TYPE_KEY
              : ("@type" in props.attr && props.attr["@type"]) || "http://schema.org/Text"
          }
          disabled={props.readOnly}
          options={Object.keys(typeOptions).map((type) => ({
            name: typeOptions[type].niceName || type,
            value: type,
          }))}
          style={{ borderColor: colors.lightGray }}
        />
        {/* @TODO/tobek Add "custom" option that opens fields to manually enter type details. */}
      </Flex>
      {!props.readOnly && (
        <Input
          width="100%"
          placeholder="Description"
          value={props.attr["@description"] || ""}
          style={{ borderColor: colors.lightGray }}
          onChange={(event: any) => updateAttrProperty("@description", event.target.value)}
        />
      )}

      {"@context" in props.attr && props.attr["@context"] && (
        <Box mt={3}>
          {Object.entries(props.attr["@context"]).map(([key, node]) => {
            return (
              <SchemaAttribute
                key={Object.keys(nestedAttr["@context"]!).indexOf(key)}
                attr={node}
                updateAttribute={(attr) => updateNestedAttribute(key, attr)}
                removeAttribute={() => removeNestedAttribute(key)}
              />
            );
          })}
        </Box>
      )}

      <Flex justifyContent="space-between">
        {"@type" in props.attr && props.attr["@type"] !== "http://schema.org/Boolean" ? (
          <Checkbox
            fontFamily={fonts.sansSerif}
            label="Required"
            checked={!!props.attr["@required"]}
            onChange={() => updateAttrProperty("@required", !props.attr["@required"])}
            disabled={props.readOnly}
          />
        ) : "@context" in props.attr ? (
          <Button.Text onClick={addNestedAttribute} fontSize={1}>
            Add Nested Attribute
          </Button.Text>
        ) : (
          <div></div>
        )}
        {!props.readOnly && (
          <IconButton
            icononly
            icon="DeleteForever"
            onClick={(e: Event) => {
              e.preventDefault();
              props.removeAttribute?.();
            }}
          />
        )}
      </Flex>
    </AttributeBox>
  );
};

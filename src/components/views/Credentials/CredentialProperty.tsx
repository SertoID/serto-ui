import * as React from "react";
import { Box, Tooltip } from "rimble-ui";
import { Info } from "@rimble/icons";
import { JsonSchemaNode } from "vc-schema-tools";
import { hexEllipsis } from "../../../utils/helpers";
import { CredentialTDLeft, CredentialTDRight, CredentialTR } from "./CredentialComponents";
import { colors } from "../../../themes/colors";

export interface CredentialPropertyProps {
  keyName: string /** "key" prop name is reserved by React */;
  value: any;
  nestedLevel?: number;
  parentKey?: string;
  schema?: JsonSchemaNode;
}

export const CredentialProperty: React.FunctionComponent<CredentialPropertyProps> = (props) => {
  const { schema, keyName, value } = props;
  const nestedLevel = props.nestedLevel || 0;
  const parentKey = props.parentKey || "";

  const keyDisplay = schema?.title || keyName;
  const keyDescription = schema?.description;

  let valueDisplay = "";
  let valueTooltip = "";
  if (value === "boolean" || Array.isArray(value)) {
    valueDisplay = JSON.stringify(value);
  } else if (typeof value === "string" && value.indexOf("0x") !== -1) {
    valueDisplay = hexEllipsis(value);
    valueTooltip = value;
  } else if (value && typeof value !== "object") {
    valueDisplay = value;
  }

  return (
    <>
      <CredentialTR>
        <CredentialTDLeft>
          <Box pl={nestedLevel * 24}>
            {keyDisplay}
            {keyDescription && (
              <Tooltip message={keyDescription} placement="top">
                <Info size={16} color={colors.silver} ml={1} style={{ verticalAlign: "text-bottom" }} />
              </Tooltip>
            )}
          </Box>
        </CredentialTDLeft>
        <CredentialTDRight>
          {valueTooltip ? (
            <Tooltip message={valueTooltip} placement="top">
              <Box>{valueDisplay}</Box>
            </Tooltip>
          ) : (
            valueDisplay
          )}
        </CredentialTDRight>
      </CredentialTR>
      {value &&
        typeof value === "object" &&
        !Array.isArray(value) &&
        Object.entries(value).map(([nestedKey, nestedValue]) => (
          <CredentialProperty
            key={nestedKey}
            keyName={nestedKey}
            value={nestedValue}
            nestedLevel={nestedLevel + 1}
            parentKey={parentKey + keyName}
            schema={schema?.properties?.[nestedKey]}
          />
        ))}
    </>
  );
};

import * as React from "react";
import { Box, Tooltip } from "rimble-ui";
import { hexEllipsis } from "../../../utils/helpers";
import { CredentialTDLeft, CredentialTDRight, CredentialTR } from "./CredentialComponents";

export interface CredentialPropertyProps {
  keyName: string /** "key" prop name is reserved by React */;
  value: any;
  nestedLevel?: number;
  parentKey?: string;
}

export const CredentialProperty: React.FunctionComponent<CredentialPropertyProps> = (props) => {
  const { keyName, value } = props;
  const nestedLevel = props.nestedLevel || 0;
  const parentKey = props.parentKey || "";

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
    <React.Fragment key={parentKey + keyName}>
      <CredentialTR key={parentKey + keyName}>
        <CredentialTDLeft>
          <Box pl={nestedLevel * 24}>{keyName}</Box>
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
            keyName={nestedKey}
            value={nestedValue}
            nestedLevel={nestedLevel + 1}
            parentKey={parentKey + keyName}
          />
        ))}
    </React.Fragment>
  );
};

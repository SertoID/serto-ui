import React from "react";
import { Box, Input } from "rimble-ui";
import { Identifier } from "../../../types";
import { DropDown } from "./DropDown/DropDown";

export interface DidSelectProps {
  identifiers: Identifier[];
  value?: string;
  allowCustom?: boolean;
  defaultSelectFirst?: boolean;
  required?: boolean;
  onChange(value: string): void;
}

const CUSTOM_DID = Symbol() as any;

export const DidSelect: React.FunctionComponent<DidSelectProps> = (props) => {
  const { value, onChange, identifiers, defaultSelectFirst } = props;

  const [showCustom, setShowCustom] = React.useState(false);
  const [selectedDid, setSelectedDid] = React.useState(props.defaultSelectFirst ? identifiers[0].did : "");
  const [customDid, setCustomDid] = React.useState("");

  React.useEffect(() => {
    if (defaultSelectFirst && !showCustom && value !== identifiers[0].did && selectedDid === identifiers[0].did) {
      onChange(identifiers[0].did);
    }
  }, [defaultSelectFirst, showCustom, identifiers, onChange, selectedDid, value]);

  let options = identifiers.map((id) => ({
    name: id.alias ? `${id.alias} (${id.did})` : id.did,
    value: id.did,
  }));

  if (props.allowCustom) {
    options = [
      {
        name: "Select DID...",
        value: "",
      },
      {
        name: "Enter DID manually",
        value: CUSTOM_DID,
      },
    ].concat(options);
  }

  const onDropDownChange = (value: string) => {
    if (value === CUSTOM_DID) {
      setShowCustom(true);
      onChange(customDid);
    } else {
      setShowCustom(false);
      setSelectedDid(value);
      onChange(value);
    }
  };

  return (
    <Box width="100%" position="relative">
      <DropDown
        onChange={onDropDownChange}
        options={options}
        defaultSelectedValue={defaultSelectFirst ? identifiers[0].did : undefined}
      />
      <Input
        type="url"
        value={showCustom ? customDid : selectedDid}
        required={props.required}
        onChange={(event: any) => {
          if (!showCustom) {
            return false;
          }
          setCustomDid(event.target.value);
          onChange(event.target.value);
        }}
        width="100%"
        placeholder="did:example:0xabc123"
        style={
          showCustom
            ? undefined
            : {
                /* When `showCustom` is true we have a normal input field here and browser can handle "required" validation normally. When `showCustom` is not true, we hide this with CSS but fill it out based on value selected in DropDown, so that if user tries to submit and this is required and no value has been selected, the native browser validation tooltip ("please fill out this required field") points to our DropDown. The reason we have to hide with CSS is that if we hide with input `hidden` attribute (and/or use `disabled`) then browser ignores validation for the input. */
                position: "absolute",
                opacity: 0,
                top: 0,
                pointerEvents: "none",
              }
        }
      />
    </Box>
  );
};

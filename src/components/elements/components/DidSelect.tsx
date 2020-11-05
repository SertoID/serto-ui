import React from "react";
import { Box, Input } from "rimble-ui";
import { Identifier } from "../../../types";
import { DropDown } from "./DropDown/DropDown";

export interface DidSelectProps {
  identifiers: Identifier[];
  autoSelectFirst?: boolean;
  allowCustom?: boolean;
  required?: boolean;
  onChange(value: string): void;
}

const CUSTOM_DID = Symbol() as any;

export const DidSelect: React.FunctionComponent<DidSelectProps> = (props) => {
  const [showCustom, setShowCustom] = React.useState(false);
  const [customDid, setCustomDid] = React.useState("");

  React.useEffect(() => {
    if (props.autoSelectFirst) {
      props.onChange(props.identifiers[0].did);
    }
  }, [props, props.autoSelectFirst, props.identifiers, props.onChange]);

  let options = props.identifiers.map((id) => ({
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
      props.onChange(customDid);
    } else {
      setShowCustom(false);
      setSelectedDid(value);
      props.onChange(value);
    }
  };

  return (
    <Box width="100%" position="relative">
      <DropDown
        onChange={onDropDownChange}
        options={options}
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
          props.onChange(event.target.value);
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

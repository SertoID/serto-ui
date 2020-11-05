import React from "react";
import { Input } from "rimble-ui";
import { Identifier } from "../../../types";
import { DropDown } from "./DropDown/DropDown";

export interface DidSelectProps {
  identifiers: Identifier[];
  autoSelectFirst?: boolean;
  allowCustom?: boolean;
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
        name: "Select DID",
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
      props.onChange(value);
    }
  };

  return (
    <>
      <DropDown onChange={onDropDownChange} options={options} />
      {showCustom && (
        <Input
          type="url"
          value={customDid}
          onChange={(event: any) => {
            setCustomDid(event.target.value);
            props.onChange(event.target.value);
          }}
          width="100%"
          placeholder="did:example:0xabc123"
        />
      )}
    </>
  );
};

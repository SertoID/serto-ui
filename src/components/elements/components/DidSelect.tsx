import React from "react";
import useSWR from "swr";
import { Box, Input, Loader } from "rimble-ui";
import { DropDown } from "./DropDown/DropDown";
import { TrustAgencyService } from "../../../services/TrustAgencyService";
import { TrustAgencyContext } from "../../../context/TrustAgentProvider";

export interface DidSelectProps {
  ownDidsOnly?: boolean;
  value?: string;
  allowCustom?: boolean;
  defaultSelectFirst?: boolean;
  required?: boolean;
  onChange(value: string): void;
}

const CUSTOM_DID = Symbol() as any;

export const DidSelect: React.FunctionComponent<DidSelectProps> = (props) => {
  const { value, onChange, defaultSelectFirst } = props;

  const TrustAgent = React.useContext<TrustAgencyService>(TrustAgencyContext);
  const identifiersEndpoint = props.ownDidsOnly ? "/v1/tenant/agent/identityManagerGetIdentities" : "/v1/tenant/all";
  const getIdentifiersFunc = () =>
    props.ownDidsOnly ? TrustAgent.getTenantIdentifiers() : TrustAgent.getAllIdentifiers();
  const { data: identifiers, error: getIdentifiersError } = useSWR(identifiersEndpoint, getIdentifiersFunc);

  if (getIdentifiersError) {
    console.error(`Failed to fetch identifiers from ${identifiersEndpoint}:`, getIdentifiersError);
  }

  const [showCustom, setShowCustom] = React.useState(false);
  const [selectedDid, setSelectedDid] = React.useState(props.defaultSelectFirst ? identifiers?.[0].did : "");
  const [customDid, setCustomDid] = React.useState("");

  React.useEffect(() => {
    if (
      defaultSelectFirst &&
      !showCustom &&
      identifiers?.[0] &&
      value !== identifiers[0].did &&
      selectedDid === identifiers[0].did
    ) {
      onChange(identifiers[0].did);
    }
  }, [defaultSelectFirst, showCustom, identifiers, onChange, selectedDid, value]);

  if (!identifiers?.[0]?.did) {
    return (
      <Box width="100%" height="48px" border={1} borderRadius={1} p={3} mb={3}>
        <Loader />
      </Box>
    );
  }

  let options = identifiers.map((id) => {
    let name;
    if (id.alias && id.userName) {
      name = `${id.userName}: ${id.alias} (${id.did})`;
    } else if (id.alias) {
      name = `${id.alias} (${id.did})`;
    } else if (id.userName) {
      name = `${id.userName}: ${id.did}`;
    } else {
      name = id.did;
    }
    return {
      name,
      value: id.did,
    };
  });

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

import React, { useState } from "react";
import { Flash, Box, Checkbox, Input, Field, Text } from "rimble-ui";
import { JsonSchemaNode } from "vc-schema-tools";
import { DidSearch } from "../../../elements/DidSearch";
import { Identifier } from "../../../../types";
import { isoToDatetimeLocal } from "../../../../utils/helpers";

export interface IssueVcFormInputProps {
  name: string;
  value: any;
  node: JsonSchemaNode;
  identifiers: Identifier[];
  required?: boolean;
  defaultSubjectDid?: string;
  subjectSupportsMessaging?: boolean;
  onChange(value: any): void;
  setSubjectSupportsMessaging(supported: boolean): void;
}

export const IssueVcFormInput: React.FunctionComponent<IssueVcFormInputProps> = (props) => {
  const {
    name,
    node,
    value,
    onChange,
    required,
    identifiers,
    defaultSubjectDid,
    subjectSupportsMessaging,
    setSubjectSupportsMessaging,
  } = props;

  const [didSearchBlurred, setDidSearchBlurred] = useState(false);

  // @TODO/tobek Ideally we could detect DIDs in values other than ones keyed `id` but for that we'd have to traverse the `LdContextPlusNode`s instead of `JsonSchemaNode`s which would be more complicated
  const isDid = name === "id" && node.type === "string" && node.format === "uri";

  const renderInput = () => {
    if (node.properties && node.type === "object") {
      return (
        <Box pt={2} pl="24px" required={node.required?.length}>
          {Object.entries(node.properties).map(([nestedKey, nestedNode]) => (
            <IssueVcFormInput
              key={nestedKey}
              name={nestedKey}
              node={nestedNode}
              value={value?.[nestedKey]}
              required={node.required?.includes(nestedKey)}
              identifiers={identifiers}
              onChange={(updatedNestedValue) =>
                onChange({
                  ...value,
                  [nestedKey]: updatedNestedValue,
                })
              }
              subjectSupportsMessaging={subjectSupportsMessaging}
              setSubjectSupportsMessaging={setSubjectSupportsMessaging}
            />
          ))}
        </Box>
      );
    }

    if (isDid) {
      return (
        <>
          <DidSearch
            key={name}
            onChange={(val) => {
              onChange(val.did);
              setSubjectSupportsMessaging(!!val.messagingSupported);
            }}
            onBlur={() => setDidSearchBlurred(true)}
            required={required}
            identifiers={identifiers}
            defaultSelectedDid={defaultSubjectDid}
          />
          {didSearchBlurred && value && !subjectSupportsMessaging && (
            <Flash my={3} variant="warning">
              The subject DID you selected does not support DIDComm messaging, so they cannot seamlessly receive the VC
              you are issuing. You may still issue the VC here, and on the next screen can share it with the subject via
              email or QR code.
            </Flash>
          )}
        </>
      );
    }

    if (node.type === "boolean") {
      return <Checkbox checked={!!value} onChange={() => onChange(!value)} />;
    }

    let type = "text";
    let placeholder = "";
    let width: string | undefined = "100%";
    let inputValue = value || "";
    if (node.type === "number" || node.type === "integer") {
      type = "number";
      width = undefined;
    } else if (node.format === "date") {
      type = "date";
    } else if (node.format === "date-time") {
      type = "datetime-local";
      inputValue = inputValue && isoToDatetimeLocal(inputValue);
    } else if (node.format === "uri") {
      type = "url";
      placeholder = "URL";
    }

    function changeHandler(event: any) {
      const newValue = event.target.value;
      if (type === "number") {
        onChange(parseInt(newValue, 10));
      } else if (type === "datetime-local") {
        onChange(new Date(newValue).toISOString());
      } else {
        onChange(newValue);
      }
    }

    return (
      <Input
        type={type}
        disabled={false}
        value={inputValue}
        onChange={changeHandler}
        required={required}
        width={width}
        placeholder={placeholder}
      />
    );
  };

  return (
    <Field label={node.title || name} width="100%" mb={isDid ? 0 : 3}>
      <Box required={required || node.required?.length} width="100%">
        {node.description ? <Text fontSize={1}>{node.description}</Text> : <></>}
        {renderInput()}
      </Box>
    </Field>
  );
};

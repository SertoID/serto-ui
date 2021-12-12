import React from "react";
import { Box, Checkbox, Input, Field, Text } from "rimble-ui";
import { JsonSchemaNode } from "vc-schema-tools";
import { DidSearchWithMessagingInfo } from "../../../elements/DidSearchWithMessagingInfo";
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
  isNested?: boolean;
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
    isNested,
  } = props;

  const isDid = node.type === "string" && node.format === "uri" && node.$linkedData?.["@id"] === "@id";
  const isSubjectDid = isDid && name === "id" && !isNested;

  React.useEffect(() => {
    // Most required fields will be handled by form validation, but requiring a boolean or a nested object is not.
    // @TODO/tobek In some cases this isn't handling nested required booleans but that's a heck of an edge case and ideally we should check final VC against JSON Schema anyway which would catch this.
    if (required && typeof value === "undefined") {
      if (node.type === "boolean") {
        onChange(false);
      } else if (node.type === "object") {
        onChange({});
      }
    }
  }, [node.type, required, value, onChange]);

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
              isNested
            />
          ))}
        </Box>
      );
    }

    if (isSubjectDid) {
      return (
        <Box mb={3}>
          <DidSearchWithMessagingInfo
            key={name}
            onChange={(val) => onChange(val.did)}
            required={required}
            identifiers={identifiers}
            defaultSelectedDid={defaultSubjectDid}
            supportsMessaging={subjectSupportsMessaging}
            setSupportsMessaging={setSubjectSupportsMessaging}
          />
        </Box>
      );
    } else if (isDid) {
      return (
        <Box mb={3}>
          <DidSearch
            key={name}
            onChange={(val) => onChange(val.did)}
            required={required}
            identifiers={identifiers}
            defaultSelectedDid={defaultSubjectDid}
          />
        </Box>
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

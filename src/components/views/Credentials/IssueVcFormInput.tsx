import React from "react";
import { Checkbox, Input } from "rimble-ui";
import { Identifier } from "../../../types";
import { JsonSchemaNode } from "../../elements/components/Schemas/VcSchema";
import { DidSelect } from "../../elements/components/DidSelect";

export interface IssueVcFormInputProps {
  name: string;
  value: any;
  node: JsonSchemaNode;
  identifiers: Identifier[];
  required?: boolean;
  onChange(value: any): void;
}

export const IssueVcFormInput: React.FunctionComponent<IssueVcFormInputProps> = (props) => {
  const { name, node, identifiers, value, onChange, required } = props;
  if (node.type === "boolean") {
    return <Checkbox checked={!!value} onChange={() => onChange(!value)} />;
  }

  // @TODO/tobek Ideally we could detect DIDs in values other than ones keyed `id` but for that we'd have to traverse the `LdContextPlusNode`s instead of `JsonSchemaNode`s which would be more complicated
  const isDid = name === "id" && node.type === "string" && node.format === "uri";
  if (isDid) {
    return (
      <DidSelect
        key={name}
        onChange={onChange}
        identifiers={identifiers}
        allowCustom={true}
        value={value}
        required={required}
      />
    );
  }

  let type = "text";
  let disabled = false;
  let placeholder = "";
  let width: string | undefined = "100%";
  if (node.type === "object") {
    disabled = true;
    placeholder = "[nested properties not yet supported]";
  } else if (node.type === "number" || node.type === "integer") {
    type = "number";
    width = undefined;
  } else if (node.format === "date-time") {
    type = "datetime-local";
  } else if (node.format === "uri") {
    type = "url";
    placeholder = "URL";
  }

  return (
    <Input
      type={type}
      disabled={disabled}
      value={value || ""}
      onChange={(event: any) => onChange(type === "number" ? parseInt(event.target.value, 10) : event.target.value)}
      required={required}
      width={width}
      placeholder={placeholder}
    />
  );
};

import React from "react";
import { Box, Checkbox, Input, Field, Text } from "rimble-ui";
import { JsonSchemaNode } from "../../elements/components/Schemas/VcSchema";
import { DidSelect } from "../../elements/components/DidSelect";

export interface IssueVcFormInputProps {
  name: string;
  value: any;
  node: JsonSchemaNode;
  required?: boolean;
  defaultSubjectDid?: string;
  onChange(value: any): void;
}

export const IssueVcFormInput: React.FunctionComponent<IssueVcFormInputProps> = (props) => {
  const { name, node, value, onChange, required, defaultSubjectDid } = props;

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
              onChange={(updatedNestedValue) =>
                onChange({
                  ...value,
                  [nestedKey]: updatedNestedValue,
                })
              }
            />
          ))}
        </Box>
      );
    }

    if (isDid) {
      return (
        <DidSelect
          key={name}
          onChange={onChange}
          allowCustom={true}
          value={value}
          required={required}
          defaultSelectedDid={defaultSubjectDid}
        />
      );
    }

    if (node.type === "boolean") {
      return <Checkbox checked={!!value} onChange={() => onChange(!value)} />;
    }

    let type = "text";
    let disabled = false;
    let placeholder = "";
    let width: string | undefined = "100%";
    if (node.type === "number" || node.type === "integer") {
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

  return (
    <Field label={node.title || name} width="100%" mb={isDid ? 0 : 3}>
      <Box required={required || node.required?.length} width="100%">
        {node.description ? <Text fontSize={1}>{node.description}</Text> : <></>}
        {renderInput()}
      </Box>
    </Field>
  );
};

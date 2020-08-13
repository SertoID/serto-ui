import { Info } from "@rimble/icons";
import slugify from "@sindresorhus/slugify";
import * as React from "react";
import { Button, Checkbox, Field, Form, Input, Heading, Text, Tooltip } from "rimble-ui";
import styled from "styled-components";
import { baseColors, colors, fonts } from "../../../";
import { WorkingSchema } from "./utils";

const SchemaField = styled(Field)`
  width: 100%;
  font-family: ${fonts.sansSerif};
`;
const SchemaLabel = styled.label`
  display: block;
  width: 100%;
  margin-bottom: 16px;
  font-family: ${fonts.sansSerif};
`;

export interface InfoStepProps {
  schema: WorkingSchema;
  updateSchema(field: keyof WorkingSchema, value: any): void;
  onComplete(): void;
}

export const InfoStep: React.FunctionComponent<InfoStepProps> = (props) => {
  const { schema, updateSchema } = props;
  const [doValidation, setDoValidation] = React.useState(false);

  const defaultSchemaSlug = React.useMemo(() => slugify(schema.name), [schema.name]);

  function goNext(e: Event) {
    e.preventDefault();
    if (schema.name && (defaultSchemaSlug || schema.slug) && schema.version && schema.icon) {
      setDoValidation(false);
      if (!schema.slug) {
        updateSchema("slug", defaultSchemaSlug);
      }
      props.onComplete();
    } else {
      setDoValidation(true);
    }
  }

  return (
    <>
      <Heading mt={4} mb={3} color={baseColors.black} fontFamily={fonts.sansSerif} fontSize={4} fontWeight={3}>
        Create Credential Type
      </Heading>
      <Form validated={doValidation} onSubmit={goNext}>
        <SchemaField label="Name">
          <Input
            width="100%"
            type="text"
            required={true}
            value={schema.name || ""}
            onChange={(event: any) => updateSchema("name", event.target.value)}
          />
        </SchemaField>
        <SchemaField label="Slug">
          <Input
            width="100%"
            type="text"
            value={schema.slug}
            placeholder={defaultSchemaSlug}
            onChange={(event: any) => updateSchema("slug", event.target.value)}
            onBlur={() => updateSchema("slug", slugify(schema.slug))}
          />
        </SchemaField>
        <SchemaField label="Version">
          <Input
            width="100%"
            type="text"
            required={true}
            value={schema.version}
            onChange={(event: any) => updateSchema("version", event.target.value)}
          />
        </SchemaField>
        <SchemaLabel>
          <Text fontSize={1} fontWeight={3} mb={2}>
            Icon{" "}
            <Tooltip
              message="This should be a single character, for example an emoji, that will be used to label this schema"
              placement="top"
            >
              <Info size={16} color={colors.silver} style={{ verticalAlign: "text-top" }} />
            </Tooltip>
          </Text>
          <Input
            width={6}
            type="text"
            required={true}
            value={schema.icon}
            onChange={(event: any) => updateSchema("icon", event.target.value)}
          />
        </SchemaLabel>
        <SchemaField label="Description">
          <textarea
            value={schema.description}
            style={{ width: "100%", minHeight: "150px" }}
            onChange={(event: any) => updateSchema("description", event.target.value)}
          />
        </SchemaField>
        <Flex>
          <Box display="inline-block">
            <Checkbox
              mb={4}
              fontFamily={fonts.sansSerif}
              label="Discoverable"
              checked={schema.discoverable}
              onChange={() => updateSchema("discoverable", !schema.discoverable)}
            />
          </Box>{" "}
          <Tooltip
            message="If checked, this schema will be listed in the public schema registry. If unchecked, your schema will still be accessible at a public URL via the above slug, but will not be listed in the registry."
            placement="top"
          >
            <Info mt={1} size={16} color={colors.silver} style={{ verticalAlign: "text-top" }} />
          </Tooltip>
        </Flex>

        <Button type="submit" width="100%">
          Next
        </Button>
      </Form>
    </>
  );
};

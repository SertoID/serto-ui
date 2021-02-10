import { Info } from "@rimble/icons";
import slugify from "@sindresorhus/slugify";
import * as React from "react";
import { Box, Button, Checkbox, Field, Form, Input, Text, Tooltip, Flex, Flash } from "rimble-ui";
import styled from "styled-components";
import { colors, fonts } from "../../../../themes/";
import { ModalContent, ModalHeader } from "../../../elements/Modals";
import { WorkingSchema } from "../types";

const SchemaField = styled(Field)`
  width: 100%;
  font-family: ${fonts.sansSerif};
`;
const SchemaLabel = styled.label`
  display: block;
  width: 50%;
  margin-bottom: 16px;
  margin-left: 8px;
  font-family: ${fonts.sansSerif};
`;

export interface InfoStepProps {
  schema: WorkingSchema;
  initialSchemaState?: WorkingSchema;
  isUpdate?: boolean;
  updateSchema(updates: Partial<WorkingSchema>): void;
  onComplete(): void;
}

export const InfoStep: React.FunctionComponent<InfoStepProps> = (props) => {
  const { isUpdate, initialSchemaState, schema, updateSchema } = props;
  const [doValidation, setDoValidation] = React.useState(false);
  const [error, setError] = React.useState("");

  const defaultSchemaSlug = React.useMemo(() => slugify(schema.name), [schema.name]);

  /** Convert first latin character in name to bubble unicode char (🅐-🅩) as default icon. */
  const defaultIcon = React.useMemo(() => {
    if (!schema.name) {
      return "";
    }
    const firstCharMatch = schema.name.match(/[a-zA-Z]/);
    if (!firstCharMatch?.[0]) {
      return "⓿";
    }
    const char = firstCharMatch[0].toLowerCase();
    return String.fromCodePoint(127302 + parseInt(char, 36));
  }, [schema.name]);

  function goNext(e: Event) {
    e.preventDefault();
    setError("");
    if (isUpdate && schema.version === initialSchemaState?.version) {
      setError("You must update the version number when updating a schema.");
      return;
    }
    if (schema.name && (defaultSchemaSlug || schema.slug) && schema.version) {
      setDoValidation(false);
      updateSchema({
        slug: schema.slug || defaultSchemaSlug,
        icon: schema.icon || defaultIcon,
      });
      props.onComplete();
    } else {
      setDoValidation(true);
    }
  }

  return (
    <>
      <ModalHeader>{isUpdate ? "Update" : "Create New"} Schema</ModalHeader>
      <ModalContent>
        <Form validated={doValidation} onSubmit={goNext}>
          <SchemaField label="Credential Schema Name">
            <Input
              width="100%"
              type="text"
              required={true}
              placeholder="Enter name"
              value={schema.name || ""}
              onChange={(event: any) => updateSchema({ name: event.target.value })}
            />
          </SchemaField>
          <SchemaField label="URL Slug">
            <Input
              width="100%"
              type="text"
              required={true}
              placeholder="Enter slug/ID"
              value={schema.slug || defaultSchemaSlug}
              onChange={(event: any) => updateSchema({ slug: event.target.value })}
              onBlur={() => updateSchema({ slug: slugify(schema.slug) })}
            />
          </SchemaField>
          <Flex>
            <SchemaField label="Version" style={{ width: "50%" }}>
              <Input
                width="100%"
                type="text"
                required={true}
                value={schema.version}
                onChange={(event: any) => updateSchema({ version: event.target.value })}
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
                <Text.span ml={1} fontStyle="italic" fontSize={1}>
                  (optional)
                </Text.span>
              </Text>
              <Input
                width="100%"
                type="text"
                placeholder={defaultIcon}
                value={schema.icon}
                onChange={(event: any) => updateSchema({ icon: event.target.value })}
              />
            </SchemaLabel>
          </Flex>
          <SchemaField label="Schema Description">
            <Input
              width="100%"
              type="text"
              value={schema.description}
              placeholder="Briefly describe how this schema will be used"
              onChange={(event: any) => updateSchema({ description: event.target.value })}
            />
          </SchemaField>
          <Box mb={4}>
            <Checkbox
              fontFamily={fonts.sansSerif}
              label="Discoverable"
              checked={schema.discoverable}
              onChange={() => updateSchema({ discoverable: !schema.discoverable })}
            />
            <Text mt={1} fontSize={1} fontFamily={fonts.sansSerif} color={colors.gray60}>
              If checked, this schema will be listed in the public schema registry. If unchecked, your schema will still
              be publicly accessible at an unlisted URL via the above slug.
            </Text>
          </Box>

          <Button type="submit" width="100%">
            Next
          </Button>
          {error && (
            <Flash mt={3} variant="danger">
              {error}
            </Flash>
          )}
        </Form>
      </ModalContent>
    </>
  );
};

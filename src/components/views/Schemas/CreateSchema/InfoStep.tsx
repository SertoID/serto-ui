import slugify from "@sindresorhus/slugify";
import * as React from "react";
import { Info } from "@rimble/icons";
import { Box, Button, Checkbox, Field, Form, Input, Text, Tooltip, Flex, Flash } from "rimble-ui";
import styled from "styled-components";
import { colors, fonts } from "../../../../themes/";
import { WorkingSchema } from "../types";

const SchemaField = styled(Field)`
  &,
  & input {
    width: 100%;
    font-family: ${fonts.sansSerif};
  }
`;
const StyledTextarea = styled.textarea`
  width: 100%;
  font-family: ${fonts.sansSerif};
  font-size: 16px;
  padding: 16px;
  border-radius: 4px;
  border-color: ${colors.moonGray};
  box-shadow: ${(props) => props.theme.shadows[1] || 0};
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
  userOwnsSchema?: boolean;
  isAuthenticated?: boolean;
  updateSchema(updates: Partial<WorkingSchema>): void;
  onComplete(): void;
}

export const InfoStep: React.FunctionComponent<InfoStepProps> = (props) => {
  const { isUpdate, userOwnsSchema, isAuthenticated, initialSchemaState, schema, updateSchema } = props;
  const $metadata = schema.$metadata || {};
  const [doValidation, setDoValidation] = React.useState(false);
  const [error, setError] = React.useState("");
  const [useDefaultSlug, setUseDefaultSlug] = React.useState(!$metadata.slug);

  /** Convert first latin character in name to bubble unicode char (🅐-🅩) as default icon. */
  const defaultIcon = React.useMemo(() => {
    if (!schema.title) {
      return "";
    }
    const firstCharMatch = schema.title.match(/[a-zA-Z]/);
    if (!firstCharMatch?.[0]) {
      return "⓿";
    }
    const char = firstCharMatch[0].toLowerCase();
    return String.fromCodePoint(127302 + parseInt(char, 36));
  }, [schema.title]);

  function goNext(e: Event) {
    e.preventDefault();
    setError("");
    // If *not* authenticated they won't be able to save changes anyway, so we can let them explore the editor without worrying about what values need updating.
    if (isAuthenticated) {
      if (isUpdate && userOwnsSchema && $metadata.version === initialSchemaState?.version) {
        setError("You must update the version number when updating a schema.");
        return;
      }
      if (isUpdate && !userOwnsSchema && $metadata.slug === initialSchemaState?.$metadata?.slug) {
        setError("You must update the slug when forking a schema.");
        return;
      }
    }
    if (schema.title && $metadata.slug && $metadata.version) {
      setDoValidation(false);
      updateSchema({
        $metadata: {
          ...$metadata,
          icon: $metadata.icon || defaultIcon,
        },
      });
      // @TODO set $linkedData based on pascal case and also set ID and URIs or does that happen later?
      props.onComplete();
    } else {
      setDoValidation(true);
    }
  }

  return (
    <Form validated={doValidation} onSubmit={goNext}>
      <SchemaField label="Credential Schema Name">
        <Input
          width="100%"
          type="text"
          required={true}
          placeholder="Enter name"
          value={schema.title || ""}
          onChange={(event: any) =>
            updateSchema({
              title: event.target.value,
              $metadata: {
                ...$metadata,
                slug: useDefaultSlug ? slugify(event.target.value) : $metadata.slug,
              },
            })
          }
        />
      </SchemaField>
      <SchemaField label="URL Slug">
        <Input
          width="100%"
          type="text"
          required={true}
          placeholder="Enter slug/ID"
          value={$metadata.slug}
          onChange={(event: any) => updateSchema({ slug: event.target.value })}
          onBlur={() => {
            if ($metadata.slug) {
              return;
            }
            updateSchema({
              $metadata: {
                ...$metadata,
                slug: slugify($metadata.slug || ""),
              },
            });
            setUseDefaultSlug(false);
          }}
        />
      </SchemaField>
      <Flex>
        <SchemaField label="Version" style={{ width: "50%" }}>
          <Input
            width="100%"
            type="text"
            required={true}
            value={$metadata.version}
            onChange={(event: any) =>
              updateSchema({
                $metadata: {
                  ...$metadata,
                  version: event.target.value,
                },
              })
            }
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
            value={$metadata.icon}
            onChange={(event: any) =>
              updateSchema({
                $metadata: {
                  ...$metadata,
                  icon: event.target.value,
                },
              })
            }
          />
        </SchemaLabel>
      </Flex>
      <SchemaField label="Description">
        <StyledTextarea
          required
          value={schema.description}
          placeholder="Briefly describe how this schema will be used"
          onChange={(event: any) => updateSchema({ description: event.target.value })}
          style={{ minHeight: "92px" }}
        />
      </SchemaField>
      <Box mb={4}>
        <Checkbox
          fontFamily={fonts.sansSerif}
          label="Searchable"
          checked={$metadata.discoverable}
          onChange={() =>
            updateSchema({
              $metadata: {
                ...$metadata,
                discoverable: !$metadata.discoverable,
              },
            })
          }
        />
        <Text mt={1} fontSize={1} fontFamily={fonts.sansSerif} color={colors.gray60}>
          If checked, this schema will be listed in the public schema registry. If unchecked, your schema will still be
          publicly accessible at an unlisted URL via the above slug.
        </Text>
      </Box>

      {error && (
        <Flash mb={3} variant="danger">
          {error}
        </Flash>
      )}
      <Button type="submit" width="100%">
        Next
      </Button>
    </Form>
  );
};

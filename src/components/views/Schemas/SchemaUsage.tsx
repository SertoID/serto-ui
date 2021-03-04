import * as React from "react";
import { Box, Text, Button } from "rimble-ui";
import { Send, OpenInNew } from "@rimble/icons";
import { SchemaDataResponse, SchemaDataInput } from "./types";
import { H5 } from "../../layouts/LayoutComponents";
import { fonts } from "../../../themes";
import { CopyableTruncatableText } from "../../elements/CopyableTruncatableText/CopyableTruncatableText";
import { Expand } from "../../elements/Expand/Expand";
import { HighlightedJson } from "../../elements/HighlightedJson/HighlightedJson";

export interface SchemaUsageProps {
  schema: SchemaDataResponse | SchemaDataInput;
  style?: any;
}

export const SchemaUsage: React.FunctionComponent<SchemaUsageProps> = (props) => {
  const { schema } = props;

  // @TODO/tobek Need a more elegant way to get root type. Probably VcSchema library should have a utility that creates an example VC that actually has all the fields filled in based on schema.
  const rootType = JSON.parse(schema.ldContextPlus)?.["@context"]?.["@rootType"];
  const exampleVc = {
    "@context": [
      "https://www.w3.org/2018/credentials/v1",
      ...(schema.uris?.jsonLdContext ? [schema.uris.jsonLdContext] : []),
    ],
    ...(schema.uris?.jsonSchema && {
      credentialSchema: {
        id: schema.uris.jsonSchema,
        type: "JsonSchemaValidator2018",
      },
    }),
    type: ["VerifiableCredential", ...(rootType ? [rootType] : [])],
    issuer: "[ISSUER]",
    issuanceDate: "[DATE]",
    credentialSubject: {
      id: "[SUBJECT]",
      "...": "...",
    },
  };

  return (
    <Box px={3} fontFamily={fonts.sansSerif} style={props.style}>
      <H5 mt={2} my={3}>
        Schema URLs
      </H5>

      <Text mt={3} mb={2}>
        JSON-LD Context
        {schema.uris?.jsonLdContext && (
          <a href={schema.uris.jsonLdContext} target="_blank">
            <OpenInNew size="15px" ml={1} p={1} mb="-6px" />
          </a>
        )}
      </Text>
      <CopyableTruncatableText text={schema.uris?.jsonLdContext || "[none]"} />

      <Text mt={3} mb={2}>
        JSON Schema
        {schema.uris?.jsonSchema && (
          <a href={schema.uris.jsonSchema} target="_blank">
            <OpenInNew size="15px" ml={1} p={1} mb="-6px" />
          </a>
        )}
      </Text>
      <CopyableTruncatableText text={schema.uris?.jsonSchema || "[none]"} />

      <Expand expandButtonText="Format info" contractButtonText="Hide format info">
        <Text my={3}>@TODO/tobek copy TBD</Text>
        <Text my={3}>
          JSON-LD contexts (
          <a href="https://w3c.github.io/json-ld-syntax/#the-context" target="_blank">
            specification
          </a>
          ) are JSON data that define data relationships and semantics, and can leverage property and entity types on
          schema repositories such as{" "}
          <a href="https://schema.org" target="_Blank">
            schema.org
          </a>
          .
        </Text>
        <Text my={3}>
          For more details on using JSON-LD contexts in VCs, see{" "}
          <a href="https://www.w3.org/TR/vc-data-model/#contexts" target="_blank">
            the contexts section of the VC spec
          </a>
          .
        </Text>
        <Text my={3}>
          JSON Schema (
          <a href="https://json-schema.org/" target="_blank">
            specification
          </a>
          ) schemas are also JSON data, but define data structure, requirements, descriptions and other metadata,
          thereby supporting validation of VCs to ensure conformance.
        </Text>
        <Text my={3}>
          For more details on using JSON Schemas in VCs, see{" "}
          <a href="https://www.w3.org/TR/vc-data-model/#data-schemas" target="_blank">
            the <code>credentialSchema</code> field in the VC spec
          </a>
          .
        </Text>
        <Text my={3}></Text>
      </Expand>

      <H5 mb={3}>Issue VC</H5>
      {/* @TODO/tobek Link this to Serto Agent eventually. */}
      <Button.Outline size="small" onClick={() => alert("what do?")}>
        <Send size="15px" mr={2} />
        Issue VC with Serto Agent
      </Button.Outline>
      <Text my={2} fontSize={0}>
        or
      </Text>
      <Text my={2}>
        Issue manually using your own agent, such as{" "}
        <a href="https://veramo.io/" target="_blank">
          Veramo
        </a>
        . Example VC for this schema:
      </Text>
      <HighlightedJson json={exampleVc} />
    </Box>
  );
};

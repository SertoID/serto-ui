import React, { useState } from "react";
import styled from "styled-components";
import { Link, Flex, Box, Text, Button } from "rimble-ui";
import { LinkIcon, Send } from "@rimble/icons";
import { SchemaDataResponse, SchemaDataInput } from "./types";
import { H5 } from "../../layouts/LayoutComponents";
import { fonts } from "../../../themes";
import { CopyableTruncatableText } from "../../elements/CopyableTruncatableText/CopyableTruncatableText";
import { HighlightedJson } from "../../elements/HighlightedJson/HighlightedJson";
import { Tabs } from "../../layouts/Tabs/Tabs";
import { ModalContent, ModalWithX } from "../../elements/Modals";
import { PopupGroup } from "../../elements/Popup/Popup";
import { getLdTypesFromSchemaResponse, getSchemaUris } from "./utils";

const StyledTabs = styled(Tabs)`
  li:first-child {
    margin-left: 0;
  }
  li:last-child {
    margin-right: 0;
  }
`;

const StyledLink: React.FC<any> = (props) => <Link fontSize={2} fontWeight={2} {...props} />;

export interface SchemaUsageProps {
  schema: SchemaDataResponse | SchemaDataInput;
  style?: any;
}

export const SchemaUsage: React.FunctionComponent<SchemaUsageProps> = (props) => {
  const { schema } = props;
  const [urlTab, setUrlTab] = useState("jsonLd");
  const [issueTab, setIssueTab] = useState("sertoAgent");
  const [infoModalOpen, setInfoModalOpen] = useState(false);
  const [privateBetaModalOpen, setPrivateBetaModalOpen] = useState(false);
  const [exampleVcModalOpen, setExampleVcModalOpen] = useState(false);

  const uris = getSchemaUris(schema);

  const { subjectLdType, credLdType } = getLdTypesFromSchemaResponse(schema);
  // @TODO/tobek Need a more elegant way to do this, probably VcSchema library should have a utility that creates an example VC that actually has all the fields filled in based on schema.
  const exampleVc = {
    "@context": ["https://www.w3.org/2018/credentials/v1", ...(uris?.jsonLdContext ? [uris.jsonLdContext] : [])],
    ...(uris?.jsonSchema && {
      credentialSchema: {
        id: uris.jsonSchema,
        type: "JsonSchemaValidator2018",
      },
    }),
    type: ["VerifiableCredential", ...(credLdType ? [credLdType] : [])],
    issuer: "[ISSUER]",
    issuanceDate: "[DATE]",
    credentialSubject: {
      ...(subjectLdType ? { type: subjectLdType } : {}),
      id: "[SUBJECT]",
      "...": "...",
    },
  };

  return (
    <Box fontFamily={fonts.sansSerif} style={props.style}>
      <PopupGroup>
        <H5 mt={1} mb={2}>
          <Flex alignItems="center">
            <LinkIcon size="20px" />
            <Box ml={1}>Schema URLs</Box>
          </Flex>
        </H5>
        <StyledTabs
          activeTabName={urlTab}
          onTabClicked={(tabName) => setUrlTab(tabName)}
          titleFontSize={1}
          tabs={[
            {
              tabName: "jsonLd",
              title: "JSON-LD Context",
              content: (
                <Box mt={3} mb={2}>
                  <CopyableTruncatableText
                    fontFamily={fonts.monospace}
                    fontSize={0}
                    size="20px"
                    fontWeight={2}
                    text={uris?.jsonLdContext || "[none]"}
                    linkOutHref={!!uris?.jsonLdContext}
                  />
                  <StyledLink display="inline-block" fontSize={0} mt={2} onClick={() => setInfoModalOpen(true)}>
                    Learn more about JSON-LD Context
                  </StyledLink>
                </Box>
              ),
            },
            {
              tabName: "jsonSchema",
              title: "JSON Schema",
              content: (
                <Box mt={3} mb={2}>
                  <CopyableTruncatableText
                    fontFamily={fonts.monospace}
                    fontSize={0}
                    size="20px"
                    fontWeight={2}
                    text={uris?.jsonSchema || "[none]"}
                    linkOutHref={!!uris?.jsonSchema}
                  />
                  <StyledLink display="inline-block" fontSize={0} mt={2} onClick={() => setInfoModalOpen(true)}>
                    Learn more about JSON Schema
                  </StyledLink>
                </Box>
              ),
            },
          ]}
        />
      </PopupGroup>

      <PopupGroup>
        <H5 mt={1} mb={2}>
          <Flex alignItems="center">
            <Send size="18px" />
            <Box ml={1}>Issue Verifiable Credentials</Box>
          </Flex>
        </H5>

        <StyledTabs
          activeTabName={issueTab}
          onTabClicked={(tabName) => setIssueTab(tabName)}
          titleFontSize={1}
          tabs={[
            {
              tabName: "sertoAgent",
              title: "Use Serto Agent",
              content: (
                <Box mt={3} mb={2}>
                  <Text fontSize={0} my={2}>
                    Use Serto Agent, our user-friendly admin tool, to issue VCs.
                  </Text>
                  <Button.Outline size="small" width="100%" onClick={() => setPrivateBetaModalOpen(true)}>
                    <Send size="15px" mr={2} />
                    Issue VC with Serto Agent
                  </Button.Outline>
                </Box>
              ),
            },
            {
              tabName: "manual",
              title: "Manually",
              content: (
                <Box mt={3} mb={2}>
                  <Text fontSize={0} my={2}>
                    Use your own agent, like{" "}
                    <StyledLink fontSize={0} href="https://veramo.io/" target="_blank">
                      Veramo
                    </StyledLink>
                    , to issue VCs manually.
                  </Text>
                  <Button.Outline size="small" width="100%" onClick={() => setExampleVcModalOpen(true)}>
                    View example VC for this schema
                  </Button.Outline>
                </Box>
              ),
            },
          ]}
        />
      </PopupGroup>

      <ModalWithX isOpen={infoModalOpen} close={() => setInfoModalOpen(false)} width={9}>
        <ModalContent onClick={(e: Event) => e.stopPropagation()}>
          <Text my={3}>
            <b>JSON-LD contexts</b> (
            <StyledLink href="https://w3c.github.io/json-ld-syntax/#the-context" target="_blank">
              specification
            </StyledLink>
            ) are JSON data that define data relationships and semantics, and can leverage property and entity types on
            schema repositories such as{" "}
            <StyledLink href="https://schema.org" target="_Blank">
              schema.org
            </StyledLink>
            .
          </Text>
          <Text my={3}>
            For more details on using JSON-LD contexts in VCs, see{" "}
            <StyledLink href="https://www.w3.org/TR/vc-data-model/#contexts" target="_blank">
              the contexts section of the VC spec
            </StyledLink>
            .
          </Text>
          <Text my={3}>
            <b>JSON Schema</b> (
            <StyledLink href="https://json-schema.org/" target="_blank">
              specification
            </StyledLink>
            ) schemas are also JSON data, but define data structure, requirements, descriptions and other metadata,
            thereby supporting validation of VCs to ensure conformance.
          </Text>
          <Text my={3}>
            For more details on using JSON Schemas in VCs, see{" "}
            <StyledLink href="https://www.w3.org/TR/vc-data-model/#data-schemas" target="_blank">
              the <code>credentialSchema</code> field in the VC spec
            </StyledLink>
            .
          </Text>
          <Text my={3}></Text>
        </ModalContent>
      </ModalWithX>

      <ModalWithX isOpen={privateBetaModalOpen} close={() => setPrivateBetaModalOpen(false)} width={9}>
        <ModalContent onClick={(e: Event) => e.stopPropagation()}>
          <Text my={3}>
            {/*@TODO/tobek Update with link to Serto Agent when launched*/}
            Serto Agent is still in private beta. Please{" "}
            <StyledLink href="https://www.serto.id/contact" target="_blank">
              get in touch
            </StyledLink>{" "}
            if you would like to try it out!
          </Text>
        </ModalContent>
      </ModalWithX>

      <ModalWithX isOpen={exampleVcModalOpen} close={() => setExampleVcModalOpen(false)} width={10}>
        <ModalContent onClick={(e: Event) => e.stopPropagation()}>
          <HighlightedJson json={exampleVc} />
        </ModalContent>
      </ModalWithX>
    </Box>
  );
};

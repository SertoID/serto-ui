import React from "react";
import { storiesOf } from "@storybook/react";
import { Box, Flex, Card, Text, Heading, Flash, Button, Tooltip } from "rimble-ui";
import styled from "styled-components";
import Editor from "react-simple-code-editor";
import Prism from "prismjs";
import "prismjs/components/prism-json";
import { useDebounce } from "use-debounce";

import { fonts } from "../../themes/fonts";
import { VcSchema } from "./VcSchema";
import { EXAMPLE_SCHEMAS, EXAMPLE_VCS } from "./examples";

const Section = styled(Flex)`
  flex-direction: column;
  width: 50%;
  height: 48vh;
`;
const CodeWrap = styled(Card)`
  background: #fdfdfd;
  flex-grow: 1;
  overflow: auto;
  padding: 16px;
  margin: 0 8px 8px 0;
  font-size: 12px;
  font-family: ${fonts.monospace};

  pre {
    margin: 0;
  }

  .token.property {
    color: #905;
  }
  .token.string {
    color: #07a;
  }
  .token.punctuation {
    color: #999;
  }
  .token.boolean,
  .token.number {
    color: #690;
  }
  .token.operator {
    color: #9a6e3a;
  }
  .token.comment {
    color: slategray;
  }
`;

storiesOf("Schemas", module).add("Definition Demo", () => {
  const [inputSchema, setInputSchema] = React.useState<string>("");
  const [debouncedSchema] = useDebounce(inputSchema, 500);
  const [inputSchemaError, setInputSchemaError] = React.useState<any>();
  const [vcSchema, setVcSchema] = React.useState<VcSchema | undefined>();

  const [inputVc, setInputVc] = React.useState<string>("");
  const [debouncedVc] = useDebounce(inputVc, 500);
  const [inputVcValid, setInputVcValid] = React.useState<boolean | null | undefined>();
  const [inputVcValidityMessage, setInputVcValidityMessage] = React.useState<string | undefined>();

  const [outputContextHtml, setOutputContextHtml] = React.useState<string>("");
  const [outputJsonSchemaHtml, setOutputJsonSchemaHtml] = React.useState<string>("");

  React.useEffect(() => {
    setInputSchemaError(undefined);
    if (!debouncedSchema) {
      setVcSchema(undefined);
      return;
    }
    try {
      setVcSchema(new VcSchema(debouncedSchema, "example-schema", true));
    } catch (err) {
      setInputSchemaError(err.message);
    }
  }, [debouncedSchema]);

  React.useEffect(() => {
    if (vcSchema) {
      setOutputContextHtml(Prism.highlight(vcSchema.getJsonLdContextString(true), Prism.languages.json, "json"));
      setOutputJsonSchemaHtml(Prism.highlight(vcSchema.getJsonSchemaString(true), Prism.languages.json, "json"));
    } else {
      setOutputContextHtml("");
      setOutputJsonSchemaHtml("");
    }
  }, [vcSchema]);

  React.useEffect(() => {
    if (vcSchema && debouncedVc) {
      (async function () {
        vcSchema.validateVc(debouncedVc, (isValid, message) => {
          setInputVcValid(isValid);
          setInputVcValidityMessage(message);
        });
      })();
    } else {
      setInputVcValid(undefined);
    }
  }, [vcSchema, debouncedVc]);

  return (
    <Box>
      <Text fontSize={1} style={{ textAlign: "center" }}>
        Examples:{" "}
        <select
          onChange={(event: any) => {
            const name = event.target.value;
            if (name) {
              setInputSchema(EXAMPLE_SCHEMAS[name]);
            }
            if (EXAMPLE_VCS[name]) {
              setInputVc(EXAMPLE_VCS[name]);
            }
          }}
        >
          <option value=""></option>
          {Object.keys(EXAMPLE_SCHEMAS).map((key) => (
            <option key={key} value={key}>
              {key}
            </option>
          ))}
        </select>
      </Text>
      <Flex>
        <Section>
          <Flex justifyContent="space-between" pr={2}>
            <Heading.h5 my={2}>@context+ input</Heading.h5>
          </Flex>
          <CodeWrap>
            <Editor
              value={inputSchema}
              onValueChange={setInputSchema}
              highlight={(code) => Prism.highlight(inputSchema, Prism.languages.json, "json")}
              style={{ minHeight: "100%" }}
            />
          </CodeWrap>
          {inputSchemaError && <Flash variant="danger">Error: {inputSchemaError}</Flash>}
        </Section>
        <Section>
          <Flex justifyContent="space-between" pr={2}>
            <Heading.h5 my={2}>VC input for validation</Heading.h5>
            <Text my={2} fontSize={1}>
              playground @context will automatically be appended
            </Text>
          </Flex>
          <CodeWrap>
            <Editor
              value={inputVc}
              onValueChange={setInputVc}
              highlight={(code) => Prism.highlight(inputVc, Prism.languages.json, "json")}
              style={{ minHeight: "100%" }}
            />
          </CodeWrap>
          {typeof inputVcValid !== "undefined" && (
            <Flash variant={inputVcValid ? "success" : inputVcValid === null ? "warning" : "danger"}>
              <Text fontSize={1} style={{ wordBreak: "break-word", float: "left", display: "inline-block" }}>
                {inputVcValidityMessage}
              </Text>
              <Tooltip placement="top" message="@context output below left will be added to the VC sent to the tool">
                <Text fontSize={1} style={{ float: "right", display: "inline-block" }}>
                  Open in{" "}
                  <Button.Outline size="small" onClick={() => vcSchema?.openGoogleJsonLdValidatorPage(inputVc)}>
                    Google JSON-LD Tool
                  </Button.Outline>
                  <Button.Outline size="small" ml={2} onClick={() => vcSchema?.openJsonLdPlaygroundPage(inputVc)}>
                    JSON-LD Playground
                  </Button.Outline>
                </Text>
              </Tooltip>
            </Flash>
          )}
        </Section>
      </Flex>
      <Flex>
        <Section>
          <Heading.h5 my={2}>JSON-LD @context output</Heading.h5>
          <CodeWrap style={{ background: "#f8f8f8" }}>
            <pre>
              <code dangerouslySetInnerHTML={{ __html: outputContextHtml }}></code>
            </pre>
          </CodeWrap>
        </Section>
        <Section>
          <Heading.h5 my={2}>JSON Schema output</Heading.h5>
          <CodeWrap style={{ background: "#f8f8f8" }}>
            <pre>
              <code dangerouslySetInnerHTML={{ __html: outputJsonSchemaHtml }}></code>
            </pre>
          </CodeWrap>
          {vcSchema?.jsonSchemaMessage && <Flash variant="warning">{vcSchema.jsonSchemaMessage}</Flash>}
        </Section>
      </Flex>
    </Box>
  );
});

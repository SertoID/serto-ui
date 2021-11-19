import React from "react";
import { Box, Flex, Text, Flash, Button, Tooltip } from "rimble-ui";
import { VcSchema, EXAMPLE_SCHEMAS, EXAMPLE_VCS } from "vc-schema-tools";
import styled from "styled-components";
import Editor from "react-simple-code-editor";
import Prism from "prismjs";
import "prismjs/components/prism-json";
import { useDebounce } from "use-debounce";

import { H5 } from "../../layouts";
import { HighlightedJson, PrismHighlightedCodeWrap } from "../../elements/HighlightedJson/HighlightedJson";

const Pane = styled(Flex)`
  flex-direction: column;
  width: 50%;
  height: 94vh;
`;
const Section = styled(Flex)`
  flex-direction: column;
  height: 50%;
`;

export const SchemaPlayground: React.FunctionComponent = () => {
  const [inputSchema, setInputSchema] = React.useState<string>("");
  const [debouncedSchema] = useDebounce(inputSchema, 500);
  const [inputSchemaError, setInputSchemaError] = React.useState<any>();
  const [vcSchema, setVcSchema] = React.useState<VcSchema | undefined>();

  const [inputVc, setInputVc] = React.useState<string>("");
  const [debouncedVc] = useDebounce(inputVc, 500);
  const [inputVcValid, setInputVcValid] = React.useState<boolean | null | undefined>();
  const [inputVcValidityMessage, setInputVcValidityMessage] = React.useState<string | undefined>();

  const [outputContext, setOutputContext] = React.useState<string>("");

  React.useEffect(() => {
    setInputSchemaError(undefined);
    if (!debouncedSchema) {
      setVcSchema(undefined);
      return;
    }
    try {
      setVcSchema(new VcSchema(debouncedSchema, true));
    } catch (err) {
      setInputSchemaError(err.message);
    }
  }, [debouncedSchema]);

  React.useEffect(() => {
    setOutputContext(vcSchema ? vcSchema.getJsonLdContextString(true) : "");
  }, [vcSchema]);

  React.useEffect(() => {
    if (vcSchema && debouncedVc) {
      (async function () {
        const { isValid, message } = await vcSchema.validateVc(debouncedVc);
        setInputVcValid(isValid);
        setInputVcValidityMessage(message);
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
              setInputSchema(JSON.stringify(EXAMPLE_SCHEMAS[name], null, 2));
            }
            if (EXAMPLE_VCS[name]) {
              setInputVc(JSON.stringify(EXAMPLE_VCS[name], null, 2));
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
        <Pane>
          <H5 my={2}>JSON Schema input</H5>
          <PrismHighlightedCodeWrap style={{ background: "#fdfdfd" }}>
            <Editor
              value={inputSchema}
              onValueChange={setInputSchema}
              highlight={() => Prism.highlight(inputSchema, Prism.languages.json, "json")}
              style={{ minHeight: "100%" }}
            />
          </PrismHighlightedCodeWrap>
          {inputSchemaError && <Flash variant="danger">Error: {inputSchemaError}</Flash>}
        </Pane>
        <Pane>
          <Section>
            <Flex justifyContent="space-between" pr={2}>
              <H5 my={2}>VC input for validation</H5>
              <Text my={2} fontSize={1}>
                playground @context will automatically be appended
              </Text>
            </Flex>
            <PrismHighlightedCodeWrap style={{ background: "#fdfdfd" }}>
              <Editor
                value={inputVc}
                onValueChange={setInputVc}
                highlight={() => Prism.highlight(inputVc, Prism.languages.json, "json")}
                style={{ minHeight: "100%" }}
              />
            </PrismHighlightedCodeWrap>
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
          <Section>
            <H5 my={2}>JSON-LD @context output</H5>
            <HighlightedJson json={outputContext} alreadyPrettified={true} />
          </Section>
        </Pane>
      </Flex>
    </Box>
  );
};

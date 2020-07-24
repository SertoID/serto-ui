import React from "react";
import { storiesOf } from "@storybook/react";
import { Box, Flex, Card, Heading, Flash } from "rimble-ui";
import styled from "styled-components";
import Editor from "react-simple-code-editor";
import Prism from "prismjs";
import "prismjs/components/prism-json";
import { useDebounce } from "use-debounce";

import { fonts } from "../../themes/fonts";
import { VcSchema } from "./VcSchema";

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

const initialSchema = `{
  "@context": [
    "https://www.w3.org/2018/credentials/v1",
    {
      "@version": 1.1,
      "ContentPublishCredential": "https://consensysidentity.com/schema/ContentPublishCredential",
      "publishedContent": {
        "@id": "https://consensysidentity.com/schema/ContentPublishCredential#publishedContent",
        "@type": "https://schema.org/Article"
      },
      "Article": {
        "@id": "https://schema.org/Article",
        "@context": {
          "versionId": {
            "@id": "https://consensysidentity.com/schema/ContentPublishCredential#versionId",
            "@type": "https://schema.org/Text"
          },
          "headline": "http://schema.org/headline",
          "url": "http://schema.org/url",
          "datePublished": "http://schema.org/datePublished",
          "publisher": "http://schema.org/publisher",
          "author": "http://schema.org/author"
        }
      },
      "Person": {
        "@id": "http://schema.org/Person",
        "@context": {
          "name": "http://schema.org/name"
        }
      },
      "Organization": {
        "@id": "http://schema.org/Organization",
        "@context": {
          "name": "http://schema.org/name",
          "url": "http://schema.org/url"
        }
      }
    }
  ]
}`;

// @TODO/tobek Include @context or add note that @context is assumed by default if not present.
const initialVc = `{
  "@context": [
    "https://www.w3.org/2018/credentials/v1",
    "https://consensysidentity.com/schema/ContentPublishCredential"
  ],
  "id": "did:example:publisher-did#credential-id",
  "type": ["VerifiableCredential", "ContentPublishCredential"],
  "issuer": "did:example:publisher-did",
  "issuanceDate": "2017-12-05T14:27:42Z",
  "credentialSubject": {
    "id": "did:example:publisher-did",
    "publishedContent": {
      "type": "Article",
      "id": "did:example:publisher-did#article-id",
      "versionId": "did:example:publisher-did#article-version-id",
      "headline": "A Very Important Article",
      "url": "https://example-publisher.com/articles/a-very-important-article",
      "datePublished": "2020-06-29T00:04:12.418Z",
      "publisher": {
        "type": "Organization",
        "id": "did:example:publisher-did",
        "name": "Example Publisher",
        "url": "https://example-publisher.com/"
      },
      "author": {
        "type":"Person",
        "id": "did:example:publisher-did#author-id",
        "name": "Joe Reporter"
      }
    }
  }
}`;

storiesOf("Schemas", module).add("Definition Demo", () => {
  const [inputSchema, setInputSchema] = React.useState<string>(initialSchema);
  const [debouncedSchema] = useDebounce(inputSchema, 500);
  const [inputSchemaError, setInputSchemaError] = React.useState<any>();
  const [vcSchema, setVcSchema] = React.useState<VcSchema | undefined>();

  const [inputVc, setInputVc] = React.useState<string>(initialVc);
  const [debouncedVc] = useDebounce(inputVc, 500);
  const [inputVcValid, setInputVcValid] = React.useState<boolean | undefined>();
  const [inputVcValidityMessage, setInputVcValidityMessage] = React.useState<string | undefined>();

  const [outputContextHtml, setOutputContextHtml] = React.useState<string>("");
  const [outputJsonSchemaHtml, setOutputJsonSchemaHtml] = React.useState<string>("");

  React.useEffect(() => {
    try {
      setVcSchema(new VcSchema(inputSchema));
      setInputSchemaError(undefined);
    } catch (err) {
      setInputSchemaError(err.message);
    }
  }, [debouncedSchema]);

  React.useEffect(() => {
    if (vcSchema) {
      setOutputContextHtml(Prism.highlight(vcSchema.getJsonLdContext(true), Prism.languages.json, "json"));
      setOutputJsonSchemaHtml(Prism.highlight(vcSchema.getJsonSchema(true), Prism.languages.json, "json"));
    }
  }, [vcSchema]);

  React.useEffect(() => {
    if (vcSchema && debouncedVc) {
      vcSchema.validateVc(debouncedVc, (isValid, invalidity) => {
        setInputVcValid(isValid);
        setInputVcValidityMessage(invalidity);
      });
    } else {
      setInputVcValid(undefined);
    }
  }, [vcSchema, debouncedVc]);

  return (
    <Box>
      <Flex>
        <Section>
          <Heading.h5 my={2}>@context+ input</Heading.h5>
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
          <Heading.h5 my={2}>VC input for validation</Heading.h5>
          <CodeWrap>
            <Editor
              value={inputVc}
              onValueChange={setInputVc}
              highlight={(code) => Prism.highlight(inputVc, Prism.languages.json, "json")}
              style={{ minHeight: "100%" }}
            />
          </CodeWrap>
          {typeof inputVcValid !== "undefined" && (
            <Flash variant={inputVcValid ? "success" : "warning"}>
              {inputVcValid ? "VC is valid according to schema" : "VC is invalid: " + inputVcValidityMessage}
            </Flash>
          )}
        </Section>
      </Flex>
      <Flex>
        <Section>
          <Heading.h5 my={2}>JSON-LD @context output</Heading.h5>
          <CodeWrap>
            <pre>
              <code dangerouslySetInnerHTML={{ __html: outputContextHtml }}></code>
            </pre>
          </CodeWrap>
        </Section>
        <Section>
          <Heading.h5 my={2}>JSON Schema output</Heading.h5>
          <CodeWrap>
            <pre>
              <code dangerouslySetInnerHTML={{ __html: outputJsonSchemaHtml }}></code>
            </pre>
          </CodeWrap>
        </Section>
      </Flex>
    </Box>
  );
});

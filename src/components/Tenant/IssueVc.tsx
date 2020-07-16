import React, { useState, useContext } from "react";
import styled from "styled-components";
import { mutate } from "swr";
import { Check } from "@rimble/icons";
import { Text, Heading, Flex, Card, Box, Input, Field, Button, Checkbox, Flash } from "rimble-ui";
import { Credential, CredentialViewTypes, colors } from "../elements";
import { TrustAgencyService } from "../../services/TrustAgencyService";
import { TrustAgencyContext } from "../../context/TrustAgentProvider";

// @TODO/tobek Dumb hardcoded stuff for now
interface Schema {
  icon: string;
  name: string;
  fields?: string[];
}
const SCHEMAS: { [key: string]: Schema } = {
  GENERIC: {
    icon: "➕",
    name: "New",
  },
  NEWS_ARTICLE: {
    icon: "📰",
    name: "News Article",
    fields: ["Subject ID", "Article Title", "Description", "URL", "Author", "Keywords", "Image URL"],
  },
  CONTENT_RATING: {
    icon: "✨",
    name: "Content Rating",
    fields: ["Article UUID", "Content Score"],
  },
  KYC: {
    icon: "📇",
    name: "KYC Check",
  },
  DIPLOMA: {
    icon: "🎓",
    name: "Diploma",
  },
  AGE: {
    icon: "🎂",
    name: "Age Verification",
  },
};

const SchemaChoiceCard = styled(Card)``;
const SchemaChoiceBox = styled(Box)`
  &:hover ${SchemaChoiceCard} {
    border-color: #5952ff;
  }
  cursor: pointer;
`;

const SchemaChoice: React.FunctionComponent<{ schema: Schema; onClick?(): void }> = (props) => (
  <SchemaChoiceBox width="32%" mb={4} onClick={props.onClick}>
    <SchemaChoiceCard p={4} m="auto" width="120px" height="120px" textAlign="center">
      <Text p={2} width="72px" bg={colors.nearWhite} style={{ borderRadius: "50%" }} fontSize={5}>
        {props.schema.icon}
      </Text>
    </SchemaChoiceCard>
    <Text>{props.schema.name}</Text>
  </SchemaChoiceBox>
);

export interface IssueVcProps {
  defaultIssuer: string;
  onComplete(): void;
}

export const IssueVc: React.FunctionComponent<IssueVcProps> = (props) => {
  const TrustAgent = useContext<TrustAgencyService>(TrustAgencyContext);

  const credential = {
    "@context": ["https://www.w3.org/2018/credentials/v1", "https://www.w3.org/2018/credentials/examples/v1"],
    // "id": "uuid:9110652b-3676-4720-8139-9163b244680d", // @TODO Should the API generate this?
    type: ["VerifiableCredential"],
    issuer: { id: props.defaultIssuer },
    issuanceDate: Date.now() / 1000, // @TODO VC spec expects RFC3339 (ISO 8601) format as produced by `(new Date).toISOString()`, but API throws TypeError `not a unix timestamp in seconds` so sending unix timestamp in seconds for now - check if API transforms date or what.
    credentialSubject: {
      id: props.defaultIssuer,
      foo: {
        bar: 123,
        baz: true,
      },
    },
  };

  const [status, setStatus] = React.useState<string | undefined>();
  const [response, setResponse] = React.useState<any>();
  const [body, setBody] = useState(JSON.stringify(credential, null, 2));
  const [revocable, setRevocable] = useState<boolean>(false);
  const [keepCopy, setKeepCopy] = useState<boolean>(true);
  const [success, setSuccess] = useState<boolean>(false);
  const [schema, setSchema] = useState<Schema | undefined>();

  async function issueVc() {
    if (schema !== SCHEMAS.GENERIC) {
      setStatus("Non-generic VC issuance not yet supported");
      return;
    }

    setStatus(undefined);
    try {
      const credential = JSON.parse(body);
      const response = await TrustAgent.issueVc({
        credential,
        revocable,
        keepCopy,
        save: "true",
        proofFormat: "jwt",
      });
      console.log("issued VC, response:", response);
      mutate("/v1/tenant/agent/dataStoreORMGetVerifiableCredentials");
      setResponse(response);
      setSuccess(true);
    } catch (err) {
      console.error("failed to issue VC:", err);
      setStatus("Failed to issue VC: " + err.message);
      return;
    }
  }

  function goBack() {
    setSchema(undefined);
    setStatus(undefined);
  }

  if (success && schema) {
    return (
      <>
        <Text textAlign="center" color={colors.success.base}>
          <Text
            bg={colors.success.light}
            borderRadius="50%"
            p={2}
            width="50px"
            height="50px"
            fontSize={4}
            style={{ display: "inline-block" }}
          >
            <Check />
          </Text>
          <Heading as="h3">Credential Issued</Heading>
        </Text>
        <Credential
          attributes={response.credentialSubject}
          credentialType={response.type[response.type.length - 1]}
          issuanceDate={response.issuanceDate}
          issuer={response.issuer.id}
          jwt={response.jwt}
          title={response.credentialSubject.title || "Generic Credential"}
          viewType={CredentialViewTypes.COLLAPSIBLE}
        />
        <Box my={2}>
          <Button width="100%" onClick={props.onComplete}>
            Done
          </Button>
        </Box>
      </>
    );
  }

  if (!schema) {
    return (
      <>
        <Heading as="h3">Issue Credential</Heading>
        <Text>Choose Schema</Text>
        <Flex width="380px" my={2} style={{ flexWrap: "wrap", justifyContent: "space-between" }}>
          {Object.keys(SCHEMAS).map((key) => (
            <SchemaChoice key={key} schema={SCHEMAS[key]} onClick={() => setSchema(SCHEMAS[key])} />
          ))}
        </Flex>
      </>
    );
  }

  return (
    <>
      <Button.Text
        icononly
        icon="ArrowBack"
        position="absolute"
        top={0}
        left={0}
        mt={3}
        ml={3}
        onClick={() => goBack()}
      />
      <Heading as="h3" mt={4}>
        Issue {schema.name} Credential
      </Heading>
      {schema === SCHEMAS.GENERIC ? (
        <Field label="Credential body JSON" width="100%">
          {/*@NOTE Rimble Textarea component doesn't work - uses <input> instead of <textarea> element*/}
          <textarea
            required
            value={body}
            spellCheck={false}
            style={{ width: "100%", minHeight: "250px" }}
            onChange={(e: any) => setBody(e.target.value)}
          />
        </Field>
      ) : (
        <>
          {/*@TODO/tobek Hardcoded non-functional fields just for demo - generic version above still works but this doesn't work, use WP plugin instead!*/}
          {(schema.fields || ["Value"]).map((field) => (
            <Field key={field} label={field} width="100%">
              <Input type="text" required={true} width="100%" />
            </Field>
          ))}
        </>
      )}

      <Checkbox label="Revocable" checked={revocable} onChange={() => setRevocable(!revocable)} />
      <Checkbox label="Keep Copy" checked={keepCopy} onChange={() => setKeepCopy(!keepCopy)} />

      <Box my={10}>
        <Button width="100%" onClick={issueVc}>
          Issue Credential
        </Button>
      </Box>

      {status && (
        <Box p={1} mb={1}>
          <Flash my={3} variant="danger">
            {status}
          </Flash>
        </Box>
      )}
    </>
  );
};

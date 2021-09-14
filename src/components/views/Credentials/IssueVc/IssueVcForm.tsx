import React, { useState } from "react";
import { Tooltip, Flex, Box, Button, Checkbox, Field, Flash, Form, Input, Loader } from "rimble-ui";
import { mutate } from "swr";
import { JsonSchemaNode, VcSchema } from "vc-schema-tools";
import { ModalBack, ModalContent, ModalHeader } from "../../../elements/Modals";
import { Identifier } from "../../../../types";
import { DidSelect } from "../../../elements/DidSelect";
import { IssueVcFormInput } from "./IssueVcFormInput";
import { SertoUiContext, SertoUiContextInterface } from "../../../../context/SertoUiContext";
import { SchemaDataInput } from "../../Schemas";

export interface IssueVcFormProps {
  schema: SchemaDataInput | null;
  identifiers?: Identifier[];
  subjectIdentifier?: Identifier;
  onSuccessResponse(response: any): void;
  onVcDataChange?(vcData: any): void;
  goBack?(): void;
}

export const IssueVcForm: React.FunctionComponent<IssueVcFormProps> = (props) => {
  const { schema, subjectIdentifier, onSuccessResponse, onVcDataChange, goBack } = props;

  const context = React.useContext<SertoUiContextInterface>(SertoUiContext);
  let identifiers = props.identifiers || context.userDids;
  if (!identifiers?.[0]) {
    console.error(
      "Could not get user DIDs: no `identifiers` prop supplied and no `userDids` property has been supplied to SertoUiContext via SertoUiProvider",
    );
    identifiers = [];
  }

  const initialCred = {
    "@context": ["https://www.w3.org/2018/credentials/v1"],
    // "id": "uuid:9110652b-3676-4720-8139-9163b244680d", // @TODO Should the API generate this?
    type: ["VerifiableCredential"],
    issuer: { id: identifiers[0]?.did },
    issuanceDate: new Date().toISOString(),
    credentialSubject: {
      id: subjectIdentifier?.did || identifiers[0]?.did,
      exampleData: {
        foo: 123,
        bar: true,
      },
    },
  };

  const [loading, setLoading] = React.useState(false);
  const [issueAndSend, setIssueAndSend] = React.useState(false);
  const [subjectSupportsMessaging, setSubjectSupportsMessaging] = React.useState(false);
  const [error, setError] = useState<string | undefined>();
  const [vcData, setVcData] = useState<{ [key: string]: any }>({});
  const [rawJsonVc, setRawJsonVc] = useState(JSON.stringify(initialCred, null, 2));
  const [issuer, setIssuer] = useState<string>(identifiers[0]?.did);
  const [revocable, setRevocable] = useState<boolean>(true);
  const [keepCopy, setKeepCopy] = useState<boolean>(true);

  const schemaInstance = React.useMemo(() => {
    if (schema) {
      try {
        setError("");
        return new VcSchema(schema.ldContextPlus);
      } catch (err) {
        console.error("Failed to generate schema instance:", err);
        setError(err.toString());
      }
    }
  }, [schema]);

  React.useEffect(() => {
    onVcDataChange?.(vcData);
  }, [onVcDataChange, vcData]);

  if (!context.issueVc) {
    console.error(
      "issueVc function not present in SertoUiContext. Make sure to supply this function to the context passed in to SertoUiProvider or else serto-ui library cannot issue a VC for you.",
    );
    return (
      <Flash my={3} variant="danger">
        Missing issue VC functionality
      </Flash>
    );
  }

  async function issueVc(e: Event) {
    e.preventDefault();

    setError(undefined);
    setLoading(true);

    try {
      let credential: any;
      if (schema) {
        if (!schemaInstance) {
          console.error("Can't issue VC: schema instance is undefined. Schema data:", schema);
          setError("Could not initialize schema instance");
          setLoading(false);
          return;
        }

        const credType = schemaInstance.schema["@context"]["@rootType"];

        let ldContext: string | any = schemaInstance.schema["@context"]["@metadata"]?.uris?.jsonLdContext;
        if (!ldContext) {
          console.warn("Could not find JSON-LD context URL - embedding entire context in VC");
          ldContext = schemaInstance.jsonLdContext["@context"];
        }

        const jsonSchemaUrl = schemaInstance.schema["@context"]["@metadata"]?.uris?.jsonSchema;
        if (!jsonSchemaUrl) {
          console.warn("Could not find JSON Schema URL - excluding `credentialSchema` property from VC");
        }

        credential = {
          ...initialCred,
          "@context": ["https://www.w3.org/2018/credentials/v1", ldContext],
          type: credType ? [...initialCred.type, credType] : initialCred.type,
          issuer: {
            id: issuer,
          },
          credentialSchema: jsonSchemaUrl && {
            id: jsonSchemaUrl,
            type: "JsonSchemaValidator2018",
          },
          credentialSubject: vcData,
        };
      } else {
        credential = JSON.parse(rawJsonVc);
      }

      onVcDataChange?.(credential);

      // @TODO/tobek Actually validate VC according to schema instance

      const issueResponse = await context.issueVc?.(credential, {
        revocable,
        keepCopy,
        save: "true",
        proofFormat: "jwt",
      });
      console.log("issued VC, response:", issueResponse);
      mutate("/v1/agent/dataStoreORMGetVerifiableCredentials");

      let sendResponse: any;
      if (issueAndSend) {
        const subject = issueResponse.credentialSubject?.id;
        if (!subject) {
          console.error("failed to send VC: VC has no credentialSubject.id", issueResponse);
          // @TODO/tobek Should go to issue success screen, but with this error
          setError(
            'Credential successfully issued, but sending credential to subject failed: credential does not contain "credentialSubject.id" property to send to.',
          );
          setLoading(false);
          return;
        }
        try {
          sendResponse = await context.sendVc?.(issuer, subject, issueResponse);
        } catch (err) {
          console.error("failed to send VC:", err);
          // @TODO/tobek Should go to issue success screen, but with this error
          setError("Credential successfully issued, but sending credential to subject failed: " + err.message);
          setLoading(false);
          return;
        }
        console.log("sent VC, response:", sendResponse);
      }

      onSuccessResponse({
        issueResponse,
        sendResponse,
      });
      setLoading(false);
    } catch (err) {
      console.error("failed to issue VC:", err);
      setError("Failed to issue VC: " + err.message);
      setLoading(false);
      return;
    }
  }

  const credSchema = schemaInstance?.jsonSchema?.properties?.credentialSubject;

  return (
    <>
      {goBack && <ModalBack onClick={goBack} />}
      <ModalHeader>Issue {schema?.name?.replace(/\s?Credential$/, "")} Credential</ModalHeader>
      <ModalContent>
        <Form onSubmit={issueVc}>
          {!credSchema?.properties ? (
            <Field label="Credential body JSON" width="100%">
              {/*@NOTE Rimble Textarea component doesn't work - uses <input> instead of <textarea> element*/}
              <textarea
                required
                value={rawJsonVc}
                spellCheck={false}
                style={{ width: "100%", minHeight: "250px" }}
                onChange={(e: any) => setRawJsonVc(e.target.value)}
              />
            </Field>
          ) : (
            <>
              <Field label="Issuance Date" width="100%">
                <Input type="datetime" disabled={true} value={new Date().toISOString()} width="100%" required={true} />
              </Field>
              <Field label="Issuer ID" width="100%">
                <DidSelect
                  onChange={setIssuer}
                  value={issuer}
                  identifiers={identifiers}
                  defaultSelectedDid={identifiers[0]?.did}
                  required={true}
                  ownDidsOnly={true}
                />
              </Field>
              {Object.entries(credSchema.properties).map(([key, node]: [string, JsonSchemaNode]) => (
                <IssueVcFormInput
                  key={key}
                  name={key}
                  node={node}
                  value={vcData[key]}
                  identifiers={identifiers || []}
                  defaultSubjectDid={key === "id" && node.format === "uri" ? subjectIdentifier?.did : undefined}
                  required={credSchema?.required?.indexOf(key) !== -1}
                  onChange={(value) => setVcData({ ...vcData, [key]: value })}
                  subjectSupportsMessaging={subjectSupportsMessaging}
                  setSubjectSupportsMessaging={setSubjectSupportsMessaging}
                />
              ))}
            </>
          )}

          <Checkbox label="Revocable" checked={revocable} onChange={() => setRevocable(!revocable)} />
          <Checkbox label="Keep Copy" checked={keepCopy} onChange={() => setKeepCopy(!keepCopy)} />

          {error && (
            <Flash my={3} variant="danger">
              {error}
            </Flash>
          )}
          <Flex my={3} justifyContent="space-between">
            <Button.Outline type="submit" width="49%" disabled={loading} onClick={() => setIssueAndSend(false)}>
              {!issueAndSend && loading ? <Loader color="white" /> : "Issue & Save"}
            </Button.Outline>
            {context.sendVc && subjectSupportsMessaging ? (
              <Button type="submit" width="49%" disabled={loading} onClick={() => setIssueAndSend(true)}>
                {issueAndSend && loading ? <Loader color="white" /> : "Issue & Send"}
              </Button>
            ) : (
              <Tooltip
                placement="top"
                message={
                  context.sendVc
                    ? "The subject DID you selected does not support DIDComm messaging."
                    : "Missing send VC functionality"
                }
              >
                {/*Need to wrap in a Box otherwise disabled button prevents cursor from triggering tooltip*/}
                <Box width="49%">
                  <Button type="submit" width="100%" disabled>
                    Issue &amp; Send
                  </Button>
                </Box>
              </Tooltip>
            )}
          </Flex>
        </Form>
      </ModalContent>
    </>
  );
};

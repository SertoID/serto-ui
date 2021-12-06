import React, { useState } from "react";
import { Flex, Button, Field, Flash, Form, Input, Loader, Checkbox, Text } from "rimble-ui";
import { Warning } from "@rimble/icons";
import { mutate } from "swr";
import { JsonSchemaNode, VcSchema, VC } from "vc-schema-tools";
import { ModalBack, ModalContent, ModalContentFullWidth, ModalHeader } from "../../../elements/Modals";
import { Identifier } from "../../../../types";
import { DidSelect } from "../../../elements/DidSelect";
import { IssueVcFormInput } from "./IssueVcFormInput";
import { SertoUiContext, SertoUiContextInterface } from "../../../../context/SertoUiContext";
import { SchemaDataInput } from "../../Schemas";
import { IssueVcSuccess } from "./IssueVcSuccess";
import { Credential } from "../Credential";
import { H4 } from "../../../layouts/LayoutComponents";
import { colors } from "../../../../themes";

const STEPS = ["FORM", "REVIEW", "ISSUED"];

function buildCredential(
  schemaInstance: VcSchema,
  initialCred: Partial<VC>,
  issuer: string,
  vcData: { [key: string]: any },
): Partial<VC> {
  const credType = schemaInstance.jsonSchema.$linkedData?.term;

  let ldContext: string | any = schemaInstance.jsonSchema.$metadata?.uris?.jsonLdContext;
  if (!ldContext) {
    console.warn("Could not find JSON-LD context URL - embedding entire context in VC");
    ldContext = schemaInstance.jsonLdContext?.["@context"];
  }

  const jsonSchemaUrl = schemaInstance.jsonSchema.$metadata?.uris?.jsonSchema;
  if (!jsonSchemaUrl) {
    console.warn("Could not find JSON Schema URL - excluding `credentialSchema` property from VC");
  }

  return {
    ...initialCred,
    "@context": ["https://www.w3.org/2018/credentials/v1", ldContext],
    type: credType ? [...(initialCred.type || []), credType] : initialCred.type,
    issuer: {
      id: issuer,
    },
    credentialSchema: jsonSchemaUrl
      ? {
          id: jsonSchemaUrl,
          type: "JsonSchemaValidator2018",
        }
      : undefined,
    credentialSubject: vcData,
  };
}

export interface IssueVcFormProps {
  schema: SchemaDataInput | null;
  identifiers?: Identifier[];
  subjectIdentifier?: Identifier;
  onComplete(): void;
  onVcDataChange?(vcData: any): void;
  goBack?(): void;
}

export const IssueVcForm: React.FunctionComponent<IssueVcFormProps> = (props) => {
  const { schema, subjectIdentifier, onComplete, onVcDataChange } = props;

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

  const [step, setStep] = React.useState(STEPS[0]);
  const [loading, setLoading] = React.useState(false);
  const [vcToIssue, setVcToIssue] = useState<VC | undefined>();
  const [issuedVc, setIssuedVc] = useState<VC | undefined>();
  const [issueAndSend, setIssueAndSend] = React.useState(false);
  const [subjectSupportsMessaging, setSubjectSupportsMessaging] = React.useState(false);
  const [error, setError] = useState<string | undefined>();
  const [messagingError, setMessagingError] = useState<string | undefined>();
  const [vcData, setVcData] = useState<{ [key: string]: any }>({});
  const [rawJsonVc, setRawJsonVc] = useState(JSON.stringify(initialCred, null, 2));
  const [issuer, setIssuer] = useState<string>(identifiers[0]?.did);

  const schemaInstance = React.useMemo(() => {
    if (schema) {
      try {
        setError("");
        return new VcSchema(schema.jsonSchema);
      } catch (err) {
        console.error("Failed to generate schema instance:", err);
        setError(err.toString());
      }
    }
  }, [schema]);
  const credSchema = schemaInstance?.jsonSchema?.properties?.credentialSubject;

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

  function createVc(e: Event) {
    e.preventDefault();
    setError(undefined);
    try {
      let credential: any;
      if (schema) {
        if (!schemaInstance) {
          console.error("Can't issue VC: schema instance is undefined. Schema data:", schema);
          setError("Could not initialize schema instance");
          return;
        }
        credential = buildCredential(schemaInstance, initialCred, issuer, vcData);
      } else {
        credential = JSON.parse(rawJsonVc);
      }

      // @TODO/tobek Actually validate VC according to schema instance

      onVcDataChange?.(credential);
      setVcToIssue(credential);
      setStep(STEPS[1]);
    } catch (err) {
      console.error("failed to create VC:", err);
      setError("Failed to create VC: " + err.message);
      return;
    }
  }

  async function issueVc(e: Event) {
    e.preventDefault();

    setError(undefined);
    setLoading(true);

    try {
      const issueResponse = await context.issueVc?.(vcToIssue, {
        revocable: false,
        keepCopy: true,
        save: "true",
        proofFormat: "jwt",
      });
      console.log("issued VC, response:", issueResponse);
      mutate("/v1/agent/dataStoreORMGetVerifiableCredentials");
      setIssuedVc(issueResponse);

      if (issueAndSend) {
        const subject = issueResponse.credentialSubject?.id;
        if (!subject) {
          console.error("failed to send VC: VC has no credentialSubject.id", issueResponse);
          setMessagingError(
            'Sending credential to subject failed: credential does not contain "credentialSubject.id" property to send to.',
          );
        } else if (!context.sendVc) {
          console.error("serto-ui context missing sendVc", context);
          setMessagingError("This Serto instance is missing the ability to send VCs via DIDComm.");
        } else {
          try {
            const sendResponse = await context.sendVc(issuer, subject, issueResponse);
            console.log("sent VC, response:", sendResponse);

            // We're done - no need to show final share step.
            context.toastProvider.addMessage("Credential issued & sent", {
              colorTheme: "light",
              variant: "success",
            });
            onComplete();
            return;
          } catch (err) {
            console.error("failed to send VC:", err);
            setMessagingError("Sending credential to subject failed: " + err.message);
          }
        }
      }

      context.toastProvider.addMessage("Credential issued", {
        colorTheme: "light",
        variant: "success",
      });

      setLoading(false);
      setStep(STEPS[2]);
    } catch (err) {
      console.error("failed to issue VC:", err);
      setError("Failed to issue VC: " + err.message);
      setLoading(false);
      return;
    }
  }

  const showBackButton = !!props.goBack || step !== STEPS[0];
  function goBack() {
    if (step === STEPS[0] && props.goBack) {
      props.goBack();
    } else if (step !== STEPS[0]) {
      setStep(STEPS[STEPS.indexOf(step) - 1]);
    }
  }

  if (step === STEPS[2] && issuedVc) {
    return (
      <ModalContentFullWidth>
        <IssueVcSuccess vc={issuedVc} onComplete={onComplete} messagingError={messagingError} />
      </ModalContentFullWidth>
    );
  }

  if (step === STEPS[1] && vcToIssue) {
    return (
      <>
        {showBackButton && <ModalBack onClick={goBack} />}
        <ModalHeader>Issue {schema?.name?.replace(/\s?Credential$/, "")} Credential</ModalHeader>
        <ModalContent width={9}>
          <Credential vc={vcToIssue} isOpen={true} />

          {schema && (
            <>
              <H4 mt={5} mb={3}>
                Recipient Information
              </H4>
              {!subjectSupportsMessaging && (
                <Flash my={3} variant="warning">
                  <Flex>
                    <Warning color={colors.warning.dark} />
                    <Text ml={2} fontSize={1}>
                      {vcToIssue.credentialSubject?.id ? (
                        <>
                          The credential subject DID you selected (
                          <code style={{ wordBreak: "break-word" }}>{vcToIssue.credentialSubject.id}</code>) does not
                          support receiving credentials.
                        </>
                      ) : (
                        "Your credential doesn't have a subject DID to automatically send the issued credential to."
                      )}{" "}
                      You may send it via link, QR code, or email after issuing the credential.
                    </Text>
                  </Flex>
                </Flash>
              )}
              <Checkbox
                label="Recipient same as credential subject"
                checked={issueAndSend}
                onChange={() => setIssueAndSend(!issueAndSend)}
                disabled={!subjectSupportsMessaging}
              />
            </>
          )}
          {/* If there's no schema, then there's no VC wizard form, just the generic VC JSON textarea, so there's no DidSearch component checking for messaging support. We could in theory fire off a check for messaging support here, but not worth building that right now: the JSON input is a power user/edge case feature, and they can still go ahead to the post-issue step and send via DIDComm or whatever from there. */}

          {error && (
            <Flash my={3} variant="danger">
              {error}
            </Flash>
          )}
          <Button mt={5} type="submit" width="100%" disabled={loading} onClick={issueVc}>
            {loading ? <Loader color="white" /> : "Issue Credential"}
          </Button>
        </ModalContent>
      </>
    );
  }

  return (
    <>
      {showBackButton && <ModalBack onClick={goBack} />}
      <ModalHeader>Issue {schema?.name?.replace(/\s?Credential$/, "")} Credential</ModalHeader>
      <ModalContent>
        <Form onSubmit={createVc}>
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
                  required={credSchema?.required?.includes(key)}
                  onChange={(value) => setVcData({ ...vcData, [key]: value })}
                  subjectSupportsMessaging={subjectSupportsMessaging}
                  setSubjectSupportsMessaging={setSubjectSupportsMessaging}
                />
              ))}
            </>
          )}

          {error && (
            <Flash my={3} variant="danger">
              {error}
            </Flash>
          )}
          <Flex my={3} justifyContent="space-between">
            <Button type="submit" width="100%">
              Review Credential
            </Button>
          </Flex>
        </Form>
      </ModalContent>
    </>
  );
};

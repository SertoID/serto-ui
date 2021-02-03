import React, { useState } from "react";
import { Box, Button, Checkbox, Field, Flash, Form, Input, Loader } from "rimble-ui";
import { mutate } from "swr";
import { JsonSchemaNode, VcSchema } from "vc-schema-tools";
import { ModalContent, ModalHeader } from "../../../elements/Modals";
import { Identifier } from "../../../../types";
import { DidSelect } from "../../../elements/DidSelect";
import { IssueVcFormInput } from "./IssueVcFormInput";
import { SertoUiContext, SertoUiContextInterface } from "../../../../context/SertoUiContext";
import { SchemaDataResponse } from "../../Schemas";

export interface IssueVcFormProps {
  schema: SchemaDataResponse | null;
  identifiers: Identifier[];
  subjectIdentifier?: Identifier;
  onSuccessResponse(response: any): void;
  onVcDataChange?(vcData: any): void;
}

export const IssueVcForm: React.FunctionComponent<IssueVcFormProps> = (props) => {
  const { schema, identifiers, subjectIdentifier, onSuccessResponse, onVcDataChange } = props;

  const initialCred = {
    "@context": ["https://www.w3.org/2018/credentials/v1"],
    // "id": "uuid:9110652b-3676-4720-8139-9163b244680d", // @TODO Should the API generate this?
    type: ["VerifiableCredential"],
    issuer: { id: identifiers[0].did },
    issuanceDate: new Date().toISOString(),
    credentialSubject: {
      id: subjectIdentifier?.did || identifiers[0].did,
      exampleData: {
        foo: 123,
        bar: true,
      },
    },
  };

  const [loading, setLoading] = React.useState(false);
  const [error, setError] = useState<string | undefined>();
  const [vcData, setVcData] = useState<{ [key: string]: any }>({});
  const [rawJsonVc, setRawJsonVc] = useState(JSON.stringify(initialCred, null, 2));
  const [issuer, setIssuer] = useState<string>(identifiers[0].did);
  const [revocable, setRevocable] = useState<boolean>(true);
  const [keepCopy, setKeepCopy] = useState<boolean>(true);

  const context = React.useContext<SertoUiContextInterface>(SertoUiContext);

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

  async function issueVc(e: Event) {
    e.preventDefault();

    if (!schemaInstance) {
      console.error("Can't issue VC: schema instance is undefined. Schema data:", schema);
      setError("Could not initialize schema instance");
      return;
    }
    setError(undefined);
    setLoading(true);

    const credType = schemaInstance.schema["@context"]["@rootType"];

    let ldContext: string | any = schemaInstance.schema["@context"]["@metadata"]?.uris?.jsonLdContext;
    if (!ldContext) {
      console.warn("Could not find JSON-LD context URL - embedding entire context in VC");
      ldContext = schemaInstance.jsonLdContext;
    }

    const jsonSchemaUrl = schemaInstance.schema["@context"]["@metadata"]?.uris?.jsonSchema;
    if (!jsonSchemaUrl) {
      console.warn("Could not find JSON Schema URL - excluding `credentialSchema` property from VC");
    }

    try {
      let credential: any;
      if (schema) {
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

      const vcResponse = await context.issueVc({
        credential,
        revocable,
        keepCopy,
        save: "true",
        proofFormat: "jwt",
      });
      console.log("issued VC, response:", vcResponse);
      mutate("/v1/tenant/agent/dataStoreORMGetVerifiableCredentials");

      onSuccessResponse(vcResponse);
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
              <Field label="Issuer ID" width="100%" mb={0}>
                <DidSelect
                  onChange={setIssuer}
                  value={issuer}
                  identifiers={identifiers}
                  defaultSelectedDid={identifiers[0].did}
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
                  identifiers={identifiers}
                  defaultSubjectDid={key === "id" && node.format === "uri" ? subjectIdentifier?.did : undefined}
                  required={credSchema?.required?.indexOf(key) !== -1}
                  onChange={(value) => setVcData({ ...vcData, [key]: value })}
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
          <Box my={3}>
            <Button type="submit" width="100%" disabled={loading}>
              {loading ? <Loader color="white" /> : "Issue Credential"}
            </Button>
          </Box>
        </Form>
      </ModalContent>
    </>
  );
};

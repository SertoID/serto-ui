import React, { useContext, useState } from "react";
import { Box, Button, Checkbox, Field, Flash, Form, Input, Text, Loader } from "rimble-ui";
import { mutate } from "swr";
import { TrustAgencyContext } from "../../../context/TrustAgentProvider";
import { TrustAgencyService } from "../../../services/TrustAgencyService";
import { ModalContent, ModalHeader } from "../../elements/components/Modals";
import { SchemaDataResponse, VcSchema } from "../../elements/components/Schemas";
import { JsonSchemaNode } from "../../elements/components/Schemas/VcSchema";
import { getSchemaUrl } from "../../elements/components/Schemas/utils";
import { FeatureFlag } from "../../elements/components/FeatureFlag/FeatureFlag";
import { featureFlags } from "../../../constants";
import { Identifier } from "../../../types";
import { DidSelect } from "../../elements/components/DidSelect";
import { IssueVcFormInput } from "./IssueVcFormInput";

export interface IssueVcFormProps {
  schema: SchemaDataResponse | null;
  identifiers: Identifier[];
  onSuccessResponse(response: any, publishedToFeed?: string): void;
  onVcDataChange?(vcData: any): void;
}

export const IssueVcForm: React.FunctionComponent<IssueVcFormProps> = (props) => {
  const initialCred = {
    "@context": ["https://www.w3.org/2018/credentials/v1"],
    // "id": "uuid:9110652b-3676-4720-8139-9163b244680d", // @TODO Should the API generate this?
    type: ["VerifiableCredential"],
    issuer: { id: props.identifiers[0].did },
    issuanceDate: new Date().toISOString(),
    credentialSubject: {
      id: props.identifiers[0].did,
      exampleData: {
        foo: 123,
        bar: true,
      },
    },
  };

  const TrustAgent = useContext<TrustAgencyService>(TrustAgencyContext);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = useState<string | undefined>();
  const [vcData, setVcData] = useState<{ [key: string]: any }>({});
  const [rawJsonVc, setRawJsonVc] = useState(JSON.stringify(initialCred, null, 2));
  const [issuer, setIssuer] = useState<string>(props.identifiers[0].did);
  const [publishToFeedSlug, setPublishToFeedSlug] = useState<string | undefined>();
  const [revocable, setRevocable] = useState<boolean>(true);
  const [keepCopy, setKeepCopy] = useState<boolean>(true);

  const schemaInstance = React.useMemo(() => {
    if (props.schema) {
      try {
        setError("");
        return new VcSchema(props.schema.ldContextPlus, props.schema.slug);
      } catch (err) {
        console.error("Failed to generate schema instance:", err);
        setError(err.toString());
      }
    }
  }, [props.schema]);

  React.useEffect(() => {
    props.onVcDataChange?.(vcData);
  }, [props.onVcDataChange, vcData]);

  async function issueVc(e: Event) {
    e.preventDefault();
    setError(undefined);
    setLoading(true);

    const credType = schemaInstance?.schema["@context"]["@rootType"];

    try {
      let credential: any;
      if (props.schema) {
        credential = {
          ...initialCred,
          "@context": ["https://www.w3.org/2018/credentials/v1", getSchemaUrl(props.schema.slug, "ld-context")],
          type: credType ? [...initialCred.type, credType] : initialCred.type,
          issuer: {
            id: issuer,
          },
          credentialSchema: {
            id: getSchemaUrl(props.schema.slug, "json-schema"),
            type: "JsonSchemaValidator2018",
          },
          credentialSubject: vcData,
        };
      } else {
        credential = JSON.parse(rawJsonVc);
      }

      props.onVcDataChange?.(credential);

      // @TODO/tobek Actually validate VC according to schema instance

      const vcResponse = await TrustAgent.issueVc({
        credential,
        revocable,
        keepCopy,
        save: "true",
        proofFormat: "jwt",
      });
      console.log("issued VC, response:", vcResponse);
      mutate("/v1/tenant/agent/dataStoreORMGetVerifiableCredentials");

      if (publishToFeedSlug) {
        try {
          const feedResponse = await TrustAgent.getFeedBySlug(publishToFeedSlug);
          const publishResponse = await TrustAgent.publishToFeed(vcResponse, feedResponse.id);
          console.log("posted VC to global tweets feed, response:", publishResponse);
        } catch (publishErr) {
          console.error("failed to publish VC to feed:", publishErr);
          setError("VC issued successfully but failed to publish VC to feed: " + publishErr.message);
          setLoading(false);
          return;
        }
      }

      props.onSuccessResponse(vcResponse, publishToFeedSlug);
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
      <ModalHeader>Issue {props.schema?.name?.replace(/\s?Credential$/, "")} Credential</ModalHeader>
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
                  defaultSelectFirst={true}
                  required={true}
                  ownDidsOnly={true}
                />
              </Field>
              {Object.entries(credSchema.properties).map(([key, node]: [string, JsonSchemaNode]) => (
                <Field key={key} label={node.title || key} width="100%">
                  {node.description ? <Text fontSize={1}>{node.description}</Text> : <></>}
                  <IssueVcFormInput
                    key={key}
                    name={key}
                    node={node}
                    value={vcData[key]}
                    required={credSchema?.required?.indexOf(key) !== -1}
                    onChange={(value) => setVcData({ ...vcData, [key]: value })}
                  />
                </Field>
              ))}
            </>
          )}

          <FeatureFlag feature={featureFlags.VC_WIP}>
            <hr />
            <Field label={"Publish to Feed"} width="100%">
              <Input
                type="text"
                width="100%"
                required={false}
                placeholder="Feed slug"
                value={publishToFeedSlug}
                onChange={(event: any) => setPublishToFeedSlug(event.target.value)}
              />
            </Field>
            <Checkbox label="Revocable" checked={revocable} onChange={() => setRevocable(!revocable)} />
            <Checkbox label="Keep Copy" checked={keepCopy} onChange={() => setKeepCopy(!keepCopy)} />
          </FeatureFlag>

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

import React, { useContext, useState } from "react";
import { Box, Button, Checkbox, Field, Flash, Form, Input, Text } from "rimble-ui";
import { mutate } from "swr";
import { TrustAgencyContext } from "../../../context/TrustAgentProvider";
import { TrustAgencyService } from "../../../services/TrustAgencyService";
import { ModalContent, ModalHeader } from "../../elements/components/Modals";
import { SchemaDataResponse, VcSchema } from "../../elements/components/Schemas";
import { JsonSchemaNode } from "../../elements/components/Schemas/VcSchema";
import { getSchemaUrl } from "../../elements/components/Schemas/utils";

export interface IssueVcFormProps {
  schema: SchemaDataResponse | null;
  defaultIssuer: string;
  onSuccessResponse(response: any, publishedToFeed?: string): void;
  onVcDataChange?(vcData: any): void;
}

export const IssueVcForm: React.FunctionComponent<IssueVcFormProps> = (props) => {
  const initialCred = {
    "@context": ["https://www.w3.org/2018/credentials/v1"],
    // "id": "uuid:9110652b-3676-4720-8139-9163b244680d", // @TODO Should the API generate this?
    type: ["VerifiableCredential"],
    issuer: { id: props.defaultIssuer },
    issuanceDate: Date.now() / 1000, // @TODO VC spec expects RFC3339 (ISO 8601) format as produced by `(new Date).toISOString()`, but API throws TypeError `not a unix timestamp in seconds` so sending unix timestamp in seconds for now - check if API transforms date or what.
    credentialSubject: {
      id: props.defaultIssuer,
      exampleData: {
        foo: 123,
        bar: true,
      },
    },
  };

  const TrustAgent = useContext<TrustAgencyService>(TrustAgencyContext);
  const [error, setError] = useState<string | undefined>();
  const [vcData, setVcData] = useState<{ [key: string]: any }>({});
  const [rawJsonVc, setRawJsonVc] = useState(JSON.stringify(initialCred, null, 2));
  const [publishToFeedSlug, setPublishToFeedSlug] = useState<string | undefined>();
  const [revocable, setRevocable] = useState<boolean>(false);
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

    const credType = schemaInstance?.schema["@context"]["@rootType"];

    try {
      let credential: any;
      if (props.schema) {
        credential = {
          ...initialCred,
          "@context": ["https://www.w3.org/2018/credentials/v1", getSchemaUrl(props.schema.slug, "ld-context")],
          type: credType ? [...initialCred.type, credType] : initialCred.type,
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
          return;
        }
      }

      props.onSuccessResponse(vcResponse, publishToFeedSlug);
    } catch (err) {
      console.error("failed to issue VC:", err);
      setError("Failed to issue VC: " + err.message);
      return;
    }
  }

  const credSchema = schemaInstance?.jsonSchema?.properties?.credentialSubject;

  function renderInput(key: string, node: JsonSchemaNode): JSX.Element {
    const required = credSchema?.required?.indexOf(key) !== -1;

    if (node.type === "boolean") {
      return (
        <Checkbox
          checked={!!vcData[key]}
          required={required}
          onChange={() => setVcData({ ...vcData, [key]: !vcData[key] })}
        />
      );
    }

    let type = "text";
    let disabled = false;
    let placeholder = "";
    let width: string | undefined = "100%";
    if (node.type === "object") {
      disabled = true;
      placeholder = "[nested properties not yet supported]";
    } else if (node.type === "number" || node.type === "integer") {
      type = "number";
      width = undefined;
    } else if (node.format === "date-time") {
      type = "datetime-local";
    } else if (node.format === "uri") {
      type = "url";
      placeholder = "URL";
    }

    return (
      <Input
        type={type}
        disabled={disabled}
        value={vcData[key] || ""}
        onChange={(event: any) =>
          setVcData({ ...vcData, [key]: type === "number" ? parseInt(event.target.value, 10) : event.target.value })
        }
        required={required}
        width={width}
        placeholder={placeholder}
      />
    );
  }

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
              {Object.entries(credSchema.properties).map(([key, node]: [string, JsonSchemaNode]) => (
                <Field key={key} label={node.title || key} width="100%">
                  {node.description ? <Text fontSize={1}>{node.description}</Text> : <></>}
                  {renderInput(key, node)}
                </Field>
              ))}
            </>
          )}

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

          {error && (
            <Flash my={3} variant="danger">
              {error}
            </Flash>
          )}
          <Box my={3}>
            <Button type="submit" width="100%">
              Issue Credential
            </Button>
          </Box>
        </Form>
      </ModalContent>
    </>
  );
};

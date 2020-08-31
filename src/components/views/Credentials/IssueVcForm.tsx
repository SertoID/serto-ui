import React, { useContext, useState } from "react";
import { Box, Button, Checkbox, Field, Flash, Heading, Input } from "rimble-ui";
import { mutate } from "swr";
import { TrustAgencyContext } from "../../../context/TrustAgentProvider";
import { TrustAgencyService } from "../../../services/TrustAgencyService";
import { SchemaDataResponse } from "../../elements/components/Schemas";

export interface IssueVcFormProps {
  schema: SchemaDataResponse | null;
  defaultIssuer: string;
  onSuccessResponse(response: any, publishedToFeed?: string): void;
}

export const IssueVcForm: React.FunctionComponent<IssueVcFormProps> = (props) => {
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

  const [error, setError] = React.useState<string | undefined>();
  const [body, setBody] = useState(JSON.stringify(credential, null, 2));
  const [publishToFeedSlug, setPublishToFeedSlug] = React.useState<string | undefined>();
  const [revocable, setRevocable] = useState<boolean>(false);
  const [keepCopy, setKeepCopy] = useState<boolean>(true);

  const { schema } = props;

  async function issueVc() {
    if (schema) {
      setError("Non-generic VC issuance not yet supported");
      return;
    }

    setError(undefined);
    try {
      const credential = JSON.parse(body);
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

  return (
    <>
      <Heading as="h3" mt={4}>
        Issue {schema?.name} Credential
      </Heading>
      {!schema ? (
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
          {["Subject ID", "Article Title", "Description", "URL", "Author", "Keywords", "Image URL"].map((field) => (
            <Field key={field} label={field} width="100%">
              <Input type="text" required={true} width="100%" />
            </Field>
          ))}
        </>
      )}

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

      <Box my={10}>
        <Button width="100%" onClick={issueVc}>
          Issue Credential
        </Button>
      </Box>

      {error && (
        <Flash my={3} variant="danger">
          {error}
        </Flash>
      )}
    </>
  );
};

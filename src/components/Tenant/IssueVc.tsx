import React, { useState, useContext } from "react";
import { Heading, Box, Field, Button, Checkbox } from "rimble-ui";
import { TrustAgencyService } from "../../services/TrustAgencyService";
import { TrustAgencyContext } from "../../context/TrustAgentProvider";

export interface IssueVcProps {
  defaultIssuer: string;
}

export const IssueVc: React.FunctionComponent<IssueVcProps> = props => {
  const TrustAgent = useContext<TrustAgencyService>(TrustAgencyContext);

  const credential = {
    "@context": [
        "https://www.w3.org/2018/credentials/v1",
        "https://www.w3.org/2018/credentials/examples/v1"
    ],
    // "id": "uuid:9110652b-3676-4720-8139-9163b244680d", // @TODO Should the API generate this?
    "type": [
        "VerifiableCredential"
    ],
    "issuer": props.defaultIssuer,
    "issuanceDate": Date.now() / 1000, // @TODO VC spec expects RFC3339 (ISO 8601) format as produced by `(new Date).toISOString()`, but API throws TypeError `not a unix timestamp in seconds` so sending unix timestamp in seconds for now - check if API transforms date or what.
    "credentialSubject": {
        "id": props.defaultIssuer,
        "foo": {
            "bar": 123,
            "baz": true,
        }
    }
  };

  const [status, setStatus] = React.useState<string | undefined>();
  const [body, setBody] = useState(JSON.stringify(credential, null, 2))
  const [revocable, setRevocable] = useState<boolean>(false);
  const [keepCopy, setKeepCopy] = useState<boolean>(true);

  async function issueVc() {
    try {
      const credential = JSON.parse(body);
      const response = await TrustAgent.issueVc({
        credential,
        revocable,
        keepCopy,
        "proofFormat": "jwt",
      });
      setStatus(`Success. JWT:\n\n${response.jwt}`);
    } catch (err) {
      console.error("failed to issue VC:", err);
      setStatus("Failed to issue VC: " + err.message);
      return;
    }
  }

  return (
    <Box border="1px solid #E0E0E0" width={[1]} my={10} p={10}>
      <Heading as={"h3"}>Issue VC</Heading>
      <Field label="Credential body JSON" width={1}>
        {/*@NOTE Rimble Textarea component doesn't work - uses <input> instead of <textarea> element*/}
        <textarea
          required
          value={body}
          style={{ width: "100%", minHeight: "250px" }}
          onChange={(e: any) => setBody(e.target.value)}
        />
      </Field>

      <Checkbox label="Revocable" checked={revocable} onChange={() => setRevocable(!revocable)} />
      <Checkbox label="Keep Copy" checked={keepCopy} onChange={() => setKeepCopy(!keepCopy)} />

      <Box my={10}>
        <Button onClick={issueVc}>Issue</Button>
      </Box>

      <pre style={{ whiteSpace: "pre-wrap", wordBreak: "break-word" }}>{status}</pre>
    </Box>
  );
};

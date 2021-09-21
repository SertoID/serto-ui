import { useContext, useState, useEffect } from "react";
import { Box, Button, Flex, Form, Flash, Loader } from "rimble-ui";
import { Send } from "@rimble/icons";
import { VC } from "vc-schema-tools";
import { DidSearchWithMessagingInfo } from "../../../elements/DidSearchWithMessagingInfo";
import { SertoUiContext, SertoUiContextInterface } from "../../../../context/SertoUiContext";

export interface ShareViaDidCommProps {
  vc: VC;
}

export const ShareViaDidComm: React.FunctionComponent<ShareViaDidCommProps> = (props) => {
  const { vc } = props;
  const context = useContext<SertoUiContextInterface>(SertoUiContext);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [recipientDid, setRecipientDid] = useState("");
  const [recipientSupportsMessaging, setRecipientSupportsMessaging] = useState(false);

  useEffect(() => {
    setError("");
  }, [recipientDid, recipientSupportsMessaging]);

  async function sendVc(e: Event) {
    e.preventDefault();
    if (!recipientDid || !recipientSupportsMessaging) {
      return;
    }
    if (!context.sendVc) {
      console.error("serto-ui context missing sendVc", context);
      setError("This Serto instance is missing the ability to send VCs via DIDComm.");
      return;
    }

    setError("");
    setLoading(true);
    setSuccess(false);

    try {
      let senderDid = typeof vc.issuer === "string" ? vc.issuer : vc.issuer.id;
      const senderDidBelongsToUser = context.userDids?.some((did) => did.did === senderDid);
      if (!senderDidBelongsToUser) {
        if (!context.userDids?.[0]) {
          throw Error(
            `VC issuer DID ${senderDid} does not belong to user, and could not get any user DIDs to use as DIDComm sender`,
          );
        }

        // @TODO/tobek Is this the right behavior in this case?
        console.warn(
          `VC issuer ${senderDid} does not belong to user, sending VC from user's first DID instead`,
          context.userDids[0],
        );
        senderDid = context.userDids[0].did;
      }

      await context.sendVc(senderDid, recipientDid, vc);
    } catch (err) {
      console.error("failed to send VC:", err);
      setError("Failed to send credential to subject: " + err.message);
      setLoading(false);
      return;
    }

    setLoading(false);
    setSuccess(true);
  }

  return (
    <Form onSubmit={sendVc}>
      <Flex>
        <Box width="100%">
          <DidSearchWithMessagingInfo
            required
            onChange={(val) => setRecipientDid(val.did)}
            supportsMessaging={recipientSupportsMessaging}
            setSupportsMessaging={setRecipientSupportsMessaging}
            messagingUnsupportedText="This DID does not support receiving credentials via DIDComm."
          />
        </Box>
        <Button type="submit" disabled={!recipientDid || !recipientSupportsMessaging} ml={2}>
          <Flex alignItems="center">
            {loading ? (
              <Loader color="white" />
            ) : (
              <>
                <Send size="24px" mr={2} /> Send
              </>
            )}
          </Flex>
        </Button>
      </Flex>
      {recipientDid && error && (
        <Flash mt={3} variant="danger">
          {error}
        </Flash>
      )}
      {recipientDid && success && (
        <Flash mt={3} variant="success">
          Credential sent successfully.
        </Flash>
      )}
    </Form>
  );
};

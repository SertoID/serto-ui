import * as React from "react";
import { Box, Button, Text } from "rimble-ui";
import { Check, Warning } from "@rimble/icons";
import { VC } from "vc-schema-tools";
import { colors } from "../../../../themes";
import { H3 } from "../../../layouts/LayoutComponents";
import { CredentialShare } from "../CredentialShare";

export interface IssueVcSuccessProps {
  vc: VC;
  messagingError?: string;
  onComplete(): void;
}

export const IssueVcSuccess: React.FunctionComponent<IssueVcSuccessProps> = (props) => {
  const { onComplete, vc, messagingError } = props;
  return (
    <>
      <Text textAlign="center" color={colors.success.base}>
        <Text
          bg={messagingError ? colors.warning.dark : colors.success.light}
          borderRadius="50%"
          p={2}
          width="50px"
          height="50px"
          fontSize={4}
          style={{ display: "inline-block" }}
        >
          {messagingError ? <Warning /> : <Check />}
        </Text>
        <H3>{messagingError ? "Failed to Send Credential" : "Credential Issued"}</H3>
        {messagingError && (
          <>
            <p>
              Your credential has been created, but we were unable to send it to {vc.credentialSubject.id}:{" "}
              {messagingError}.
            </p>
            <p>Please try a different sending via method.</p>
          </>
        )}
      </Text>
      <CredentialShare vc={vc} />
      <Box my={2}>
        <Button.Text width="100%" onClick={onComplete}>
          Skip for now
        </Button.Text>
      </Box>
    </>
  );
};

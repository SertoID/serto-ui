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
    <Box maxWidth={9}>
      <Text textAlign="center">
        {messagingError ? (
          <>
            <Warning size={64} color={colors.warning.base} />
          </>
        ) : (
          <>
            <Text
              bg={colors.success.light}
              borderRadius="50%"
              p={2}
              width="50px"
              height="50px"
              fontSize={4}
              style={{ display: "inline-block" }}
            >
              <Check color={colors.success.base} />
            </Text>
          </>
        )}

        <H3 mt={2} mb={2} color={messagingError ? colors.warning.dark : colors.success.base}>
          {messagingError ? "Failed to Send Credential" : "Credential Issued"}
        </H3>
        {messagingError && (
          <>
            <p>
              Your credential has been created, but we were unable to send it to <code>{vc.credentialSubject.id}</code>.{" "}
              {messagingError}.
            </p>
            <p>Please try a different sending via method.</p>
          </>
        )}
      </Text>
      <Box mt={4}>
        <CredentialShare vc={vc} issueVcFlow={true} />
      </Box>
      <Box mt={2}>
        <Button.Text width="100%" onClick={onComplete}>
          Skip for now
        </Button.Text>
      </Box>
    </Box>
  );
};

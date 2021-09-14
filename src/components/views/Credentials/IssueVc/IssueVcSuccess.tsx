import * as React from "react";
import { Box, Button, Text } from "rimble-ui";
import { Check } from "@rimble/icons";
import { VC } from "vc-schema-tools";
import { Credential, CredentialViewTypes } from "../Credential";
import { colors } from "../../../../themes";
import { H3 } from "../../../layouts/LayoutComponents";

export interface IssueVcSuccessProps {
  vc: VC;
  onComplete(): void;
}

export const IssueVcSuccess: React.FunctionComponent<IssueVcSuccessProps> = (props) => {
  const { onComplete, vc } = props;
  return (
    <>
      <Text textAlign="center" color={colors.success.base}>
        <Text
          bg={colors.success.light}
          borderRadius="50%"
          p={2}
          width="50px"
          height="50px"
          fontSize={4}
          style={{ display: "inline-block" }}
        >
          <Check />
        </Text>
        <H3>Credential Issued</H3>
      </Text>
      <Credential vc={vc} viewType={CredentialViewTypes.COLLAPSIBLE} />
      <Box my={2}>
        <Button width="100%" onClick={onComplete}>
          Done
        </Button>
      </Box>
    </>
  );
};

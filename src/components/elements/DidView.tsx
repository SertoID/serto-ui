import React from "react";
import { Box, Flex, Text } from "rimble-ui";
import { ellipsis } from "../../utils";
import { CopyToClipboard } from "./CopyToClipboard";
import { EthrDidLogo, SovrinDidLogo } from "./Icons";

export interface DidViewProps {
  color?: string;
  copy?: boolean;
  did: string;
  ellipsis?: boolean;
  fontSize?: string | number;
  fontWeight?: string | number;
  icon?: boolean;
}

export const DidView: React.FunctionComponent<DidViewProps> = (props) => {
  const { copy, did, icon } = props;

  return (
    <Flex>
      {icon && (
        <Box mr={1}>
          {did.includes("did:ethr") && <EthrDidLogo />}
          {did.includes("did:sov") && <SovrinDidLogo />}
        </Box>
      )}
      <Text color={props.color} fontSize={props.fontSize} fontWeight={props.fontWeight} lineHeight="solid" m={0}>
        {props.ellipsis ? ellipsis(did, 15, 5) : did}
      </Text>
      {copy && (
        <Box ml={2}>
          <CopyToClipboard color={props.color} hoverTitle="Copy DID" size="16px" text={did} />
        </Box>
      )}
    </Flex>
  );
};

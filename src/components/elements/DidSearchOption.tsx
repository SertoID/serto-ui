import styled from "styled-components";
import { Eth } from "@rimble/icons";
import { Box, Flex, Text } from "rimble-ui";
import { colors } from "../../themes";
import { hexEllipsis } from "../../utils";
import { H5 } from "../layouts";
import { DomainImage, SovrinDidLogo } from "../elements";

const DidSearchOptionStyled = styled(Box)`
  cursor: pointer;
  overflow: hidden;
  &:hover {
    background-color: ${colors.primary.border};
    color: ${colors.primary.base};
  }
`;

export interface DidSearchOptionProps {
  alias?: string;
  did: string;
  domain: string;
  imageUrl?: string;
  orgName?: string;
  onSelect(did: string): void;
}

export const DidSearchOption: React.FunctionComponent<DidSearchOptionProps> = (props) => {
  const { alias, did, domain, imageUrl, orgName, onSelect } = props;
  return (
    <Box borderTop={2}>
      <Box position="relative" pb={2} pl="50px" pr={3} pt={3}>
        {imageUrl ? (
          <img
            src={imageUrl}
            style={{ height: "24px", left: "16px", position: "absolute", top: "16px", width: "24px" }}
          />
        ) : (
          <Box height="16px" width="16px" position="absolute" left="18px" top="18px">
            <DomainImage domain={domain} />
          </Box>
        )}
        <H5 m={0}>{domain}</H5>
        <Text color={colors.midGray} fontSize={0}>
          {orgName}
        </Text>
      </Box>
      <DidSearchOptionDid alias={alias} did={did} onSelect={onSelect} />
    </Box>
  );
};

export interface DidSearchOptionDidProps {
  alias?: string;
  did: string;
  onSelect(did: string): void;
}

export const DidSearchOptionDid: React.FunctionComponent<DidSearchOptionDidProps> = (props) => {
  const { alias, did, onSelect } = props;
  return (
    <DidSearchOptionStyled pl="50px" onClick={() => onSelect(did)}>
      <Flex borderTop={2} pr={3} py={3}>
        <Box mr={1}>
          {did.includes("did:ethr") && <Eth size="16px" />}
          {did.includes("did:sov") && <SovrinDidLogo />}
        </Box>
        {alias ? (
          <Box>
            <Text color={colors.midGray} fontSize={1}>
              {alias}
            </Text>
            <Text color={colors.silver} fontSize={0} title={did}>
              {did.includes("did:web") ? did : hexEllipsis(did)}
            </Text>
          </Box>
        ) : (
          <Text color={colors.midGray} fontSize={1} title={did}>
            {did.includes("did:web") ? did : hexEllipsis(did)}
          </Text>
        )}
      </Flex>
    </DidSearchOptionStyled>
  );
};

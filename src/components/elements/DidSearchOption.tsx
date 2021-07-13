import styled from "styled-components";
import { CheckCircle, Warning } from "@rimble/icons";
import { Box, Flex, Text, Tooltip } from "rimble-ui";
import { baseColors, colors, fonts } from "../../themes";
import { SelectedDid } from "../../types";
import { hexEllipsis } from "../../utils";
import { H5 } from "../layouts";
import { DidMethodIcon, DomainImage } from "../elements";

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
  did: SelectedDid;
  domain: string;
  imageUrl?: string;
  orgName?: string;
  onSelect(did: SelectedDid): void;
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
  did: SelectedDid;
  onSelect(did: SelectedDid): void;
}

export const DidSearchOptionDid: React.FunctionComponent<DidSearchOptionDidProps> = (props) => {
  const { alias, did, onSelect } = props;
  return (
    <DidSearchOptionStyled pl="50px" onClick={() => onSelect(did)}>
      <Flex borderTop={2} justifyContent="space-between">
        <Flex alignItems="center" fontFamily={fonts.sansSerif} pr={3} py={3}>
          <Box mr={1}>
            <DidMethodIcon did={did.did} size="16px" />
          </Box>
          {alias ? (
            <>
              <Text color={colors.midGray} fontSize={1} fontWeight={3} mr={3}>
                {alias}
              </Text>
              <Text color={colors.midGray} fontSize={0} title={did.did}>
                {did.did.includes("did:web") ? did.did : hexEllipsis(did.did)}
              </Text>
            </>
          ) : (
            <Text color={colors.midGray} fontSize={0} title={did.did}>
              {did.did.includes("did:web") ? did.did : hexEllipsis(did.did)}
            </Text>
          )}
        </Flex>
        <Flex alignItems="center" background={baseColors.white} borderLeft={2} justifyContent="center" width="40px">
          {did.messagingSupported ? (
            <Tooltip placement="top" message="This DID can receive secure messages and credentials.">
              <CheckCircle color={colors.success.base} />
            </Tooltip>
          ) : (
            <Tooltip placement="top" message="This DID does not receive messages and credentials.">
              <Warning color={colors.warning.base} />
            </Tooltip>
          )}
        </Flex>
      </Flex>
    </DidSearchOptionStyled>
  );
};

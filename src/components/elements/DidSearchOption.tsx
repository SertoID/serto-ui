import styled from "styled-components";
import { CheckCircle, Warning } from "@rimble/icons";
import { Box, Flex, Text, Tooltip } from "rimble-ui";
import { baseColors, colors, fonts } from "../../themes";
import { SelectedDid } from "../../types";
import { H5 } from "../layouts";
import { DidMethodIcon, DomainImage } from "../elements";
import { DidTruncate } from "./DidTruncate";

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
  didDocs: any;
  domain: string;
  imageUrl?: string;
  orgName?: string;
  onSelect(value: SelectedDid): void;
}

export const DidSearchOption: React.FunctionComponent<DidSearchOptionProps> = (props) => {
  const { alias, didDocs, domain, imageUrl, orgName, onSelect } = props;
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
      {didDocs.map((didDoc: any, i: number) => {
        const parsedDidDoc = JSON.parse(didDoc);
        return (
          <DidSearchOptionDid
            alias={alias}
            did={parsedDidDoc.id}
            key={i}
            messagingSupported={parsedDidDoc.service?.length > 0}
            onSelect={onSelect}
          />
        );
      })}
    </Box>
  );
};

export interface DidSearchOptionDidProps {
  alias?: string;
  did: string;
  messagingSupported: boolean;
  onSelect(value: SelectedDid): void;
}

export const DidSearchOptionDid: React.FunctionComponent<DidSearchOptionDidProps> = (props) => {
  const { alias, did, messagingSupported, onSelect } = props;
  return (
    <DidSearchOptionStyled pl="50px" onClick={() => onSelect({did, messagingSupported})}>
      <Flex borderTop={2} justifyContent="space-between" maxWidth="100%">
        <Flex
          alignItems="center"
          fontFamily={fonts.sansSerif}
          maxWidth="calc(100% - 50px)"
          pl="26px"
          position="relative"
          py={3}
        >
          <Box left={0} position="absolute" top="21px">
            <DidMethodIcon did={did} size="16px" />
          </Box>
          {alias ? (
            <>
              <Text color={colors.midGray} fontSize={1} fontWeight={3} mr={2}>
                {alias}
              </Text>
              <Text color={colors.midGray} fontSize={0} maxWidth="calc(100% - 50px)" title={did}>
                <DidTruncate did={did} />
              </Text>
            </>
          ) : (
            <Text color={colors.midGray} fontSize={0} maxWidth="100%" title={did}>
              <DidTruncate did={did} />
            </Text>
          )}
        </Flex>
        <Flex alignItems="center" background={baseColors.white} borderLeft={2} justifyContent="center" width="40px">
          {messagingSupported ? (
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

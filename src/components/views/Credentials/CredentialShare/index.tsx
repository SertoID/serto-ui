import styled from "styled-components";
import { useState } from "react";
import { Box, Button, Text, Flex, Flash } from "rimble-ui";
import { ContentCopy } from "@rimble/icons";
import { VC } from "vc-schema-tools";
import { HoverPathFill, ShareIcon, UnstyledButton } from "../../../elements";
import { ModalContentFullWidth, ModalWithX } from "../../../elements/Modals";
import { H3, H6 } from "../../../layouts/LayoutComponents";
import { colors, fonts } from "../../../../themes";
import { config } from "../../../../config";
import { CopyableTruncatableText } from "../../../elements/CopyableTruncatableText/CopyableTruncatableText";
import { ShareViaDidComm } from "./ShareViaDidComm";
import { ShareViaQr } from "./ShareViaQr";
import { ShareViaSocial } from "./ShareViaSocial";

const _ShareBox: React.FC<{ className?: string }> = (props) => (
  <Box borderBottom={4} p={4} className={props.className}>
    {props.children}
  </Box>
);
const ShareBox = styled(_ShareBox)`
  &:first-child {
    padding-top: 0;
  }
  &:last-child {
    padding-bottom: 0;
    border-bottom: none;
  }
`;

export interface CredentialShareProps {
  vc: VC;
  issueVcFlow?: boolean;
}

export const CredentialShare: React.FC<CredentialShareProps> = (props) => {
  const { vc, issueVcFlow } = props;

  if (!vc.proof?.jwt) {
    return <Flash variant="danger">Cannot share VC: missing proof.jwt</Flash>;
  }

  const vcUrl = `${config.SEARCH_UI_URL}/vc-validator?vc=${vc.proof.jwt}`;
  return (
    <>
      <ShareBox>
        <H3 mt={0} mb={1}>
          {issueVcFlow ? "Recipient Information" : "Share Credential"}
        </H3>
        <Text color={colors.silver} fontFamily={fonts.sansSerif} fontSize={1}>
          Choose any methods below to send or share credential.
        </Text>
      </ShareBox>

      <ShareBox>
        <H6 mt={0} mb={2}>
          Send by Identifier (DID)
        </H6>
        <ShareViaDidComm vc={vc} />
      </ShareBox>

      <ShareBox>
        <H6 mt={0} mb={2}>
          Share by link
        </H6>
        <CopyableTruncatableText
          text={vcUrl}
          useInput
          copyButtonOverride={(copied) => (
            <Button>
              <Flex alignItems="center">
                <ContentCopy size="24px" mr={2} /> {copied ? "Copied" : "Copy"}
              </Flex>
            </Button>
          )}
        />
      </ShareBox>

      <ShareBox>
        <H6 mt={0} mb={3}>
          Share on social media
        </H6>
        <ShareViaSocial vc={vc} vcUrl={vcUrl} />
      </ShareBox>

      {issueVcFlow && (
        <ShareBox>
          <H6 mt={0} mb={3}>
            Share by QR code
          </H6>
          <ShareViaQr url={vcUrl} inline />
        </ShareBox>
      )}
    </>
  );
};

export const CredentialShareButton: React.FC<CredentialShareProps> = (props) => {
  const { vc } = props;
  const [modalOpen, setModalOpen] = useState(false);

  if (!vc.proof) {
    // VC has no JWT so can't initialize share component - it probably hasn't been isued yet
    return <></>;
  }

  return (
    <>
      {props.children || (
        <UnstyledButton onClick={() => setModalOpen(true)}>
          <HoverPathFill>
            <Box p={1}>
              <ShareIcon />
            </Box>
          </HoverPathFill>
        </UnstyledButton>
      )}

      <ModalWithX isOpen={modalOpen} close={() => setModalOpen(false)} width={9}>
        <ModalContentFullWidth>
          <CredentialShare vc={vc} />
        </ModalContentFullWidth>
        <Box p={3} />
      </ModalWithX>
    </>
  );
};

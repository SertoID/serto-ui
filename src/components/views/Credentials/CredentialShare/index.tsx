import { useState } from "react";
import { Box, Button, Text, Flex } from "rimble-ui";
import { ContentCopy } from "@rimble/icons";
import { VC } from "vc-schema-tools";
import { HoverPathFill, ShareIcon, UnstyledButton } from "../../../elements";
import { ModalContentFullWidth, ModalFooter, ModalWithX } from "../../../elements/Modals";
import { H3, H6 } from "../../../layouts/LayoutComponents";
import { colors, fonts } from "../../../../themes";
import { config } from "../../../../config";
import { CopyableTruncatableText } from "../../../elements/CopyableTruncatableText/CopyableTruncatableText";
import { ShareViaDidComm } from "./ShareViaDidComm";
import { ShareViaQr } from "./ShareViaQr";

export interface CredentialShareProps {
  vc: VC;
}

export const CredentialShare: React.FC<CredentialShareProps> = (props) => {
  const { vc } = props;
  const vcUrl = `${config.DEFAULT_SEARCH_UI_URL}/vc-validator?vc=${vc.proof.jwt}`;
  return (
    <>
      <Box borderBottom={4} p={4} pt={0}>
        <H3 mt={0} mb={1}>
          Recipient Information
        </H3>
        <Text color={colors.silver} fontFamily={fonts.sansSerif} fontSize={1}>
          Choose any methods below to send or share credential.
        </Text>
      </Box>

      <Box borderBottom={4} p={4}>
        <H6 mt={0} mb={2}>
          Send by Identifier (DID)
        </H6>
        <ShareViaDidComm vc={vc} />
      </Box>

      <Box borderBottom={4} p={4}>
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
      </Box>

      <Box p={4} pb={0}>
        <H6 mt={0} mb={3}>
          Share by QR code
        </H6>
        <ShareViaQr url={vcUrl} />
      </Box>
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
        <ModalFooter mt={3}>
          <Button width="100%" onClick={() => setModalOpen(false)}>
            Close
          </Button>
        </ModalFooter>
      </ModalWithX>
    </>
  );
};

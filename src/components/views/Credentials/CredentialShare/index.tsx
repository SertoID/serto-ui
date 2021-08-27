import { useEffect, useState, useCallback } from "react";
import styled from "styled-components";
import { Box, Button, Link, Text, Input, Flex, Form } from "rimble-ui";
import { Send, FileDownload, ContentCopy, OpenInNew } from "@rimble/icons";
import QRCode from "qrcode.react";
import { VC } from "vc-schema-tools";
import { ModalContentFullWidth, ModalFooter, ModalWithX } from "../../elements/Modals";
import { H3, H6 } from "../../layouts/LayoutComponents";
import { colors, fonts } from "../../../themes";
import { DidSearch } from "../../elements/DidSearch";
import { downloadCanvasImage, copyImageSupported, copyCanvasImage } from "../../../utils/helpers";
import { config } from "../../../config";
import { CopyableTruncatableText } from "../../elements/CopyableTruncatableText/CopyableTruncatableText";

const StyledQRCode = styled(QRCode)`
  max-width: 100%;
  height: auto !important;
`;

export interface CredentialShareProps {
  vc: VC;
}

export const CredentialShare: React.FC<CredentialShareProps> = (props) => {
  const { vc } = props;
  const [canvas, setCanvas] = useState<HTMLCanvasElement | undefined>();
  const [copied, setCopied] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [recipientDid, setRecipientDid] = useState("");
  const [recipientSupportsMessaging, setRecipientSupportsMessaging] = useState(false);

  const vcUrl = `${config.DEFAULT_SEARCH_UI_URL}/vc-validator?vc=${vc.proof.jwt}`;

  useEffect(() => {
    if (copied) {
      setTimeout(() => {
        setCopied(false);
      }, 2500);
    }
  }, [copied]);

  const getCanvasNode = useCallback((node) => {
    setCanvas(node?.querySelector("canvas"));
  }, []);

  return (
    <>
      {props.children || <Link onClick={() => setModalOpen(true)}>Share</Link>}
      <ModalWithX isOpen={modalOpen} close={() => setModalOpen(false)} minWidth={9} maxWidth={10}>
        <ModalContentFullWidth>
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
            {/*@TODO/tobek*/}
            <Form
              onSubmit={(e: any) => {
                e.preventDefault();
                alert("Coming soon!");
              }}
            >
              <Flex>
                <DidSearch
                  required
                  onChange={(val) => {
                    setRecipientDid(val.did);
                    setRecipientSupportsMessaging(!!val.messagingSupported);
                  }}
                />
                <Button type="submit" ml={2}>
                  <Flex alignItems="center">
                    <Send size="24px" mr={2} /> Send
                  </Flex>
                </Button>
              </Flex>
            </Form>
          </Box>

          <Box borderBottom={4} p={4}>
            <H6 mt={0} mb={3}>
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

          <Box borderBottom={4} p={4}>
            <H6 mt={0} mb={3}>
              Share by QR code
            </H6>
            <Flex>
              <Box ref={getCanvasNode} p={3} border={4} backgroundColor={colors.nearWhite} maxWidth={8}>
                <StyledQRCode value={vcUrl} renderAs="canvas" size={512} bgColor="transparent" />
              </Box>
              <Flex pl={4} flexDirection="column" justifyContent="center">
                <Button size="small" mb={3} onClick={() => downloadCanvasImage(canvas!, "credential-QR-code.png")}>
                  <FileDownload size="15px" mr={2} /> Download QR code
                </Button>
                {copyImageSupported && (
                  <Button.Outline size="small" onClick={() => setCopied(copyCanvasImage(canvas!))}>
                    <ContentCopy size="15px" mr={2} /> {copied ? "Copied" : "Copy to clipboard"}
                  </Button.Outline>
                )}
              </Flex>
            </Flex>
          </Box>
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

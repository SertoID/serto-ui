import { useState, useCallback, useEffect } from "react";
import { Box, Button, Flex } from "rimble-ui";
import { FileDownload, ContentCopy } from "@rimble/icons";
import styled from "styled-components";
import QRCode from "qrcode.react";
import { colors } from "../../../../themes";
import { downloadCanvasImage, copyImageSupported, copyCanvasImage } from "../../../../utils/helpers";

const StyledQRCode = styled(QRCode)`
  max-width: 100%;
  height: auto !important;
`;

export interface ShareViaQrProps {
  url: string;
  inline?: boolean;
}

export const ShareViaQr: React.FunctionComponent<ShareViaQrProps> = (props) => {
  const { url, inline } = props;
  const [canvas, setCanvas] = useState<HTMLCanvasElement | undefined>();
  const [copied, setCopied] = useState(false);
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

  const PrimaryButton = inline ? Button : Button.Text;
  const SecondaryButton = inline ? Button.Outline : Button.Text;

  return (
    <Flex flexDirection={inline ? "row" : "column"} alignItems="center">
      <Box
        ref={getCanvasNode}
        p={3}
        mb={inline ? 0 : 4}
        border={inline ? 4 : undefined}
        backgroundColor={inline ? colors.nearWhite : "transparent"}
        maxWidth={8}
      >
        <StyledQRCode value={url} renderAs="canvas" size={512} bgColor="transparent" />
      </Box>
      <Flex pl={inline ? 4 : 0} flexDirection="column" justifyContent="center">
        <PrimaryButton
          size="small"
          mb={3}
          onClick={() => canvas && downloadCanvasImage(canvas, "credential-QR-code.png")}
        >
          <FileDownload size="15px" mr={2} /> Download QR code
        </PrimaryButton>
        {copyImageSupported && (
          <SecondaryButton size="small" onClick={() => canvas && setCopied(copyCanvasImage(canvas))}>
            <ContentCopy size="15px" mr={2} /> {copied ? "Copied" : "Copy to clipboard"}
          </SecondaryButton>
        )}
      </Flex>
    </Flex>
  );
};

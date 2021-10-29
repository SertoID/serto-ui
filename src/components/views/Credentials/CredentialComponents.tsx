import { useState } from "react";
import { VC } from "vc-schema-tools";
import { Code, FileDownload, KeyboardArrowDown, KeyboardArrowUp, OpenInNew } from "@rimble/icons";
import { Box, Button, Flex, Link, Text } from "rimble-ui";
import {
  CopyToClipboard,
  ExpiredPill,
  HoverPathStroke,
  HoverSvgFill,
  ModalWithX,
  QrCode,
  UnstyledButton,
} from "../../elements";
import { H3 } from "../../layouts";
import { RENDER_CONTEXT } from "../../../context";
import { baseColors, fonts, colors } from "../../../themes";
import { useVcSchema } from "../../../services/useVcSchema";
import { CredentialShareButton } from "./CredentialShare";
import { SocialMediaVerify } from "./CredentialShare/SocialMediaVerify";
import { ShareViaQr } from "./CredentialShare/ShareViaQr";

export interface CredentialFooterProps {
  vc: VC;
  vcUrl?: string;
  expired: any;
  isOpen: boolean;
  renderContext?: RENDER_CONTEXT;
  setIsOpen(isOpen: boolean): void;
}

export const CredentialFooter: React.FunctionComponent<CredentialFooterProps> = (props) => {
  return (
    <Flex alignItems="center" justifyContent="space-between">
      <Flex>
        <CredentialJsonDownload vc={props.vc} />
        {props.renderContext !== RENDER_CONTEXT.VC_EMBED && (
          <>
            <Box mr={2}>
              <CredentialShareButton vc={props.vc} />
            </Box>
            <CredentialEmbed jwt={props.vc.proof.jwt} />
          </>
        )}
        {props.vcUrl && (
          <>
            {props.renderContext !== RENDER_CONTEXT.VC_EMBED && <QRCodeExpand vcUrl={props.vcUrl} />}
            <CopyToClipboard
              color={colors.midGray}
              iconPadding={1}
              hoverTitle="Copy Token"
              size="15px"
              text={props.vc.proof.jwt}
            />
            <Box mt="1px" ml={2} p="3px">
              <SocialMediaVerify vc={props.vc} vcUrl={props.vcUrl} />
            </Box>
          </>
        )}
      </Flex>
      {props.expired && <ExpiredPill />}
      {props.renderContext !== RENDER_CONTEXT.VC_EMBED ? (
        <Flex
          alignItems="center"
          color={colors.silver}
          fontSize={0}
          fontFamily={fonts.sansSerif}
          onClick={() => props.setIsOpen(!props.isOpen)}
          style={{ cursor: "pointer" }}
        >
          {props.isOpen ? (
            <>
              Collapse
              <KeyboardArrowUp color={colors.midGray} ml={1} size="18px" />
            </>
          ) : (
            <>
              Expand
              <KeyboardArrowDown color={colors.midGray} ml={1} size="18px" />
            </>
          )}
        </Flex>
      ) : (
        <>
          {props.vcUrl && (
            <Button.Text as="a" href={props.vcUrl} size="small" target="_blank">
              <Flex alignItems="center">
                Verify on Serto Search <OpenInNew color={colors.primary.base} ml={1} size="18px" />
              </Flex>
            </Button.Text>
          )}
        </>
      )}
    </Flex>
  );
};

export interface CredentialEmbedProps {
  jwt: string;
}

export const CredentialEmbed: React.FunctionComponent<CredentialEmbedProps> = (props) => {
  const [isEmbedModalOpen, setIsEmbedModalOpen] = useState(false);
  const embedHtml = `<iframe src="https://search.serto.id/vc-embed?vc=${props.jwt}" sandbox="allow-popups allow-same-origin allow-scripts" style="border: none;" width="480px" height="160px"></iframe>`;

  return (
    <>
      <UnstyledButton onClick={() => setIsEmbedModalOpen(true)} mr={2}>
        <Box p={1} title="View Embed Code">
          <HoverSvgFill>
            <Code color={colors.midGray} size="18px" />
          </HoverSvgFill>
        </Box>
      </UnstyledButton>
      <ModalWithX borderRadius={2} isOpen={isEmbedModalOpen} close={() => setIsEmbedModalOpen(false)}>
        <Box borderRadius={2} maxWidth="450px" pb={3} px={3}>
          <H3 mt={0}>Embed Credential</H3>
          <Box position="relative">
            <Box position="absolute" right={3} top={3} zIndex={1}>
              <CopyToClipboard text={embedHtml} />
            </Box>
            <Box
              bg={colors.nearWhite}
              borderRadius={1}
              maxHeight="300px"
              p={3}
              style={{ overflow: "scroll", overflowWrap: "break-word" }}
            >
              <code style={{ fontSize: "12px" }}>{embedHtml}</code>
            </Box>
          </Box>
        </Box>
      </ModalWithX>
    </>
  );
};

export interface QRCodeExpandProps {
  vcUrl: string;
}

export const QRCodeExpand: React.FunctionComponent<QRCodeExpandProps> = (props) => {
  const [isQrModalOpen, setIsQrModalOpen] = useState(false);
  return (
    <>
      <UnstyledButton onClick={() => setIsQrModalOpen(true)} mr={2}>
        <Box p={1} title="View QR Code">
          <HoverPathStroke>
            <QrCode color={colors.midGray} size="18px" />
          </HoverPathStroke>
        </Box>
      </UnstyledButton>
      <ModalWithX borderRadius={2} isOpen={isQrModalOpen} close={() => setIsQrModalOpen(false)}>
        <Box bg={baseColors.white} borderRadius={2} maxWidth="450px" pb={5} px={6}>
          <Text color={colors.midGray} my={3} textAlign="center">
            Scan to Verify on Serto Search
          </Text>
          <ShareViaQr url={props.vcUrl} />
        </Box>
      </ModalWithX>
    </>
  );
};

export interface DownloadCredentialJsonProps {
  vc: VC;
}

export const CredentialJsonDownload: React.FunctionComponent<DownloadCredentialJsonProps> = (props) => {
  const { vcSchema } = useVcSchema(props.vc);
  const fileName = vcSchema?.slug ? vcSchema.slug + ".json" : "credential.json";
  const credential = "text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(props.vc));
  return (
    <Link href={"data:" + credential} download={fileName} mr={2} p={1} title="Download Credential JSON">
      <HoverSvgFill>
        <FileDownload color={colors.midGray} size="18px" />
      </HoverSvgFill>
    </Link>
  );
};

export const CredentialTR: React.FunctionComponent = (props) => {
  return (
    <tr
      style={{
        height: "auto",
      }}
    >
      {props.children}
    </tr>
  );
};

export const CredentialTDRight: React.FunctionComponent = (props) => {
  return (
    <td
      style={{
        border: "none",
        padding: "5px 0",
        textAlign: "right",
        verticalAlign: "top",
        wordBreak: "break-word",
      }}
    >
      <Text.span color={baseColors.black} fontFamily={fonts.sansSerif} fontSize={1} lineHeight="copy">
        {props.children}
      </Text.span>
    </td>
  );
};

export const CredentialTDLeft: React.FunctionComponent = (props) => {
  return (
    <td
      style={{
        border: "none",
        padding: "5px 0",
        verticalAlign: "top",
      }}
    >
      <Text.span color={colors.silver} fontFamily={fonts.sansSerif} fontSize={1} lineHeight="copy">
        {props.children}
      </Text.span>
    </td>
  );
};

export const CredentialDetailsTDRight: React.FunctionComponent = (props) => {
  return (
    <td
      style={{
        border: "none",
        padding: "3px 0",
        textAlign: "right",
        verticalAlign: "top",
        wordBreak: "break-word",
      }}
    >
      <Text.span color={colors.silver} fontFamily={fonts.sansSerif} fontSize={0} lineHeight="copy">
        {props.children}
      </Text.span>
    </td>
  );
};

export interface CredentialDetailsTDLeftProps {
  color?: string;
}

export const CredentialDetailsTDLeft: React.FunctionComponent<CredentialDetailsTDLeftProps> = (props) => {
  return (
    <td
      style={{
        border: "none",
        padding: "3px 0",
        verticalAlign: "top",
      }}
    >
      <Text.span color={props.color || colors.silver} fontFamily={fonts.sansSerif} fontSize={0} lineHeight="copy">
        {props.children}
      </Text.span>
    </td>
  );
};

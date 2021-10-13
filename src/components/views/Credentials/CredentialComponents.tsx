import { useState } from "react";
import { VC } from "vc-schema-tools";
import { FileDownload, KeyboardArrowDown, KeyboardArrowUp } from "@rimble/icons";
import { Box, Flex, Link, Text } from "rimble-ui";
import {
  CopyToClipboard,
  ExpiredPill,
  HoverPathStroke,
  HoverSvgFill,
  ModalWithX,
  QrCode,
  UnstyledButton,
} from "../../elements";
import { baseColors, fonts, colors } from "../../../themes";
import { useVcSchema } from "../../../services/useVcSchema";
import { CredentialShareButton } from "./CredentialShare";
import { SocialMediaVerify } from "./SocialMediaVerify";
import { ShareViaQr } from "./CredentialShare/ShareViaQr";

export interface CredentialFooterProps {
  vc: VC;
  vcUrl?: string;
  expired: any;
  isOpen: boolean;
  setIsOpen(isOpen: boolean): void;
}

export const CredentialFooter: React.FunctionComponent<CredentialFooterProps> = (props) => {
  return (
    <Flex alignItems="center" justifyContent="space-between">
      <Flex>
        <CredentialJsonDownload vc={props.vc} />
        <Box mr={2}>
          <CredentialShareButton vc={props.vc} />
        </Box>
        {props.vcUrl && (
          <>
            <QRCodeExpand vcUrl={props.vcUrl} />
            <CopyToClipboard
              color={colors.midGray}
              iconPadding={1}
              hoverTitle="Copy Token"
              size="15px"
              text={props.vc.proof.jwt}
            />
            <Box ml={2} p="3px">
              <SocialMediaVerify vc={props.vc} vcUrl={props.vcUrl} />
            </Box>
          </>
        )}
      </Flex>
      {props.expired && <ExpiredPill />}
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
    </Flex>
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

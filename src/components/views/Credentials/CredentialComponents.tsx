import { useState } from "react";
import styled from "styled-components";
import QRCode from "qrcode.react";
import { VC } from "vc-schema-tools";
import { FileDownload, KeyboardArrowDown, KeyboardArrowUp } from "@rimble/icons";
import { Box, Button, Flex, Link, Modal, Text } from "rimble-ui";
import { CopyToClipboard, ExpiredPill, HoverPathStroke, HoverSvgFill, QrCode, UnstyledButton } from "../../elements";
import { baseColors, fonts, colors } from "../../../themes";
import { CredentialShare } from "./CredentialShare";

const StyledQRCode = styled(QRCode)`
  max-width: 100%;
  height: auto !important;
  width: 100%;
`;

export interface CredentialFooterProps {
  vc: VC;
  vcUrl: string;
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
          <CredentialShare vc={props.vc} />
        </Box>
        <QRCodeExpand vcUrl={props.vcUrl} />
        <CopyToClipboard
          color={colors.midGray}
          iconPadding={1}
          hoverTitle="Copy Token"
          size="15px"
          text={props.vc.proof.jwt}
        />
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
      <Modal isOpen={isQrModalOpen}>
        <Box bg={baseColors.white} borderRadius={2} maxWidth="450px" p={4}>
          <StyledQRCode value={props.vcUrl} renderAs="canvas" size={512} bgColor="transparent" />
          <Button.Outline mt={2} onClick={() => setIsQrModalOpen(false)} width="100%">
            Close
          </Button.Outline>
        </Box>
      </Modal>
    </>
  );
};

export interface DownloadCredentialJsonProps {
  vc: VC;
}

export const CredentialJsonDownload: React.FunctionComponent<DownloadCredentialJsonProps> = (props) => {
  const credential = "text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(props.vc));
  return (
    <Link href={"data:" + credential} download="credential.json" mr={2} p={1} title="Download Credential JSON">
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

import styled from "styled-components";
import QRCode from "qrcode.react";
import { VC } from "vc-schema-tools";
import { config } from "../../../config";
import { truncateDid } from "../../../utils";
import { FileDownload, Info, KeyboardArrowDown, KeyboardArrowUp } from "@rimble/icons";
import { Box, Flex, Text } from "rimble-ui";
import { CopyToClipboard, LockUnverified, LockVerified, ExpiredPill } from "../../elements";
import { H4 } from "../../layouts";
import { baseColors, fonts, colors } from "../../../themes";
import { CredentialShare } from "./CredentialShare";
// import { ViewSchemaButton } from "../Schemas/ViewSchemaButton";

export interface CredentialHeaderProps {
  vc: VC;
  vcSchema: any;
  vcType: any;
}

export const CredentialHeader: React.FunctionComponent<CredentialHeaderProps> = (props) => {
  return (
    <Flex>
      <Flex
        alignItems="center"
        bg={baseColors.white}
        borderRadius="50%"
        fontSize="24px"
        height="40px"
        justifyContent="center"
        mr={2}
        width="40px"
      >
        {props.vcSchema?.icon && props.vcSchema?.icon}
      </Flex>
      <Box flexGrow="1">
        <H4 color={baseColors.white} fontFamily={fonts.sansSerif} my={0}>
          {props.vcSchema?.name || props.vc.credentialSubject.title || props.vcType}
        </H4>
        <Text color={baseColors.white} fontFamily={fonts.sansSerif} fontSize={1} fontWeight={3}>
          Subject: {truncateDid(props.vc.credentialSubject.id)}
        </Text>
      </Box>
    </Flex>
  );
};

export interface CredentialIssuerProps {
  issuer: string;
  issuerFormatted: string;
}

export const CredentialIssuer: React.FunctionComponent<CredentialIssuerProps> = (props) => {
  return (
    <Text.span
      color={baseColors.white}
      fontFamily={fonts.sansSerif}
      fontSize={1}
      mr={2}
      style={{ overflowX: "hidden", textOverflow: "ellipsis" }}
      title={props.issuer}
    >
      {props.issuerFormatted}
    </Text.span>
  );
};

export interface CredentialVerifiedProps {
  isVerified: boolean;
}

export const CredentialVerified: React.FunctionComponent<CredentialVerifiedProps> = (props) => {
  return <>{props.isVerified ? <LockVerified /> : <LockUnverified />}</>;
};

const StyledQRCode = styled(QRCode)`
  max-width: 100%;
  height: auto !important;
`;

export interface CredentialViewTokenProps {
  jwt: any;
}

export const CredentialViewToken: React.FunctionComponent<CredentialViewTokenProps> = (props) => {
  const vcUrl = `${config.DEFAULT_SEARCH_UI_URL}/vc-validator?vc=${props.jwt}`;
  return (
    <Flex bg={colors.nearWhite} borderRadius={1} p={2}>
      <Box mr={3} width="calc(100% - 135px)">
        <Flex justifyContent="space-between" mb={1}>
          <Flex alignItems="center">
            <Text.span color={colors.midGray} fontFamily={fonts.monospace} fontSize={0}>
              Token
            </Text.span>
            <Info color={colors.silver} size="14px" ml={1} />
          </Flex>
          <CopyToClipboard text={props.jwt} size="16px" />
        </Flex>
        <Text.span
          color={colors.midGray}
          fontFamily={fonts.monospace}
          fontSize={0}
          lineHeight="copy"
          style={{ wordWrap: "break-word" }}
        >
          {props.jwt}
        </Text.span>
      </Box>
      <Box width="125px">
        <StyledQRCode value={vcUrl} renderAs="canvas" size={512} bgColor="transparent" />
      </Box>
    </Flex>
  );
};

export interface CredentialFooterProps {
  vc: VC;
  expired: any;
  isOpen: boolean;
  setIsOpen(isOpen: boolean): void;
}

export const CredentialFooter: React.FunctionComponent<CredentialFooterProps> = (props) => {
  return (
    <Flex alignItems="center" justifyContent="space-between">
      <Flex>
        <FileDownload color={colors.midGray} mr={3} size="18px" />
        <CredentialShare vc={props.vc} />
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

export const Separator = styled.hr`
  margin-left: 16px;
  margin-right: 16px;
  color: ${colors.lightGray};
  border-style: solid;
`;

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
        wordBreak: "break-word",
      }}
    >
      <Text.span color={colors.silver} fontFamily={fonts.sansSerif} fontSize={0} lineHeight="copy">
        {props.children}
      </Text.span>
    </td>
  );
};

export const CredentialDetailsTDLeft: React.FunctionComponent = (props) => {
  return (
    <td
      style={{
        border: "none",
        padding: "3px 0",
      }}
    >
      <Text.span color={colors.silver} fontFamily={fonts.sansSerif} fontSize={0} lineHeight="copy">
        {props.children}
      </Text.span>
    </td>
  );
};

import styled from "styled-components";
import { FileDownload, Info, KeyboardArrowDown, KeyboardArrowUp, Share } from "@rimble/icons";
import { Box, Flex, Pill, Text } from "rimble-ui";
import { CopyToClipboard, LockUnverified, LockVerified } from "../../elements";
import { H4 } from "../../layouts";
import { baseColors, fonts, colors } from "../../../themes";
import { VC } from "vc-schema-tools";
// import { ViewSchemaButton } from "../Schemas/ViewSchemaButton";

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

export const CredentialPrimaryTDRight: React.FunctionComponent = (props) => {
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

export const CredentialPrimaryTDLeft: React.FunctionComponent = (props) => {
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

export const CredentialSecondaryTDRight: React.FunctionComponent = (props) => {
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

export const CredentialSecondaryTDLeft: React.FunctionComponent = (props) => {
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

export const ExpiredPill: React.FunctionComponent = () => {
  return (
    <Pill color="danger" cursor="pointer" fontFamily={fonts.sansSerif} height={4} px={5}>
      <Text.span fontSize={0} color={colors.danger.base}>
        Expired
      </Text.span>
    </Pill>
  );
};

export interface CredentialHeaderProps {
  vc: VC;
  vcSchema: any;
  vcType: any;
}

export const CredentialHeader: React.FunctionComponent<CredentialHeaderProps> = (props) => {
  return (
    <Box>
      <H4 color={baseColors.white} fontFamily={fonts.sansSerif} my={0}>
        {props.vcSchema?.name || props.vc.credentialSubject.title || props.vcType}
      </H4>
      <Text color={baseColors.white} fontFamily={fonts.sansSerif} fontSize={1} fontWeight={3}>
        {props.vc?.credentialSubject?.id}
      </Text>
    </Box>
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

export interface CredentialViewTokenProps {
  jwt: any;
}

export const CredentialViewToken: React.FunctionComponent<CredentialViewTokenProps> = (props) => {
  return (
    <Box bg={colors.nearWhite} borderRadius={1} p={2}>
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
  );
};

export interface CredentialFooterProps {
  expired: any;
  isOpen: boolean;
  setIsOpen(isOpen: boolean): void;
}

export const CredentialFooter: React.FunctionComponent<CredentialFooterProps> = (props) => {
  return (
    <Flex alignItems="center" justifyContent="space-between">
      <Box>
        <FileDownload color={colors.midGray} mr={3} size="18px" />
        <Share color={colors.midGray} size="18px" />
      </Box>
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

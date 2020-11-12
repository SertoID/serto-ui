import * as React from "react";
import { Box, Flex, Pill, Table, Text } from "rimble-ui";
import { Info, Person, VerifiedUser } from "@rimble/icons";
import { CredentialBorder, CredentialTDLeft, CredentialTDRight, CredentialTR } from "./CredentialComponents";
import { CopyToClipboard } from "../CopyToClipboard";
import { Expand } from "../Expand";
import { baseColors, colors, fonts } from "../../themes";
import { dateTimeFormat, ellipsis } from "../../utils";
import { VC } from "../../../../types";

export enum CredentialViewTypes {
  COLLAPSIBLE = "COLLAPSIBLE",
  LIST = "LIST",
  DEFAULT = "DEFAULT",
}

export interface CredentialProps {
  vc: VC;
  viewType?: string;
}

export const Credential: React.FunctionComponent<CredentialProps> = (props) => {
  const { vc } = props;
  const vcType = vc.type[vc.type.length - 1];
  const issuer = typeof vc.issuer === "string" ? vc.issuer : vc.issuer.id;
  const viewType = props.viewType || "default";
  const issuanceDate =
    typeof vc.issuanceDate === "number"
      ? dateTimeFormat(new Date(vc.issuanceDate * 1000))
      : dateTimeFormat(new Date(vc.issuanceDate));
  const issuerFormatted = ellipsis("0x" + issuer.split("0x").pop(), 5, 3);

  const VerifiedCredentialHeader = () => (
    <>
      <Flex alignItems="center">
        <Box>
          <Flex alignItems="center">
            <Box bg={colors.primary.disabled[1]} borderRadius="50%" height={3} mr={1} p="1px" width={3}>
              <Person size="14" color={baseColors.white} />
            </Box>
            <Text.span
              color={baseColors.black}
              fontFamily={fonts.sansSerif}
              fontSize={0}
              mr={2}
              maxWidth={6}
              style={{ overflowX: "hidden", textOverflow: "ellipsis" }}
              title={issuer}
            >
              {issuerFormatted}
            </Text.span>
            {viewType === CredentialViewTypes.LIST && (
              <Text.span color={colors.silver} fontFamily={fonts.sansSerif} fontSize={0}>
                {issuanceDate}
              </Text.span>
            )}
          </Flex>
        </Box>
        <Box flexGrow="1">
          <Flex alignItems="center" justifyContent="flex-end">
            <Pill color={colors.info.base} fontFamily={fonts.sansSerif} fontSize={0} height={4} mr={2}>
              {vcType}
            </Pill>
            <VerifiedUser size="24px" color={colors.primary.disabled[1]} />
          </Flex>
        </Box>
      </Flex>
      <Box>
        <Text color={baseColors.black} fontFamily={fonts.sansSerif} fontSize={2} fontWeight={3} mr={2}>
          {vc.credentialSubject.title || vcType}
        </Text>
      </Box>
    </>
  );

  const renderCredentialProperty = (key: string, value: any, nestedLevel = 0): JSX.Element => (
    <>
      <CredentialTR key={key}>
        <CredentialTDLeft>
          <Box pl={nestedLevel * 24}>{key}</Box>
        </CredentialTDLeft>
        <CredentialTDRight>
          {typeof value === "boolean" || Array.isArray(value)
            ? JSON.stringify(value)
            : value && typeof value !== "object" && value}
        </CredentialTDRight>
      </CredentialTR>
      {value &&
        typeof value === "object" &&
        !Array.isArray(value) &&
        Object.entries(value).map(([key, value]) => renderCredentialProperty(key, value, nestedLevel + 1))}
    </>
  );

  const VerifiedCredentialBody = () => (
    <>
      <Table border={0} boxShadow={0} width="100%" style={{ tableLayout: "fixed" }}>
        <tbody>
          {Object.entries(vc.credentialSubject).map(([key, value]) => renderCredentialProperty(key, value))}
        </tbody>
      </Table>
      <Box my={2}>
        <Box bg={colors.nearWhite} borderRadius={1} p={2}>
          <Flex justifyContent="space-between" mb={1}>
            <Flex alignItems="center">
              <Text.span color={colors.midGray} fontFamily={fonts.sansSerif} fontSize={0}>
                Token
              </Text.span>
              <Info size="14px" ml={1} />
            </Flex>
            <CopyToClipboard text={vc.proof.jwt} size="16px" />
          </Flex>
          <Text.span
            color={colors.midGray}
            fontFamily={fonts.monospace}
            fontSize={0}
            lineHeight="copy"
            style={{ wordWrap: "break-word" }}
          >
            {vc.proof.jwt}
          </Text.span>
        </Box>
      </Box>
    </>
  );

  const VerifiedCredentialFooter = () => (
    <Flex justifyContent="space-between">
      <Text.span
        color={colors.silver}
        fontFamily={fonts.sansSerif}
        fontSize={0}
        pr={3}
        maxWidth="100%"
        style={{ overflowX: "hidden", textOverflow: "ellipsis" }}
        title={issuer}
      >
        Issuer: {issuerFormatted}
      </Text.span>
      <Text.span color={colors.silver} fontFamily={fonts.sansSerif} fontSize={0}>
        {issuanceDate}
      </Text.span>
    </Flex>
  );

  if (viewType === CredentialViewTypes.LIST) {
    return <CredentialBorder>{VerifiedCredentialHeader()}</CredentialBorder>;
  }

  if (viewType === CredentialViewTypes.COLLAPSIBLE) {
    return (
      <CredentialBorder>
        {VerifiedCredentialHeader()}
        <Expand>{VerifiedCredentialBody()}</Expand>
        {VerifiedCredentialFooter()}
      </CredentialBorder>
    );
  }

  return (
    <CredentialBorder>
      {VerifiedCredentialHeader()}
      {VerifiedCredentialBody()}
      {VerifiedCredentialFooter()}
    </CredentialBorder>
  );
};

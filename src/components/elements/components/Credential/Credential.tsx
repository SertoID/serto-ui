import * as React from "react";
import { Box, Flex, Pill, Table, Text } from "rimble-ui";
import { Info, Person, VerifiedUser } from "@rimble/icons";
import { CredentialBorder, CredentialTDLeft, CredentialTDRight, CredentialTR } from "./CredentialComponents";
import { CopyToClipboard } from "../CopyToClipboard";
import { Expand } from "../Expand";
import { baseColors, colors, fonts } from "../../themes";
import { dateTimeFormat, ellipsis } from "../../utils";

export enum CredentialViewTypes {
  COLLAPSIBLE = "COLLAPSIBLE",
  LIST = "LIST",
  DEFAULT = "DEFAULT",
}

/** Quick n dirty VC type with properties we need, the full W3C VC spec has much much more. */
export interface VC {
  "@context": string | string[];
  type: string[];
  issuer: string | { id: string };
  issuanceDate: string;
  credentialSubject: { [key: string]: any };
  proof: { jwt: string };
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

  const VerifiedCredentialBody = () => (
    <>
      <Table border={0} boxShadow={0} width="100%" style={{ tableLayout: "fixed" }}>
        <tbody>
          {Object.entries(vc.credentialSubject).map((value: any, key: number) => {
            return (
              <CredentialTR key={key}>
                <CredentialTDLeft>{value[0].toString()}</CredentialTDLeft>
                <CredentialTDRight>
                  {typeof value[1] === "object" ? JSON.stringify(value[1]) : value[1].toString()}
                </CredentialTDRight>
              </CredentialTR>
            );
          })}
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

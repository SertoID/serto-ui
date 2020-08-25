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

export interface CredentialProps {
  attributes?: any;
  credentialType: string;
  issuanceDate: number;
  issuer: string;
  jwt: string;
  title: string;
  viewType?: string;
}

export const Credential: React.FunctionComponent<CredentialProps> = (props) => {
  const { attributes, credentialType, jwt, title, issuer } = props;
  const viewType = props.viewType || "default";
  const issuanceDate = dateTimeFormat(new Date(props.issuanceDate * 1000));
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
              {credentialType}
            </Pill>
            <VerifiedUser size="24px" color={colors.primary.disabled[1]} />
          </Flex>
        </Box>
      </Flex>
      <Box>
        <Text color={baseColors.black} fontFamily={fonts.sansSerif} fontSize={2} fontWeight={3} mr={2}>
          {title}
        </Text>
      </Box>
    </>
  );

  const VerifiedCredentialBody = () => (
    <>
      <Table border={0} boxShadow={0} width="100%" style={{ tableLayout: "fixed" }}>
        <tbody>
          {/* This is just for demo purposes need to rework this */}
          {attributes ? (
            Object.entries(attributes).map((value: any, key: number) => {
              return (
                <CredentialTR key={key}>
                  <CredentialTDLeft>{value[0].toString()}</CredentialTDLeft>
                  <CredentialTDRight>
                    {typeof value[1] === "object" ? JSON.stringify(value[1]) : value[1].toString()}
                  </CredentialTDRight>
                </CredentialTR>
              );
            })
          ) : (
            <CredentialTR>
              <CredentialTDLeft>KYC Check</CredentialTDLeft>
              <CredentialTDRight>Approved</CredentialTDRight>
            </CredentialTR>
          )}
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
            <CopyToClipboard text={jwt} size="16px" />
          </Flex>
          <Text.span
            color={colors.midGray}
            fontFamily={fonts.monospace}
            fontSize={0}
            lineHeight="copy"
            style={{ wordWrap: "break-word" }}
          >
            {jwt}
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

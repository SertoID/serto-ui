import * as React from "react";
import { Box, Flex, Pill, Table, Text } from "rimble-ui";
import { Info, Person, VerifiedUser } from "@rimble/icons";
import { CredentialBorder, CredentialTDLeft, CredentialTDRight, CredentialTR } from "./CredentialComponents";
import { CopyToClipboard, Expand, dateTimeFormat, ellipsis, baseColors, colors, fonts } from "../../";

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
      <Flex alignItems={"center"}>
        <Box>
          <Flex alignItems={"center"}>
            <Box bg={"#CCC3F3"} borderRadius={"50%"} height={"16px"} mr={"5px"} p={"1px"} width={"16px"}>
              <Person size="14" color={baseColors.white} />
            </Box>
            <Text.span
              color={baseColors.black}
              fontFamily={fonts.sansSerif}
              fontSize={"12px"}
              mr={"8px"}
              maxWidth={150}
              style={{ overflowX: "hidden", textOverflow: "ellipsis" }}
              title={issuer}
            >
              {issuerFormatted}
            </Text.span>
            {viewType === CredentialViewTypes.LIST && (
              <Text.span color={"#9797A5"} fontFamily={fonts.sansSerif} fontSize={"12px"}>
                {issuanceDate}
              </Text.span>
            )}
          </Flex>
        </Box>
        <Box flexGrow={"1"}>
          <Flex alignItems={"center"} justifyContent={"flex-end"}>
            <Pill color={colors.info.base} fontFamily={fonts.sansSerif} fontSize={"12px"} height={"1.5rem"} mr={"10px"}>
              {credentialType}
            </Pill>
            <VerifiedUser size="25" color={"#AAA7FF"} />
          </Flex>
        </Box>
      </Flex>
      <Box>
        <Text color={baseColors.black} fontFamily={fonts.sansSerif} fontSize={"16px"} fontWeight={"600"} mr={"8px"}>
          {title}
        </Text>
      </Box>
    </>
  );

  const VerifiedCredentialBody = () => (
    <>
      <Table border={"none"} boxShadow={"0"} width={1} style={{ tableLayout: "fixed" }}>
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
      <Box my={"10px"}>
        <Box backgroundColor={"#F2F2F8"} borderRadius={"4px"} p={"8px"}>
          <Flex justifyContent={"space-between"} mb={"5px"}>
            <Flex alignItems={"center"}>
              <Text.span color={"#53535F"} fontFamily={fonts.sansSerif} fontSize={"12px"} lineHeight={"16px"}>
                Token
              </Text.span>
              <Info size="14" ml={"5px"} />
            </Flex>
            <CopyToClipboard text={jwt} size={"15px"} />
          </Flex>
          <Text.span
            color={"#53535F"}
            fontFamily={fonts.sansSerif}
            fontSize={"12px"}
            lineHeight={"16px"}
            style={{ wordWrap: "break-word" }}
          >
            {jwt}
          </Text.span>
        </Box>
      </Box>
    </>
  );

  const VerifiedCredentialFooter = () => (
    <Flex justifyContent={"space-between"}>
      <Text.span
        color={"#9797A5"}
        fontFamily={fonts.sansSerif}
        fontSize={"12px"}
        pr={16}
        maxWidth="100%"
        style={{ overflowX: "hidden", textOverflow: "ellipsis" }}
        title={issuer}
      >
        Issuer: {issuerFormatted}
      </Text.span>
      <Text.span color={"#9797A5"} fontFamily={fonts.sansSerif} fontSize={"12px"}>
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

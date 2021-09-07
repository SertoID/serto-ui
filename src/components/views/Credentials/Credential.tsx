import * as React from "react";
import { Info, Person, VerifiedUser, Warning } from "@rimble/icons";
import { Box, Flex, Pill, Table, Text } from "rimble-ui";
import { VC } from "vc-schema-tools";
import { CredentialBorder, CredentialContainer, Separator } from "./CredentialComponents";
import { CredentialShare } from "./CredentialShare";
import { CopyToClipboard } from "../../elements/CopyToClipboard/CopyToClipboard";
import { Expand } from "../../elements/Expand/Expand";
import { baseColors, colors, fonts } from "../../../themes";
import { dateTimeFormat, ellipsis } from "../../../utils";
import { AdditionalVCData } from "../../../types";
import { DomainImage } from "../../elements";
import { DomainLink } from "../../elements/DomainLink";
import { useVcSchema } from "../../../services/useVcSchema";
import { CredentialProperty } from "./CredentialProperty";
import { ViewSchemaButton } from "../Schemas/ViewSchemaButton";

export enum CredentialViewTypes {
  COLLAPSIBLE = "COLLAPSIBLE",
  LIST = "LIST",
  DEFAULT = "DEFAULT",
}

export interface CredentialProps {
  vc: VC;
  additionalVCData?: AdditionalVCData;
  viewType?: string;
}

export const Credential: React.FunctionComponent<CredentialProps> = (props) => {
  const { vc, additionalVCData } = props;
  const { vcSchema } = useVcSchema(vc);
  const vcType = vc.type[vc.type.length - 1];
  const issuer = typeof vc.issuer === "string" ? vc.issuer : vc.issuer.id;
  const viewType = props.viewType || "default";
  const issuanceDate =
    typeof vc.issuanceDate === "number"
      ? dateTimeFormat(new Date(vc.issuanceDate * 1000))
      : dateTimeFormat(new Date(vc.issuanceDate));
  const expirationDate = vc.expirationDate && dateTimeFormat(new Date(vc.expirationDate));
  const issuerFormatted = ellipsis("0x" + issuer.split("0x").pop(), 6, 4);
  const issuerDomains = additionalVCData
    ? additionalVCData.didListings.find((listing) => listing.did === issuer)?.domains
    : [];
  const subjectDomains = additionalVCData
    ? additionalVCData.didListings.find((listing) => listing.did === vc.credentialSubject.id)?.domains
    : [];

  const expired = vc.expirationDate && new Date(vc.expirationDate) < new Date(Date.now());
  const schemaName = vc.type.length > 0 ? vc.type[vc.type.length - 1] : "";
  const schemaMismatch = schemaName && additionalVCData && !additionalVCData.schemaVerified;

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
              maxWidth={7}
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
            <ViewSchemaButton schema={vcSchema}>
              <Pill color={colors.info.base} fontFamily={fonts.sansSerif} fontSize={0} height={4} mr={2}>
                {vcType}
                {vcSchema?.icon && ` ${vcSchema.icon}`}
              </Pill>
            </ViewSchemaButton>
            <VerifiedUser color={colors.primary.disabled[1]} />
          </Flex>
        </Box>
      </Flex>
      <Box>
        <Text color={baseColors.black} fontFamily={fonts.sansSerif} fontSize={2} fontWeight={3} mr={2}>
          {vcSchema?.name || vc.credentialSubject.title || vcType}
        </Text>
      </Box>
    </>
  );

  const VerifiedCredentialAdditionalDetails = () => (
    <>
      {additionalVCData && (
        <>
          <Box
            bg={expired || schemaMismatch ? colors.warning.light : colors.primary.disabled[1]}
            borderTopLeftRadius={2}
            borderTopRightRadius={2}
          >
            {schemaName && (
              <Flex justifyContent="space-between" px={3} py={2}>
                <Text fontFamily={fonts.sansSerif} fontWeight={2} fontSize={2}>
                  {schemaName}
                </Text>
                {schemaMismatch ? (
                  <Flex>
                    <Warning color={colors.warning.dark} />
                    <Text fontFamily={fonts.sansSerif} fontWeight={2} fontSize={2} mr={2}>
                      Schema does not match
                    </Text>
                  </Flex>
                ) : (
                  <Flex>
                    <Text fontFamily={fonts.sansSerif} fontWeight={2} fontSize={2} mr={2}>
                      Schema Verified
                    </Text>
                  </Flex>
                )}
              </Flex>
            )}
            {vc.credentialSubject.id && (
              <Flex justifyContent="space-between" px={3} py={2}>
                <Text fontFamily={fonts.sansSerif} fontWeight={2} fontSize={2}>
                  Subject
                </Text>
                <Flex flexDirection="column" justifyContent="flex-end" alignItems="flex-end">
                  {subjectDomains &&
                    subjectDomains.map((domain) => (
                      <DomainLink to={`/search?filter=${domain}`} key={domain}>
                        <Flex>
                          <Text fontFamily={fonts.sansSerif} fontWeight={2} fontSize={2} mr={2}>
                            {domain}
                          </Text>
                          <DomainImage domain={domain} />
                        </Flex>
                      </DomainLink>
                    ))}
                  <Text.span
                    color={colors.midGray}
                    fontFamily={fonts.sansSerifHeader}
                    fontSize={0}
                    mr={2}
                    maxWidth={7}
                    style={{ overflowX: "hidden", textOverflow: "ellipsis" }}
                    title={issuer}
                  >
                    {vc.credentialSubject.id}
                  </Text.span>
                </Flex>
              </Flex>
            )}
            <Separator />
            <Flex justifyContent="space-between" px={3} py={2}>
              <Text fontFamily={fonts.sansSerif} fontWeight={2} fontSize={2}>
                Issued By
              </Text>
              <Flex flexDirection="column" justifyContent="flex-end" alignItems="flex-end">
                {issuerDomains &&
                  issuerDomains.map((domain) => (
                    <DomainLink to={`/search?filter=${domain}`} key={domain}>
                      <Flex>
                        <Text fontFamily={fonts.sansSerif} fontWeight={2} fontSize={2} mr={2}>
                          {domain}
                        </Text>
                        <DomainImage domain={domain} />
                      </Flex>
                    </DomainLink>
                  ))}
                <Text.span
                  color={colors.midGray}
                  fontFamily={fonts.sansSerifHeader}
                  fontSize={0}
                  mr={2}
                  maxWidth={7}
                  style={{ overflowX: "hidden", textOverflow: "ellipsis" }}
                  title={issuer}
                >
                  {typeof vc.issuer == "string" ? vc.issuer : vc.issuer.id}
                </Text.span>
              </Flex>
            </Flex>
            {expirationDate && (
              <Flex justifyContent="space-between" px={3} py={2}>
                <Text fontFamily={fonts.sansSerif} fontWeight={2} fontSize={2}>
                  Expires
                </Text>
                <Text.span
                  fontFamily={fonts.sansSerif}
                  fontWeight={2}
                  fontSize={2}
                  color={expired ? colors.danger.base : colors.blacks[0]}
                >
                  {expirationDate}
                </Text.span>
              </Flex>
            )}
          </Box>
        </>
      )}
    </>
  );

  const VerifiedCredentialBody = () => (
    <>
      <Table border={0} boxShadow={0} width="100%" style={{ tableLayout: "fixed" }}>
        <tbody>
          {Object.entries(vc.credentialSubject).map(([key, value]) => (
            <CredentialProperty
              key={key}
              keyName={key}
              value={value}
              schema={vcSchema?.jsonSchema?.properties?.credentialSubject?.properties?.[key]}
            />
          ))}
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
      <Text mb={2} fontFamily={fonts.sansSerif} fontSize={0}>
        <CredentialShare vc={vc} />
      </Text>
    </>
  );

  const VerifiedCredentialFooter = () => (
    <Flex justifyContent="space-between">
      <Text.span
        color={colors.silver}
        fontFamily={fonts.sansSerif}
        fontSize={0}
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
    return (
      <CredentialBorder>
        <CredentialContainer>{VerifiedCredentialHeader()}</CredentialContainer>
      </CredentialBorder>
    );
  }

  if (viewType === CredentialViewTypes.COLLAPSIBLE) {
    return (
      <CredentialBorder>
        <CredentialContainer>
          {VerifiedCredentialHeader()}
          <Expand>{VerifiedCredentialBody()}</Expand>
          {VerifiedCredentialFooter()}
        </CredentialContainer>
      </CredentialBorder>
    );
  }

  return (
    <CredentialBorder>
      {VerifiedCredentialAdditionalDetails()}
      <CredentialContainer>
        {VerifiedCredentialHeader()}
        {VerifiedCredentialBody()}
        {VerifiedCredentialFooter()}
      </CredentialContainer>
    </CredentialBorder>
  );
};

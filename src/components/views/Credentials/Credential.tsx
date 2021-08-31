import { useState } from "react";
import { Warning } from "@rimble/icons";
import { Box, Flex, Table, Text } from "rimble-ui";
import { VC } from "vc-schema-tools";
import {
  CredentialFooter,
  CredentialHeader,
  CredentialIssuer,
  CredentialDetailsTDLeft,
  CredentialDetailsTDRight,
  CredentialTR,
  CredentialVerified,
  CredentialViewToken,
  Separator,
} from "./CredentialComponents";
import { baseColors, colors, fonts } from "../../../themes";
import { dateTimeFormat, truncateDid } from "../../../utils";
import { AdditionalVCData } from "../../../types";
import { CopyToClipboard, DomainImage } from "../../elements";
import { DomainLink } from "../../elements/DomainLink";
import { useVcSchema } from "../../../services/useVcSchema";
import { CredentialProperty } from "./CredentialProperty";

/* CredentialViewTypes: deprecated */
export enum CredentialViewTypes {
  COLLAPSIBLE = "COLLAPSIBLE",
  LIST = "LIST",
  DEFAULT = "DEFAULT",
}

export interface CredentialProps {
  vc: VC;
  additionalVCData?: AdditionalVCData;
  open?: boolean;
  viewType?: string; // deprecated
}

export const Credential: React.FunctionComponent<CredentialProps> = (props) => {
  const { vc, additionalVCData } = props;
  const { vcSchema } = useVcSchema(vc);
  const vcType = vc.type[vc.type.length - 1];
  const issuer = typeof vc.issuer === "string" ? vc.issuer : vc.issuer.id;
  const issuanceDate =
    typeof vc.issuanceDate === "number"
      ? dateTimeFormat(new Date(vc.issuanceDate * 1000))
      : dateTimeFormat(new Date(vc.issuanceDate));
  const expirationDate = vc.expirationDate && dateTimeFormat(new Date(vc.expirationDate));
  const issuerFormatted = truncateDid(issuer);
  const issuerDomains = additionalVCData
    ? additionalVCData.didListings.find((listing) => listing.did === issuer)?.domains
    : [];
  const subjectDomains = additionalVCData
    ? additionalVCData.didListings.find((listing) => listing.did === vc.credentialSubject.id)?.domains
    : [];

  const expired = vc.expirationDate && new Date(vc.expirationDate) < new Date(Date.now());
  const schemaName = vc.type.length > 0 ? vc.type[vc.type.length - 1] : "";
  const schemaMismatch = schemaName && additionalVCData && !additionalVCData.schemaVerified;
  const [isOpen, setIsOpen] = useState<boolean>(props.open || false);

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
            <Flex justifyContent="space-between" px={3} py={2}>
              <Text fontFamily={fonts.sansSerif} fontWeight={2} fontSize={2}>
                Recipient
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

  console.log(vc);
  console.log(vcSchema);

  return (
    <Box bg={baseColors.white} border={2} borderRadius={2} boxShadow={1} maxWidth="480px" mb={3} overflow="hidden">
      {VerifiedCredentialAdditionalDetails()}
      <Box bg="#2C56DD" px={3} py={2}>
        <Flex alignItems="center" justifyContent="space-between" mb={2}>
          <CredentialIssuer issuer={issuer} issuerFormatted={issuerFormatted} />
          <CredentialVerified isVerified={true} />
        </Flex>
        <CredentialHeader vc={vc} vcType={vcType} vcSchema={vcSchema} />
      </Box>
      {isOpen && (
        <>
          <Box borderBottom={2} mb={3} pb={1} pt={2} px={3}>
            <Table border={0} boxShadow={0} mb={2} width="100%" style={{ tableLayout: "fixed" }}>
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
          </Box>
          <Box mb={1} px={3}>
            <Table border={0} boxShadow={0} mb={3} width="100%" style={{ tableLayout: "fixed" }}>
              <tbody>
                <CredentialTR>
                  <CredentialDetailsTDLeft>Subject</CredentialDetailsTDLeft>
                  <CredentialDetailsTDRight>
                    <Flex alignItem="center" justifyContent="flex-end">
                      {truncateDid(vc.credentialSubject.id)}
                      <Box ml={1}>
                        <CopyToClipboard text={vc.credentialSubject.id} size="16px" />
                      </Box>
                    </Flex>
                  </CredentialDetailsTDRight>
                </CredentialTR>
                <CredentialTR>
                  <CredentialDetailsTDLeft>Issuer</CredentialDetailsTDLeft>
                  <CredentialDetailsTDRight>
                    <Flex alignItem="center" justifyContent="flex-end">
                      {issuerFormatted}
                      <Box ml={1}>
                        <CopyToClipboard text={issuer} size="16px" />
                      </Box>
                    </Flex>
                  </CredentialDetailsTDRight>
                </CredentialTR>
                <CredentialTR>
                  <CredentialDetailsTDLeft>Date Issued</CredentialDetailsTDLeft>
                  <CredentialDetailsTDRight>{issuanceDate}</CredentialDetailsTDRight>
                </CredentialTR>
                {vc.expirationDate && (
                  <CredentialTR>
                    <CredentialDetailsTDLeft>Expires</CredentialDetailsTDLeft>
                    <CredentialDetailsTDRight>{vc.expirationDate}</CredentialDetailsTDRight>
                  </CredentialTR>
                )}
              </tbody>
            </Table>
            <CredentialViewToken jwt={vc.proof.jwt} />
          </Box>
        </>
      )}
      <Box pb={2} px={3} pt={3}>
        <CredentialFooter expired={expired} isOpen={isOpen} setIsOpen={(isOpen) => setIsOpen(isOpen)} vc={vc} />
      </Box>
    </Box>
  );
};

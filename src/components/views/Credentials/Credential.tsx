import { useState } from "react";
import { Box, Flex, Table } from "rimble-ui";
import { VC } from "vc-schema-tools";
import {
  CredentialFooter,
  CredentialDetailsTDLeft,
  CredentialDetailsTDRight,
  CredentialTR,
  CredentialViewToken,
} from "./CredentialComponents";
import { baseColors } from "../../../themes";
import { dateTimeFormat, truncateDid } from "../../../utils";
import { AdditionalVCData } from "../../../types";
import { CopyToClipboard } from "../../elements";
import { useVcSchema } from "../../../services/useVcSchema";
import { CredentialHeader } from "./CredentialHeader";
import { CredentialProperty } from "./CredentialProperty";

/* CredentialViewTypes: deprecated */
export enum CredentialViewTypes {
  COLLAPSIBLE = "COLLAPSIBLE",
  LIST = "LIST",
  DEFAULT = "DEFAULT",
}

export interface CredentialProps {
  vc: VC;
  additionalVCData?: AdditionalVCData; // deprecated
  isOpen?: boolean;
  viewType?: string; // deprecated
}

export const Credential: React.FunctionComponent<CredentialProps> = (props) => {
  const { vc } = props;
  const { vcSchema } = useVcSchema(vc);
  const vcType = vc.type[vc.type.length - 1];
  const schemaName = vc.type.length > 0 ? vc.type[vc.type.length - 1] : "";
  // const schemaMismatch = schemaName && additionalVCData && !additionalVCData.schemaVerified;
  const issuanceDate =
    typeof vc.issuanceDate === "number"
      ? dateTimeFormat(new Date(vc.issuanceDate * 1000))
      : dateTimeFormat(new Date(vc.issuanceDate));
  const expirationDate = vc.expirationDate && dateTimeFormat(new Date(vc.expirationDate));
  const expired = vc.expirationDate && new Date(vc.expirationDate) < new Date(Date.now());
  const issuer = typeof vc.issuer === "string" ? vc.issuer : vc.issuer.id;
  const issuerFormatted = truncateDid(issuer);
  /*const issuerDomains = additionalVCData
    ? additionalVCData.didListings.find((listing) => listing.did === issuer)?.domains
    : [];
  const subjectDomains = additionalVCData
    ? additionalVCData.didListings.find((listing) => listing.did === vc.credentialSubject.id)?.domains
    : [];*/
  const [isOpen, setIsOpen] = useState<boolean>(props.isOpen || false);

  console.log(vc);
  console.log(vcSchema);

  return (
    <Box bg={baseColors.white} border={2} borderRadius={2} boxShadow={1} maxWidth="480px" mb={3} overflow="hidden">
      <CredentialHeader
        issuer={issuer}
        // issuerDomain={"serto.id"}
        // issuerDomain={"beta.search.serto.id"}
        // issuerDomain={"consensys.net"}
        // issuerDomain={"americanexpress.com"}
        issuerDomain={"cryptoconsortium.org"}
        // issuerDomain={"nytimes.com"}
        // issuerDomain={"digg.com"}
        vc={vc}
        vcType={vcType}
        vcSchema={vcSchema}
      />
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
                {expirationDate && (
                  <CredentialTR>
                    <CredentialDetailsTDLeft>Expires</CredentialDetailsTDLeft>
                    <CredentialDetailsTDRight>{expirationDate}</CredentialDetailsTDRight>
                  </CredentialTR>
                )}
              </tbody>
            </Table>
            <CredentialViewToken jwt={vc.proof.jwt} />
          </Box>
        </>
      )}
      <Box pb={2} px={3} pt={2}>
        <CredentialFooter expired={expired} isOpen={isOpen} setIsOpen={(isOpen) => setIsOpen(isOpen)} vc={vc} />
      </Box>
    </Box>
  );
};

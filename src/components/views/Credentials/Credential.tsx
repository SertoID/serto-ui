import { useState } from "react";
import { Box, Button, Flex, Table } from "rimble-ui";
import { VC } from "vc-schema-tools";
import {
  CredentialFooter,
  CredentialDetailsTDLeft,
  CredentialDetailsTDRight,
  CredentialTR,
} from "./CredentialComponents";
import { config } from "../../../config";
import { baseColors, colors } from "../../../themes";
import { dateTimeFormat, truncateDid } from "../../../utils";
import { CopyToClipboard } from "../../elements";
import { useVcSchema } from "../../../services/useVcSchema";
import { CredentialHeader } from "./CredentialHeader";
import { CredentialProperty } from "./CredentialProperty";
import { ViewSchemaButton } from "../Schemas/ViewSchemaButton";

export interface CredentialProps {
  vc: VC;
  isOpen?: boolean;
}

export const Credential: React.FunctionComponent<CredentialProps> = (props) => {
  const { vc } = props;
  const { vcSchema } = useVcSchema(vc);
  const vcType = vc.type[vc.type.length - 1];
  const issuanceDate =
    typeof vc.issuanceDate === "number"
      ? dateTimeFormat(new Date(vc.issuanceDate * 1000))
      : dateTimeFormat(new Date(vc.issuanceDate));
  const issuanceDateFormatted = `${issuanceDate.dateFormatted} and ${issuanceDate.timeFormatted}`;
  const expirationDate = vc.expirationDate && dateTimeFormat(new Date(vc.expirationDate));
  const expirationDateFormatted = expirationDate && `${expirationDate[0]} and ${expirationDate[1]}`;
  const expired = vc.expirationDate && new Date(vc.expirationDate) < new Date(Date.now());
  const issuer = typeof vc.issuer === "string" ? vc.issuer : vc.issuer.id;
  const vcUrl = `${config.DEFAULT_SEARCH_UI_URL}/vc-validator?vc=${vc.proof.jwt}`;
  const [isOpen, setIsOpen] = useState<boolean>(props.isOpen || false);

  return (
    <Box
      bg={baseColors.white}
      border={2}
      borderRadius={2}
      boxShadow={1}
      maxWidth="480px"
      mb={3}
      overflow="hidden"
      width="100%"
    >
      <CredentialHeader issuer={issuer} vc={vc} vcType={vcType} vcSchema={vcSchema} />
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
          <Box mb={3} px={3}>
            <Table border={0} boxShadow={0} mb={3} width="100%" style={{ tableLayout: "fixed" }}>
              <tbody>
                {vc.credentialSubject.id && (
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
                )}
                <CredentialTR>
                  <CredentialDetailsTDLeft>Issuer</CredentialDetailsTDLeft>
                  <CredentialDetailsTDRight>
                    <Flex alignItem="center" justifyContent="flex-end">
                      {truncateDid(issuer)}
                      <Box ml={1}>
                        <CopyToClipboard text={issuer} size="16px" />
                      </Box>
                    </Flex>
                  </CredentialDetailsTDRight>
                </CredentialTR>
                <CredentialTR>
                  <CredentialDetailsTDLeft>Date Issued</CredentialDetailsTDLeft>
                  <CredentialDetailsTDRight>{issuanceDateFormatted}</CredentialDetailsTDRight>
                </CredentialTR>
                {expirationDate && (
                  <CredentialTR>
                    <CredentialDetailsTDLeft color={expired ? colors.danger.base : colors.silver}>
                      Expires
                    </CredentialDetailsTDLeft>
                    <CredentialDetailsTDRight>{expirationDateFormatted}</CredentialDetailsTDRight>
                  </CredentialTR>
                )}
              </tbody>
            </Table>
          </Box>
          {vcSchema?.slug && (
            <Box borderTop={2} mb={3} px={3} pt={3}>
              <Table border={0} boxShadow={0} mb={3} width="100%" style={{ tableLayout: "fixed" }}>
                <tbody>
                  <CredentialTR>
                    <CredentialDetailsTDLeft>Schema</CredentialDetailsTDLeft>
                    <CredentialDetailsTDRight>
                      <ViewSchemaButton schema={vcSchema}>
                        <u>{vcSchema.slug}</u>
                      </ViewSchemaButton>
                    </CredentialDetailsTDRight>
                  </CredentialTR>
                </tbody>
              </Table>
            </Box>
          )}
          <Box my={4} px={3}>
            <Button.Outline as="a" href={vcUrl} size="small" target="_blank" width="100%">
              Verify on Serto Search
            </Button.Outline>
          </Box>
        </>
      )}
      <Box pb={1} px={2} pt={2}>
        <CredentialFooter
          expired={expired}
          isOpen={isOpen}
          setIsOpen={(isOpen) => setIsOpen(isOpen)}
          vc={vc}
          vcUrl={vcUrl}
        />
      </Box>
    </Box>
  );
};

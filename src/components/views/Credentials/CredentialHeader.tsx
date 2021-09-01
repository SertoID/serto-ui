import { useEffect, useState } from "react";
import { VC } from "vc-schema-tools";
import { usePalette } from "react-palette";
import { readableColor } from "polished";
import { truncateDid } from "../../../utils";
import { Box, Flex, Text } from "rimble-ui";
import { DomainImage, LockUnverified, LockVerified } from "../../elements";
import { H4 } from "../../layouts";
import { baseColors, colors, fonts } from "../../../themes";
import { validateVc } from "vc-schema-tools";

export interface CredentialHeaderProps {
  issuer: string;
  issuerDomain?: string;
  vc: VC;
  vcSchema: any;
  vcType: any;
}

export const CredentialHeader: React.FunctionComponent<CredentialHeaderProps> = (props) => {
  const { issuer, issuerDomain, vc, vcSchema, vcType } = props;
  const [isValid, setIsValid] = useState<boolean | undefined>();
  let backgroundColor = colors.primary.base;
  let textColor = baseColors.white;

  if (issuerDomain) {
    let logoUrl = "https://www.google.com/s2/favicons?sz=64&domain=" + issuerDomain;
    let googleProxyURL =
      "https://images1-focus-opensocial.googleusercontent.com/gadgets/proxy?container=focus&refresh=2592000&url=";
    logoUrl = googleProxyURL + encodeURIComponent(logoUrl);

    const { data, loading, error } = usePalette(logoUrl);
    backgroundColor = loading ? "transparent" : error ? colors.primary.base : data.vibrant;
    textColor = loading ? "transparent" : error ? baseColors.white : readableColor(data.vibrant);
  }

  useEffect(() => {
    return void (async function validate() {
      try {
        const { valid } = await validateVc(JSON.stringify(vc));
        if (valid) {
          setIsValid(true);
        } else {
          setIsValid(false);
        }
      } catch (error) {
        console.error("error verifying vc: ", error);
        setIsValid(false);
      }
    })();
  }, [vc]);

  return (
    <Box bg={backgroundColor} px={3} pb={3} pt={2}>
      <Flex alignItems="center" justifyContent="space-between" mb={3}>
        {issuerDomain ? (
          <Flex alignItems="center">
            <DomainImage background={true} domain={issuerDomain} />
            <Text.span
              color={textColor}
              fontFamily={fonts.sansSerif}
              fontSize={1}
              mx={2}
              style={{ overflowX: "hidden", textOverflow: "ellipsis" }}
            >
              {issuerDomain}
            </Text.span>
          </Flex>
        ) : (
          <Text.span
            color={textColor}
            fontFamily={fonts.sansSerif}
            fontSize={1}
            mr={2}
            style={{ overflowX: "hidden", textOverflow: "ellipsis" }}
            title={issuer}
          >
            {truncateDid(issuer)}
          </Text.span>
        )}
        {isValid ? <LockVerified /> : <LockUnverified />}
      </Flex>
      <Flex>
        {vcSchema?.icon && (
          <Flex
            alignItems="center"
            bg={baseColors.white}
            border={2}
            borderRadius="50%"
            fontSize="24px"
            height="40px"
            justifyContent="center"
            mr={2}
            width="40px"
          >
            {vcSchema.icon}
          </Flex>
        )}
        <Box flexGrow="1">
          <H4 color={textColor} fontFamily={fonts.sansSerif} my={0}>
            {vcSchema?.name || vc.credentialSubject.title || vcType}
          </H4>
          <Text color={textColor} fontFamily={fonts.sansSerif} fontSize={1} fontWeight={3}>
            Subject: {truncateDid(vc.credentialSubject.id)}
          </Text>
        </Box>
      </Flex>
    </Box>
  );
};

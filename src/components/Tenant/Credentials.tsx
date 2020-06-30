import * as React from "react";
import useSWR from "swr";
import jwtDecode from "jwt-decode";
import { TrustAgencyContext } from "../../context/TrustAgentProvider";
import { TrustAgencyService } from "../../services/TrustAgencyService";
import { Box, Flash, Flex, Loader, Text } from "rimble-ui";
import { Credential, CredentialViewTypes, baseColors, colors } from "../elements";

export const Credentials: React.FunctionComponent = (props) => {
  const TrustAgent = React.useContext<TrustAgencyService>(TrustAgencyContext);
  const { data, error: getCredentialsError, isValidating } = useSWR("/v1/tenant/credentials", () =>
    TrustAgent.getCredentials(),
  );

  if (data && data.verifiableCredentials.length > 0) {
    return data.verifiableCredentials.map((verifiableCredential: any, i: number) => {
      const jwt = verifiableCredential.proof.jwt;
      const jwtDecoded = jwtDecode(jwt);

      // @TODO Temporarily hard-coding some of this stuff, we need a cleverer way to get and show credential info obviously, probably linked to schema detection
      const attributes =
        jwtDecoded.vc.credentialSubject.publishedContent ||
        jwtDecoded.vc.credentialSubject.foo ||
        jwtDecoded.vc.credentialSubject;
      const title = jwtDecoded.vc.credentialSubject.publishedContent
        ? "News Article"
        : jwtDecoded.vc.credentialSubject.title || "Know Your Customer Check"; // hardcoding for demo purposes, add title in credentialSubject for demo

      console.log(jwtDecoded);

      return (
        <Credential
          key={i}
          attributes={attributes}
          credentialType={jwtDecoded.vc.type[0]}
          issuanceDate={jwtDecoded.iat}
          issuer={jwtDecoded.iss}
          jwt={jwt}
          title={title}
          viewType={CredentialViewTypes.COLLAPSIBLE}
        />
      );
    });
  } else if (isValidating) {
    return (
      <Box bg={baseColors.white} borderRadius={1} py={3}>
        <Flex minHeight={8} alignItems="center" justifyContent="center">
          <Loader color={colors.primary.base} size={4} />
        </Flex>
      </Box>
    );
  } else if (getCredentialsError) {
    return (
      <Box bg={baseColors.white} borderRadius={1} py={3}>
        <Flash my={3} variant="danger">
          Error loading credentials: {JSON.stringify(getCredentialsError)}
        </Flash>
      </Box>
    );
  }

  return (
    <Box bg={baseColors.white} borderRadius={1} py={3}>
      <Flex alignItems="center" justifyContent="center" minHeight={8}>
        <Box bg={baseColors.white} borderRadius={1} py={3} maxWidth={9}>
          <Text.span fontSize={1} fontWeight={3} textAlign="center">
            You currently have no credentials
          </Text.span>
        </Box>
      </Flex>
    </Box>
  );
};

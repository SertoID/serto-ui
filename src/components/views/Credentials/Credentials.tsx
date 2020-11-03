import * as React from "react";
import useSWR from "swr";
import { TrustAgencyContext } from "../../../context/TrustAgentProvider";
import { TrustAgencyService } from "../../../services/TrustAgencyService";
import { Box, Flash, Flex, Loader, Text } from "rimble-ui";
import { Credential, CredentialViewTypes } from "../../elements/components";
import { baseColors, colors } from "../../elements/themes";

export const Credentials: React.FunctionComponent = (props) => {
  const TrustAgent = React.useContext<TrustAgencyService>(TrustAgencyContext);
  const {
    data,
    error: getCredentialsError,
    isValidating,
  } = useSWR("/v1/tenant/agent/dataStoreORMGetVerifiableCredentials", () => TrustAgent.getCredentials());

  if (data && data.length > 0) {
    return data
      .map((vc: any, i: number) => {
        console.log(vc);
        return <Credential key={i} vc={vc} viewType={CredentialViewTypes.COLLAPSIBLE} />;
      })
      .reverse();
  } else if (isValidating) {
    return (
      <Box bg={baseColors.white} borderRadius={1} py={3}>
        <Flex minHeight={8} alignItems="center" justifyContent="center">
          <Loader color={colors.primary.base} size={5} />
        </Flex>
      </Box>
    );
  } else if (getCredentialsError) {
    return (
      <Box bg={baseColors.white} borderRadius={1} py={3}>
        <Flash my={3} variant="danger">
          Error loading credentials: {getCredentialsError.toString()}
        </Flash>
      </Box>
    );
  }

  return (
    <Box bg={baseColors.white} borderRadius={1} py={3}>
      <Flex alignItems="center" justifyContent="center" minHeight={8}>
        <Box bg={baseColors.white} borderRadius={1} py={3} maxWidth={9}>
          <Text.span display="block" fontSize={1} fontWeight={3} textAlign="center">
            You have not issued any Verifiable Credentials yet.
          </Text.span>
          <Text.span display="block" fontSize={1} textAlign="center">
            To issue a credential, make sure you have a schema to use in mind. If no schema exists, please create one
            first.
          </Text.span>
        </Box>
      </Flex>
    </Box>
  );
};

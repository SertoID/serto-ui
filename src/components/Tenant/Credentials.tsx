import * as React from "react";
import useSWR from "swr";
import jwtDecode from "jwt-decode";
import { Box, Heading } from "rimble-ui";
import { TrustAgencyContext } from "../../context/TrustAgentProvider";
import { TrustAgencyService } from "../../services/TrustAgencyService";

export const Credentials: React.FunctionComponent = (props) => {
  const TrustAgent = React.useContext<TrustAgencyService>(TrustAgencyContext);
  const { data, error, isValidating } = useSWR("/v1/tenant/credentials", () => TrustAgent.getCredentials());

  return (
    <>
      <Heading as={"h3"}>Credentials</Heading>
      {error && <pre>{`error: ${error}`}</pre>}

      {data && data.verifiableCredentials.length !== 0
        ? data.verifiableCredentials.map((verifiableCredential: any, i: number) => {
            const jwtDecoded = jwtDecode(verifiableCredential.proof.jwt);
            return (
              <Box key={i} border="1px solid #E0E0E0" width={[1]} my={10} p={10}>
                <pre style={{ overflowX: "auto" }}>{JSON.stringify(jwtDecoded.vc, null, 2)}</pre>
              </Box>
            );
          })
        : isValidating
        ? "Loading..."
        : "You currently have no credentials"}
    </>
  );
};

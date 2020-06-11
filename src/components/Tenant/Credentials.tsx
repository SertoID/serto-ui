import * as React from "react";
import useSWR from "swr";
import jwtDecode from "jwt-decode";
import { Heading } from "rimble-ui";
import { TrustAgencyContext } from "../../context/TrustAgentProvider";
import { TrustAgencyService } from "../../services/TrustAgencyService";

export const Credentials: React.FunctionComponent = (props) => {
  const TrustAgent = React.useContext<TrustAgencyService>(TrustAgencyContext);
  const { data, error } = useSWR("/v1/tenant/credentials", () => TrustAgent.getCredentials());

  return (
    <>
      <Heading as={"h3"}>Credentials</Heading>
      {error && <pre>{`error: ${error}`}</pre>}

      {data && data.verifiableCredentials.length !== 0 ? (
        data.verifiableCredentials.map((verifiableCredential: any, i: number) => {
          const jwtDecoded = jwtDecode(verifiableCredential.proof.jwt);
          return <pre key={i}>{JSON.stringify(jwtDecoded.vc)}</pre>;
        })
      ) : (
        <>You currently have no credentials</>
      )}
    </>
  );
};

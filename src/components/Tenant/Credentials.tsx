import * as React from "react";
import useSWR from "swr";
import jwtDecode from "jwt-decode";
import { Heading } from "rimble-ui";
import { TrustAgencyContext } from "../../context/TrustAgentProvider";
import { TrustAgencyService } from "../../services/TrustAgencyService";
import { Credential, CredentialViewTypes } from "./Credential";
import { dateTimeFormat, ellipsis } from "../elements";

export const Credentials: React.FunctionComponent = (props) => {
  const TrustAgent = React.useContext<TrustAgencyService>(TrustAgencyContext);
  const { data, error, isValidating } = useSWR("/v1/tenant/credentials", () => TrustAgent.getCredentials());

  return (
    <>
      <Heading as={"h3"}>Credentials</Heading>
      {error && <pre>{`error: ${error}`}</pre>}

      {data && data.verifiableCredentials.length !== 0
        ? data.verifiableCredentials.map((verifiableCredential: any, i: number) => {
            const jwt = verifiableCredential.proof.jwt;
            const jwtDecoded = jwtDecode(jwt);
            const issuanceDate = dateTimeFormat(new Date(jwtDecoded.iat * 1000));
            const issuer = ellipsis("0x" + jwtDecoded.sub.split("0x").pop(), 5, 3);

            console.log(jwtDecoded);

            return (
              <Credential
                key={i}
                attributes={jwtDecoded.vc.credentialSubject.foo}
                credentialType={jwtDecoded.vc.type[0]}
                issuanceDate={issuanceDate}
                issuer={issuer}
                jwt={jwt}
                title={jwtDecoded.vc.credentialSubject.title || "Know Your Customer Check"} // hardcoding for demo purposes, add title in credentialSubject for demo
                viewType={CredentialViewTypes.COLLAPSIBLE}
              />
            );
          })
        : isValidating
        ? "Loading..."
        : "You currently have no credentials"}
    </>
  );
};

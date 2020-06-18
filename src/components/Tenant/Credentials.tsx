import * as React from "react";
import useSWR from "swr";
import jwtDecode from "jwt-decode";
import { Heading } from "rimble-ui";
import { TrustAgencyContext } from "../../context/TrustAgentProvider";
import { TrustAgencyService } from "../../services/TrustAgencyService";
import { Credential, CredentialViewTypes } from "./Credential";

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
          })
        : isValidating
        ? "Loading..."
        : "You currently have no credentials"}
    </>
  );
};

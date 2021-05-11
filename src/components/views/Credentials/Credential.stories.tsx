import React from "react";
import { storiesOf } from "@storybook/react";
import { EXAMPLE_VCS } from "vc-schema-tools";
import { Credential, CredentialViewTypes } from "./Credential";
import { IdentityThemeProvider } from "../../../themes/IdentityTheme";
import { BrowserRouter } from "react-router-dom";

const farFutureDate = new Date("05 October 2081 14:48 UTC");
const pastDate = new Date("05 October 2020 14:48 UTC");

const diplomaVc = {
  ...JSON.parse(EXAMPLE_VCS.DiplomaCredential),
  proof: {
    jwt:
      "eyJ0eXAiOiJKV1QiLCJhbGciOiJFUzI1NkstUiJ9.eyJpYXQiOjE1OTE4MDExNzAsInZjIjp7IkBjb250ZXh0IjpbImh0dHBzOi8vd3d3LnczLm9yZy8yMDE4L2NyZWRlbnRpYWxzL3YxIiwiaHR0cHM6Ly93d3cudzMub3JnLzIwMTgvY3JlZGVudGlhbHMvZXhhbXBsZXMvdjEiXSwidHlwZSI6WyJWZXJpZmlhYmxlQ3JlZGVudGlhbCJdLCJjcmVkZW50aWFsU3ViamVjdCI6eyJmb28iOnsiYmFyIjoxMjMsImJheiI6dHJ1ZX19fSwibmJmIjpudWxsLCJzdWIiOiJkaWQ6ZXRocjpyaW5rZWJ5OjB4YWRjYzUzMjJlNWYyZDVmNGIzODNhOGU0OGVhMmQ4Y2Y2NGJkZmJmMiIsImlzcyI6ImRpZDpldGhyOnJpbmtlYnk6MHhhZGNjNTMyMmU1ZjJkNWY0YjM4M2E4ZTQ4ZWEyZDhjZjY0YmRmYmYyIn0.Xt7g2BgL9qxukk4merdNASqgXgtxZcD0JVCXnnf_F6d9N0j1q6q7tKIu3VxgnTlZzUNFmIsruD59SFe9yAl7OAA",
  },
};

const emptyAdditionalDetails = {
  didListings: [],
  schemaVerified: false
}

const diplomaAdditionalDetails = {
  didListings: [
    { did: "did:ethr:rinkeby:0x9fb04797cc0b1711c86b960105e0c3ed3f9cb749", domains: ["sertouniversity.id"] },
  ],
  schemaVerified: true,
};

const diplomaAdditionalDetailsSchemaMismatch = {
  didListings: [
    { did: "did:ethr:rinkeby:0x9fb04797cc0b1711c86b960105e0c3ed3f9cb749", domains: ["sertouniversity.id"] },
  ],
  schemaVerified: false,
};

const diplomaVcsWithFutureExpiration = { ...diplomaVc, expirationDate: farFutureDate };
const diplomaVcWithPastExpiration = { ...diplomaVc, expirationDate: pastDate };

const contentPubVc = {
  ...JSON.parse(EXAMPLE_VCS.ContentPublishCredential),
  proof: {
    jwt:
      "eyJ0eXAiOiJKV1QiLCJhbGciOiJFUzI1NksifQ.eyJ2YyI6eyJjcmVkZW50aWFsU3ViamVjdCI6eyJwdWJsaXNoZWRDb250ZW50Ijp7ImlkZW50aWZpZXIiOiI5ZGU3ZGMxYi05Yjc0LTRjNGItYjQwOC0zZjQ1OTA0ZjFkZmUiLCJ2ZXJzaW9uSWRlbnRpZmllciI6ImNlZjFkYTU1LThhOGQtNGQ4Ni05YzQwLTE0ZjAzZjQxZmEwZCIsImhlYWRsaW5lIjoibmV3IHBvc3QgdGVzdCB3aXRoIG5ldyB0aXRsZSIsImRlc2NyaXB0aW9uIjoiIiwidXJsIjoiaHR0cDovL2xvY2FsLmNpdmlsLmNvLzIwMjAvMDQvMjcvbmV3LXBvc3QtdGVzdC13aXRoLW5ldy11cmwvIiwiZGF0ZU1vZGlmaWVkIjoiMjAyMC0xMS0xMSAwNjoyNToxOCIsImRhdGVQdWJsaXNoZWQiOiIyMDIwLTA0LTI4IDAyOjA2OjIxIiwicHVibGlzaGVyIjp7ImlkZW50aWZpZXIiOiJkaWQ6ZXRocjpyaW5rZWJ5OjB4N2QwZjdhNmZjOTQ3OWIyNzQ4OGQxNmZiZmFmY2ZlYjYwOWY3OTczZiIsIm5hbWUiOiJMb2NhbCBDaXZpbCIsInVybCI6Imh0dHA6Ly9sb2NhbC5jaXZpbC5jbyJ9LCJhdXRob3IiOnsiaWRlbnRpZmllciI6ImRpZDpldGhyOnJpbmtlYnk6MHg3ZDBmN2E2ZmM5NDc5YjI3NDg4ZDE2ZmJmYWZjZmViNjA5Zjc5NzNmI3VzZXItMiIsIm5hbWUiOiJNci4gQWRtaW4ifSwia2V5d29yZHMiOlsidW5jYXRlZ29yaXplZCIsInRlc3QiXSwiaW1hZ2UiOm51bGwsInJhd0NvbnRlbnRIYXNoIjoiMHhiM2EyN2QzZTE0NDBmNjI5OGYzMDMyZmY2ZDAxYzlhNGNiNjg4MjY5YzU4ZjIyNDQxY2I2Y2Y5MDhiZmEwMzcxIiwicmF3Q29udGVudFVSTCI6Imh0dHA6Ly9sb2NhbC5jaXZpbC5jbz9jb25zZW5zeXNfdmNfcHVibGlzaGVyX3V1aWQ9Y2VmMWRhNTUtOGE4ZC00ZDg2LTljNDAtMTRmMDNmNDFmYTBkJmNvbnNlbnN5c192Y19wdWJsaXNoZXJfcmF3X2NvbnRlbnQ9dHJ1ZSJ9fSwiQGNvbnRleHQiOlsiaHR0cHM6Ly93d3cudzMub3JnLzIwMTgvY3JlZGVudGlhbHMvdjEiLCJodHRwczovL2V4YW1wbGUuY29tL0BUT0RPL2FydGljbGUtcHVibGlzaC92MSJdLCJ0eXBlIjpbIlZlcmlmaWFibGVDcmVkZW50aWFsIiwiQXJ0aWNsZVB1Ymxpc2hDcmVkZW50aWFsIl19LCJzdWIiOiJkaWQ6ZXRocjpyaW5rZWJ5OjB4N2QwZjdhNmZjOTQ3OWIyNzQ4OGQxNmZiZmFmY2ZlYjYwOWY3OTczZiIsIm5iZiI6MTYwNTA3NTkxOCwiaXNzIjoiZGlkOmV0aHI6cmlua2VieToweDdkMGY3YTZmYzk0NzliMjc0ODhkMTZmYmZhZmNmZWI2MDlmNzk3M2YifQ.kAupFuoTJXBz7zhL5fedV1NwF7tIhE00O-EbCQEeNikeBrD49Xk106dGJDNTtAshtcZlY4BTDvy176wfosvuTA",
  },
};

storiesOf("Credential", module)
  .addDecorator((story) => (
    <BrowserRouter>
      <IdentityThemeProvider>{story()}</IdentityThemeProvider>
    </BrowserRouter>
  ))
  .add("List view", () => <Credential vc={diplomaVc} viewType={CredentialViewTypes.LIST} />)
  .add("Collapsible view", () => <Credential vc={diplomaVc} viewType={CredentialViewTypes.COLLAPSIBLE} />)
  .add("Full view", () => <Credential vc={diplomaVc} />)
  .add("Full view with additional details", () => (
    <Credential vc={diplomaVc} additionalVCData={diplomaAdditionalDetails} />
  ))
  .add("Full view with additional details and unexpired", () => (
    <Credential vc={diplomaVcsWithFutureExpiration} additionalVCData={diplomaAdditionalDetails} />
  ))
  .add("Full view with additional details and expired", () => (
    <Credential vc={diplomaVcWithPastExpiration} additionalVCData={diplomaAdditionalDetails} />
  ))
  .add("Full view with additional details schema mismatch", () => (
    <Credential vc={diplomaVcsWithFutureExpiration} additionalVCData={diplomaAdditionalDetailsSchemaMismatch} />
  ))
  .add("Full view (nested props)", () => <Credential vc={contentPubVc} />)
  .add("Full view with empty additional details", () => (
    <Credential vc={diplomaVc} additionalVCData={emptyAdditionalDetails} />
  ));

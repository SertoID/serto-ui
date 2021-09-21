import React from "react";
import { BrowserRouter } from "react-router-dom";
import { storiesOf } from "@storybook/react";
import { IdentityThemeProvider } from "../../../../themes/IdentityTheme";
import { Identifier } from "../../../../types";
import { SertoUiProvider } from "../../../../context/SertoUiProvider";
import { createMockApiRequest } from "../../../../utils/helpers";
import { IssueVcFlow } from "./IssueVcFlow";

const IDENTIFIERS: Identifier[] = [
  { did: "did:ethr:rinkeby:0xcfa8829812f1b4fe09b27cacf7d36e4d1b5dce76", provider: "did:ethr:rinkeby", alias: "Admin" },
  {
    did: "did:ethr:rinkeby:0x88298d36e4d1b5dce76cf9b27cacf7a12f1b4fe0",
    provider: "did:ethr:rinkeby",
    alias: "Another User",
  },
  {
    did: "did:ethr:rinkeby:0x1b5dce8826e4d76cf9b27cac12f1b4fe098d3f7a",
    provider: "did:ethr:rinkeby",
    alias: "Really really really really really really long alias",
  },
  { did: "did:ethr:rinkeby:0x9812f1d36e4d1b5dce7acf76cfa882b4fe09b27c", provider: "did:ethr:rinkeby" },
];

storiesOf("Credential", module).add("IssueVc flow", () => {
  return (
    <BrowserRouter>
      <IdentityThemeProvider>
        <SertoUiProvider
          context={{
            issueVc: createMockApiRequest(),
            sendVc: createMockApiRequest(),
          }}
        >
          <IssueVcFlow identifiers={IDENTIFIERS} onComplete={() => {}} />
        </SertoUiProvider>
      </IdentityThemeProvider>
    </BrowserRouter>
  );
});

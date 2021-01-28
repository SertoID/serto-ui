import React from "react";
import { storiesOf } from "@storybook/react";
import { Identifier } from "../../../types";
import { DidSelect } from "./DidSelect";

const identifiers: Identifier[] = [
  {
    did: "did:ethr:rinkeby:0xcfa8829812f1b4fe09b27cacf7d36e4d1b5dce76",
    provider: "did:ethr:rinkeby",
    alias: "Admin",
  },
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
  {
    did: "did:ethr:rinkeby:0x9812f1d36e4d1b5dce7acf76cfa882b4fe09b27c",
    provider: "did:ethr:rinkeby",
  },
  {
    did: "did:ethr:rinkeby:0x82b4fe09b27c5dce7acbd3fa1d36e4d1bf76cfa8",
    alias: "ABC user 1",
    provider: "did:ethr:rinkeby",
    userName: "Organization ABC",
  },
  {
    did: "did:ethr:rinkeby:0xbd3fa1d36e4d1bf76cfa882b4fe09b27c5dce7ac",
    provider: "did:ethr:rinkeby",
    userName: "Organization ABC",
  },
];

storiesOf("DID Select", module)
  .add("Default", () => {
    return <DidSelect identifiers={identifiers} onChange={(value) => console.log("changed to", value)} />;
  })
  .add("Allow custom DID", () => {
    return (
      <DidSelect identifiers={identifiers} onChange={(value) => console.log("changed to", value)} allowCustom={true} />
    );
  })
  .add("Allow custom w/ default selected DID", () => {
    return (
      <DidSelect
        identifiers={identifiers}
        defaultSelectedDid="did:ethr:rinkeby:0xbd3fa1d36e4d1bf76cfa882b4fe09b27c5dce7ac"
        onChange={(value) => console.log("changed to", value)}
        allowCustom={true}
      />
    );
  });

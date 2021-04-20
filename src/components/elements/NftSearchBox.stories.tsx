import React from "react";
import { storiesOf } from "@storybook/react";
import { NftSearchBox } from "./NftSearchBox";

storiesOf("Nft Search Box", module).add("Search Box", () => {
  return <NftSearchBox onSearch={(searchVal, searchToken) => console.log(`searchValu: ${searchVal} - searchToken: ${searchToken}`)} />;
});

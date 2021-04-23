import React from "react";
import { storiesOf } from "@storybook/react";
import { CombinedSearchBar } from "./CombinedSearchBar";

storiesOf("Combined Search Box", module).add("Search Box", () => {
  return (
    <CombinedSearchBar
      onSearch={(searchVal) => console.log(`searchValu: ${searchVal}`)}
      onNftVerify={(contractAddress, tokenId) =>
        console.log(`contractAddress: ${contractAddress} - tokenId: ${tokenId}`)
      }
      onVcVerify={(vc) => console.log(`vc: ${vc}`)}
    />
  );
});

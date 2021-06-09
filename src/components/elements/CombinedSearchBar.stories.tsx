import { storiesOf } from "@storybook/react";
import { IdentityThemeProvider } from "../../themes";
import { CombinedSearchBar } from "./CombinedSearchBar";

storiesOf("Combined Search Box", module).add("Search Box", () => {
  return (
    <IdentityThemeProvider>
      <CombinedSearchBar
        onSearch={(searchVal) => console.log(`searchValu: ${searchVal}`)}
        onNftVerify={(contractAddress, tokenId) =>
          console.log(`contractAddress: ${contractAddress} - tokenId: ${tokenId}`)
        }
        onVcVerify={(vc) => console.log(`vc: ${vc}`)}
      />
    </IdentityThemeProvider>
  );
});

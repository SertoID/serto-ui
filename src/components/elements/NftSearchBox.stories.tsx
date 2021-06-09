import { storiesOf } from "@storybook/react";
import { IdentityThemeProvider } from "../../themes";
import { NftSearchBox } from "./NftSearchBox";

storiesOf("Nft Search Box", module).add("Search Box", () => {
  return (
    <IdentityThemeProvider>
      <NftSearchBox
        onSearch={(searchVal, searchToken) => console.log(`searchValu: ${searchVal} - searchToken: ${searchToken}`)}
      />
    </IdentityThemeProvider>
  );
});

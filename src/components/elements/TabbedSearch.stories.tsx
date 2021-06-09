import { storiesOf } from "@storybook/react";
import { IdentityThemeProvider } from "../../themes";
import { TabbedSearch, TabbedSearchBox } from "./TabbedSearch";
import { Tab } from "../layouts";

const tabs: Tab[] = [
  {
    tabName: "search",
    title: "Search",
    content: (
      <TabbedSearchBox
        onSearch={(value) => console.log("Search" + value)}
        placeholderText="Find a Business, Organization, Individual, DID address"
      />
    ),
  },
  {
    tabName: "vc",
    title: "Validate VC",
    content: (
      <TabbedSearchBox onSearch={(value) => console.log("Validate VC" + value)} placeholderText="Validate a VC" />
    ),
  },
  {
    tabName: "nft",
    title: "NFT Lookup",
    content: (
      <TabbedSearchBox onSearch={(value) => console.log("NFT Lookup" + value)} placeholderText="Search NFT by URL" />
    ),
  },
];

storiesOf("Tabbed Search", module).add("Tabbed Search", () => {
  return (
    <IdentityThemeProvider>
      <TabbedSearch activeTab="search" tabs={tabs} />
    </IdentityThemeProvider>
  );
});

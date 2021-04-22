import React from "react";
import { storiesOf } from "@storybook/react";
import { CombinedSearchBar } from "./CombinedSearchBar";

storiesOf("Combined Search Box", module).add("Search Box", () => {
  return <CombinedSearchBar onSearch={(searchVal, searchType) => console.log(`searchValu: ${searchVal} - searchType: ${searchType}`)} />;
});

import React from "react";
import { storiesOf } from "@storybook/react";
import { SearchBox } from "./SearchBox";

storiesOf("Search Box", module).add("Search Box", () => {
  return <SearchBox onSearch={(searchVal) => console.log(searchVal)} />;
});

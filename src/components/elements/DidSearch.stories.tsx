import { storiesOf } from "@storybook/react";
import { DidSearch } from "./DidSearch";

storiesOf("Did Search", module).add("Did Search", () => {
  return <DidSearch onSearch={(searchVal) => console.log(searchVal)} />;
});

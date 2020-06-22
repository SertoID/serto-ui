import React from "react";
import { storiesOf } from "@storybook/react";
import { Expand } from "./Expand";

storiesOf("Expand", module).add("Expand", () => {
  return <Expand>More content...</Expand>;
});

import React from "react";
import { storiesOf } from "@storybook/react";
import { HighlightedJson } from "./HighlightedJson";
import { EXAMPLE_VCS } from "../../views/Schemas/examples";

storiesOf("HighlightedJson", module).add("HighlightedJson", () => {
  return <HighlightedJson json={EXAMPLE_VCS.ContentPublishCredential} />;
});

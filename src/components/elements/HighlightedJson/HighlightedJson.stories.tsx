import React from "react";
import { storiesOf } from "@storybook/react";
import { EXAMPLE_VCS } from "vc-schema-tools";
import { HighlightedJson } from "./HighlightedJson";

storiesOf("HighlightedJson", module).add("HighlightedJson", () => {
  return <HighlightedJson json={EXAMPLE_VCS.ContentPublishCredential} />;
});

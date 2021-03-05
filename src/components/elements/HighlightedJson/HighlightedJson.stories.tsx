import React from "react";
import { storiesOf } from "@storybook/react";
import { EXAMPLE_VCS } from "vc-schema-tools";
import { HighlightedJson } from "./HighlightedJson";

storiesOf("HighlightedJson", module)
  .add("HighlightedJson (string)", () => {
    return <HighlightedJson json={EXAMPLE_VCS.ContentPublishCredential} />;
  })
  .add("HighlightedJson (object)", () => {
    return (
      <HighlightedJson
        json={{ hi: "this is a test object", numbers: [1, 2, 3, 4, 5], nestedStuff: { foo: "bar", baz: "quz?" } }}
      />
    );
  });

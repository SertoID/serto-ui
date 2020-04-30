import React from "react";
import { storiesOf } from "@storybook/react";
import { VerifiedCredential } from "./VerifiedCredential";

storiesOf("Verified Credential", module).add("Verified Credential", () => {
  return <VerifiedCredential />;
});

import { storiesOf } from "@storybook/react";
import { VerificationStatus } from "./VerificationStatus";

storiesOf("Verification Status", module).add("Verification Status", () => {
  return <VerificationStatus baseline={true} didConfig={true} />;
});

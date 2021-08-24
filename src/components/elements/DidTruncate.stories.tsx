import { storiesOf } from "@storybook/react";
import { DidTruncate } from "./DidTruncate";

storiesOf("DID Truncate", module).add("DID Truncate", () => {
  return <DidTruncate did="did:ethr:0x03a7a90b2ce54a217c14b99e24332846ea420ef5deaee8913e1ecc8200bc3579b9" />;
});

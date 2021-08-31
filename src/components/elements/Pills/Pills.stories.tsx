import { storiesOf } from "@storybook/react";
import { ExpiredPill } from ".";

storiesOf("Pills", module).add("Expired", () => {
  return <ExpiredPill />;
});

import { storiesOf } from "@storybook/react";
import { ExpiredPill } from "./Pills";

storiesOf("Pills", module).add("Expired", () => {
  return <ExpiredPill />;
});

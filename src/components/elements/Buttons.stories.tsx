import { storiesOf } from "@storybook/react";
import { UnstyledButton } from "./Buttons";

storiesOf("Buttons", module).add("Unstyled Button", () => {
  return <UnstyledButton>button</UnstyledButton>;
});

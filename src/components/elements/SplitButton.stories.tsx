import { useState } from "react";
import { storiesOf } from "@storybook/react";
import { IdentityThemeProvider } from "../../themes";
import { SplitButton } from "./SplitButton";

storiesOf("SplitButton", module).add("SplitButton", () => {
  const [loading, setLoading] = useState(false);
  const [right, setRight] = useState(0);
  function onClick() {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setRight(right + 1);
    }, 500);
  }
  return (
    <IdentityThemeProvider>
      <SplitButton leftWidth={100} rightContent={right} onClick={onClick} isLoading={loading}>
        Click Me
      </SplitButton>
    </IdentityThemeProvider>
  );
});

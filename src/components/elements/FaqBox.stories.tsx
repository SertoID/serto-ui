import { storiesOf } from "@storybook/react";
import { Box, Text } from "rimble-ui";
import { FaqBox } from "./FaqBox";

storiesOf("FAQ Box", module).add("FAQ Box", () => {
  return (
    <Box bg="#fff" p={3}>
      <FaqBox heading="How do I reference a Serto Schema to include in my VC?">
        <Text>
          Schemas hosted on Serto Schemas can be referenced by their URL and included in your VCs to identify them as
            instances of that schema.
        </Text>
      </FaqBox>
    </Box>
  );
});

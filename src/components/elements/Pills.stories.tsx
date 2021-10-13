import { storiesOf } from "@storybook/react";
import { IdentityThemeProvider } from "../../themes";
import { Box } from "rimble-ui";
import { ExpiredPill, SocialPills } from "./Pills";

storiesOf("Pills", module)
  .add("Expired", () => {
    return <ExpiredPill />;
  })
  .add("Social", () => {
    return (
      <IdentityThemeProvider>
        <Box mb={3}>
          <SocialPills platform="linkedin" />
        </Box>
        <Box mb={3}>
          <SocialPills platform="medium" />
        </Box>
        <Box mb={3}>
          <SocialPills platform="twitter" />
        </Box>
        <Box mb={3}>
          <SocialPills platform="youtube" />
        </Box>
        <Box mb={3}>
          <SocialPills platform="facebook" />
        </Box>
      </IdentityThemeProvider>
    );
  });

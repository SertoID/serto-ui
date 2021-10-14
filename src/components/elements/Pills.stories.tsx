import { storiesOf } from "@storybook/react";
import { IdentityThemeProvider } from "../../themes";
import { Box } from "rimble-ui";
import { ExpiredPill, SocialPills } from "./Pills";
import { LinkedId } from "../../types";

const linkedId: LinkedId = {
  linkedId: "serto_id",
  platform: "Twitter",
  proofUrl: "https://twitter.com/serto_id/status/1445400725161451529",
};

storiesOf("Pills", module)
  .add("Expired", () => {
    return <ExpiredPill />;
  })
  .add("Social", () => {
    return (
      <IdentityThemeProvider>
        <Box mb={3}>
          <SocialPills linkedId={linkedId} />
        </Box>
      </IdentityThemeProvider>
    );
  });

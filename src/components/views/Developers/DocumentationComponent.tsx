import * as React from "react";
import { Box, Button, Text } from "rimble-ui";
import { colors } from "../../elements/themes";
import { links } from "../../../constants";
import { SecondaryHeader } from "../../elements/layouts";

export const DocumentationComponent: React.FunctionComponent = (props) => {
  return (
    <>
      <SecondaryHeader heading="Documentation">
        <Text fontSize={2} color={colors.silver}>
          Learn how to use TrustAgent with these resources
        </Text>
      </SecondaryHeader>
      <Box mb={2}>
        <Button.Text as="a" href={"mailto:" + links.EMAIL_SUPPORT} target="\_blank" size="small">
          Contact us for help
        </Button.Text>
      </Box>
      <Box mb={2}>
        <Button.Text as="a" href={links.DOCUMENTATION} target="\_blank" size="small">
          View Documentation
        </Button.Text>
      </Box>
    </>
  );
};

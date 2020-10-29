import * as React from "react";
import { routes } from "../../../constants";
import { Box, Button, Flex, Text } from "rimble-ui";
import { H2 } from "../../elements/layouts";
import { baseColors } from "../../elements/themes";
import { links } from "../../../constants";

export const OnboardingPage: React.FunctionComponent = (props) => {
  return (
    <Flex flexDirection="column" height="100vh">
      <Box bg={baseColors.white} borderRadius={1} m={3} mb={0} p={3}>
        <Button.Text as="a" href={links.DOCUMENTATION}>
          Help Docs?
        </Button.Text>
      </Box>
      <Box bg={baseColors.white} borderRadius={1} m={3} p={6} flexGrow="1">
        <H2 color={baseColors.blurple} mt={0} textAlign="center">
          Welcome!
        </H2>
        <Box mx="auto" width="350px">
          <Box border={1} mb={4} p={5}>
            <Text fontSize={2} fontWeight={3}>
              Create an organization
            </Text>
            <Text.p fontSize={1} lineHeight="copy">
              Create your organization with your current account as its admin account.
            </Text.p>
            <Text.p fontSize={1} lineHeight="copy">
              Your organization can issue and receive credentials. You can also invite other accounts to join your
              organization.
            </Text.p>
            <Button as="a" href={routes.CREATE_ORGANIZATION} size="small">
              Create organization
            </Button>
          </Box>
          <Text fontSize={2} textAlign="center">
            Are you looking to join an existing organization? Contact your admin to get an invite link.
          </Text>
        </Box>
      </Box>
    </Flex>
  );
};

import * as React from "react";
import { Box, Flex, Text } from "rimble-ui";
import { LogOut } from "../../../auth/LogOut";
import { Nav, baseColors, fonts } from "../../";

export interface GlobalLayoutProps {
  url: string;
}

export const GlobalLayout: React.FunctionComponent<GlobalLayoutProps> = (props) => {
  return (
    <Flex p={2}>
      <Box width={8} p={2}>
        <Flex alignItems="center" bg={baseColors.white} borderRadius={1} mb={3} p={3} height="4rem">
          <Text.span fontFamily={fonts.sansSerif} fontSize={2} fontWeight={3}>
            Product Name
          </Text.span>
        </Flex>
        <Nav url={props.url} />
        <LogOut />
      </Box>
      <Box flexGrow="1" p={2}>
        {props.children}
      </Box>
    </Flex>
  );
};

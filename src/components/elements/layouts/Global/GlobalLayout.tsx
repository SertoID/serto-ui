import * as React from "react";
import { Box, Flex, Text } from "rimble-ui";
import { LogOut } from "../../../auth/LogOut";
import { Nav, baseColors, fonts } from "../../";

export interface GlobalLayoutProps {
  url: string;
}

export const GlobalLayout: React.FunctionComponent<GlobalLayoutProps> = (props) => {
  return (
    <Flex p={10}>
      <Box width={"220px"} p={10}>
        <Flex alignItems={"center"} bg={baseColors.white} borderRadius={4} mb={"17px"} p={"16px"} height={"4.5rem"}>
          <Text.span fontFamily={fonts.sansSerif} fontSize={"16px"} fontWeight={"600"}>
            Product Name
          </Text.span>
        </Flex>
        <Nav url={props.url} />
        <LogOut />
      </Box>
      <Box flexGrow={"1"} p={10}>
        {props.children}
      </Box>
    </Flex>
  );
};

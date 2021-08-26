import * as React from "react";
import { Box, Flex } from "rimble-ui";
import { createGlobalStyle } from "styled-components";
import { Nav } from "./Nav";
import { fonts } from "../../../themes";

export const GlobalStyle = createGlobalStyle`
  html {
    box-sizing: border-box;
  }
  body {
    background-color: #F6F6FE;
    font-family: ${fonts.sansSerif};
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    margin: 0;
  }
  *, :after, :before {
    box-sizing: inherit;
  }
`;

export interface GlobalLayoutProps {
  hasPermissions: boolean;
  section: string;
  url: string;
  sidebarBottomContents?: React.ReactNode;
  sidebarTopContents?: React.ReactNode;
}

export const GlobalLayout: React.FunctionComponent<GlobalLayoutProps> = (props) => {
  return (
    <Box p={5} height="100vh">
      <Flex bottom={4} flexDirection="column" justifyContent="space-between" position="fixed" top={5} width="232px">
        <Box>
          {props.sidebarTopContents}
          <Nav currentUrl={props.url} hasPermissions={props.hasPermissions} currentSection={props.section} />
        </Box>
        <Box>{props.sidebarBottomContents}</Box>
      </Flex>
      <Flex flexDirection="column" minHeight="calc(100vh - 64px)" flexGrow="1" ml={8}>
        {props.children}
      </Flex>
    </Box>
  );
};

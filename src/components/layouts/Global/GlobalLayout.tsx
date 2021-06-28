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
  url: string;
  sidebarBottomContents?: React.ReactNode;
  sidebarTopContents?: React.ReactNode;
}

export const GlobalLayout: React.FunctionComponent<GlobalLayoutProps> = (props) => {
  return (
    <Box p={5} height="100vh">
      <Flex flexDirection="column" justifyContent="space-between" position="fixed" width="232px">
        <Box>
          {props.sidebarTopContents}
          <Nav currentUrl={props.url} />
        </Box>
        <Box>{props.sidebarBottomContents}</Box>
      </Flex>
      <Flex flexDirection="column" minHeight="calc(100vh - 64px)" flexGrow="1" ml={8}>
        {props.children}
      </Flex>
    </Box>
  );
};

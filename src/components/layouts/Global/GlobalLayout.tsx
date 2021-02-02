import * as React from "react";
import { Box, Flex } from "rimble-ui";
import { createGlobalStyle } from "styled-components";
import { Nav } from "./Nav";
import { SertoUiContext, SertoUiContextInterface } from "../../../context/SertoUiContext";
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
  activeTenantID?: string;
  url: string;
  sidebarBottomContents?: React.ReactNode;
  sidebarTopContents?: React.ReactNode;
}

export const GlobalLayout: React.FunctionComponent<GlobalLayoutProps> = (props) => {
  const context = React.useContext<SertoUiContextInterface>(SertoUiContext);
  return (
    <Flex p={4} height="100vh">
      <Flex flexDirection="column" justifyContent="space-between" width={8} p={2} mr={2} minWidth={8}>
        <Box>
          {props.sidebarTopContents}
          <Nav currentUrl={props.url} navItems={context.navItems} />
        </Box>
        <Box>{props.sidebarBottomContents}</Box>
      </Flex>
      <Flex flexDirection="column" height="98vh" flexGrow="1" p={2}>
        {props.children}
      </Flex>
    </Flex>
  );
};

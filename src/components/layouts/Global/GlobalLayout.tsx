import * as React from "react";
import { Box, Flex } from "rimble-ui";
import { createGlobalStyle } from "styled-components";
import { Nav } from "./Nav";
import { colors, fonts } from "../../../themes";

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

export interface BannerTypes {
  content: React.ReactNode;
  color?: string;
  hide?: boolean;
}

export interface GlobalLayoutProps {
  banner?: BannerTypes;
  hasPermissions: boolean;
  section: string;
  url: string;
  sidebarBottomContents?: React.ReactNode;
  sidebarTopContents?: React.ReactNode;
}

export const GlobalLayout: React.FunctionComponent<GlobalLayoutProps> = (props) => {
  const showBanner = props.banner && !props.banner.hide;
  const top = showBanner ? "86px" : 5;
  return (
    <>
      {showBanner && (
        <Box bg={props.banner?.color || colors.primary.base} p={3} position="fixed" width="100%">
          <Flex alignItems="center" justifyContent="center">
            {props.banner?.content}
          </Flex>
        </Box>
      )}
      <Box p={5} height="100vh" pt={top}>
        <Flex bottom={4} flexDirection="column" justifyContent="space-between" position="fixed" top={top} width="232px">
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
    </>
  );
};

import * as React from "react";
import styled from "styled-components";
import { Box, Text } from "rimble-ui";
import { baseColors, colors } from "../../../themes";

const TabsHeader = styled.ul`
  align-items: center;
  background-color: ${baseColors.white};
  border-bottom: 2px solid ${colors.primary.border};
  display: flex;
  list-style: none;
  justify-content: flex-start;
  margin-bottom: 0;
  padding: 0 8px;
  width: 100%;
`;

interface TabTitleProps {
  active: boolean;
}
const TabTitle = styled.li<TabTitleProps>`
  border-bottom: ${(props) => (props.active ? `2px solid ${colors.primary.base}` : "2px solid transparent")};
  color: ${(props) => (props.active ? colors.primary.base : colors.silver)};
  cursor: ${(props) => (props.active ? "auto" : "pointer")};
  margin: 0 16px -2px;
`;

export interface TabsProps {
  activeTabName: string;
  tabs: Tab[];
  subHeader?: JSX.Element;
  onTabClicked(tabName: string): void;
}

export interface Tab {
  tabName: string;
  title: string;
  content: JSX.Element;
}

export const Tabs: React.FunctionComponent<React.PropsWithChildren<TabsProps>> = (props) => {
  return (
    <Box bg={baseColors.white} borderRadius={1} flexGrow="1">
      <TabsHeader>
        {props.tabs.map((tab: any, i: number) => {
          const active = (!props.activeTabName && i === 0) || props.activeTabName === tab.tabName;
          return (
            <TabTitle key={i} onClick={() => props.onTabClicked(tab.tabName)} active={active}>
              <Text mb={2} fontSize={2} fontWeight={3}>
                {tab.title}
              </Text>
            </TabTitle>
          );
        })}
      </TabsHeader>
      {props.subHeader}
      {props.tabs.map((tab: any, i: number) => {
        if (tab.tabName !== props.activeTabName) {
          return undefined;
        }
        return <React.Fragment key={i}>{tab.content}</React.Fragment>;
      })}
    </Box>
  );
};

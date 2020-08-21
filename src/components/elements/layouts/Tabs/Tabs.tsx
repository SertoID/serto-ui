import * as React from "react";
import { Text } from "rimble-ui";
import styled from "styled-components";
import { baseColors } from "../../";

const TabsContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${baseColors.white};
`;

const TabsHeader = styled.ul`
  list-style: none;
  display: flex;
  background-color: ${baseColors.white};
  border-bottom: 1px solid;
  border-color: #cccccc;
  justify-content: flex-start;
  width: 100%;
  align-items: center;
`;

interface TabTitleProps {
  active: boolean;
}
const TabTitle = styled.li<TabTitleProps>`
  color: ${(props) => (props.active ? baseColors.blurple : "black")};
  border-bottom: ${(props) => (props.active ? `1px solid ${baseColors.blurple}` : "none")};
  margin-bottom: 0;
  margin-right: 10px;
`;

export interface TabsProps {
  activeTabName: String;
  tabs: Tab[];
  onTabClicked(tabName: String): void;
}

export interface Tab {
  tabName: String;
  title: String;
  content: JSX.Element;
}

export const Tabs: React.FunctionComponent<React.PropsWithChildren<TabsProps>> = (props) => {
  return (
    <TabsContainer>
      <TabsHeader>
        {props.tabs.map((tab, i) => {
          const active = (!props.activeTabName && i === 0) || props.activeTabName === tab.tabName;
          return (
            <TabTitle onClick={() => props.onTabClicked(tab.tabName)} active={active}>
              <Text mb={1} fontSize={2} fontWeight={2}>
                {tab.title}
              </Text>
            </TabTitle>
          );
        })}
      </TabsHeader>
      {props.tabs.map((tab) => {
        if (tab.tabName !== props.activeTabName) {
          return undefined;
        }
        return tab.content;
      })}
    </TabsContainer>
  );
};

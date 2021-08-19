import * as React from "react";
import styled from "styled-components";
import { generatePath, Link } from "react-router-dom";
import { Box, Flex, Text } from "rimble-ui";
import { SertoUiContext, SertoUiContextInterface } from "../../../context/SertoUiContext";
import { baseColors, colors } from "../../../themes";

const NavItemStyled = styled.div`
  a {
    border-radius: 4px;
    display: block;
    padding: 16px;
    text-decoration: none;

    &:hover {
      background-color: ${baseColors.white};
      text-decoration: none;

      svg {
        fill: ${colors.primary.base};
      }
    }
  }
`;

export interface NavItemProps {
  icon: React.FunctionComponent<any>;
  text: string;
  url: string;
  currentUrl?: string;
  subTabs?: any[];
}

const NavItem: React.FunctionComponent<NavItemProps> = (props) => {
  const { currentUrl, icon, subTabs, text, url } = props;
  const Icon = icon;

  if (currentUrl === url) {
    return (
      <Box bg={baseColors.white} p={3}>
        <Flex alignItems="center">
          <Icon color={colors.primary.base} size="16px" mr={3} />
          <Text.span color={baseColors.black} fontSize={1} fontWeight={3}>
            {text}
          </Text.span>
        </Flex>
        {subTabs?.map((tab: any, i: number) => {
          return (
            <Box key={i} pt={4}>
              <Text.span color={baseColors.black} fontSize={1} fontWeight={3}>
                {tab.text}
              </Text.span>
            </Box>
          );
        })}
      </Box>
    );
  }

  return (
    <NavItemStyled>
      <Link to={generatePath(url)}>
        <Flex alignItems="center">
          <Icon color={colors.midGray} size="16px" mr={3} />
          <Text.span color={colors.midGray} fontSize={1} fontWeight={3}>
            {text}
          </Text.span>
        </Flex>
      </Link>
    </NavItemStyled>
  );
};

export interface NavProps {
  currentUrl: string;
  navItems?: NavItemProps[];
}

export const Nav: React.FunctionComponent<NavProps> = (props) => {
  const { currentUrl } = props;
  const context = React.useContext<SertoUiContextInterface>(SertoUiContext);
  const navItems = props.navItems || context.navItems;
  return (
    <>
      {navItems.map((navItemProps) => (
        <NavItem {...navItemProps} currentUrl={currentUrl} key={navItemProps.url} />
      ))}
    </>
  );
};

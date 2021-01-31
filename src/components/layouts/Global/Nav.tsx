import * as React from "react";
import styled from "styled-components";
import { Link, generatePath } from "react-router-dom";
import { Box, Flex, Text } from "rimble-ui";
import { baseColors, colors } from "../../../themes";

const NavItemStyled = styled.div`
  padding: 10px 0;

  a {
    text-decoration: none;
    &:hover svg {
      fill: #5952ff;
    }
  }
`;

export interface NavItemProps {
  icon: React.FunctionComponent<any>;
  text: string;
  url: string;
  currentUrl?: string;
}

const NavItem: React.FunctionComponent<NavItemProps> = (props) => {
  const { currentUrl, icon, text, url } = props;
  const Icon = icon;

  if (currentUrl === url) {
    return (
      <Box py={2}>
        <Flex alignItems="center">
          <Icon color={colors.primary.base} size="16px" mr="20px" />
          <Text.span color={baseColors.black} fontSize={1} fontWeight={3}>
            {text}
          </Text.span>
        </Flex>
      </Box>
    );
  }

  return (
    <NavItemStyled>
      <Link to={generatePath(url)}>
        <Flex alignItems="center">
          <Icon color={colors.midGray} size="16px" mr="20px" />
          <Text.span color={colors.midGray} fontSize={1}>
            {text}
          </Text.span>
        </Flex>
      </Link>
    </NavItemStyled>
  );
};

export interface NavProps {
  currentUrl: string;
  navItems: NavItemProps[];
}

export const Nav: React.FunctionComponent<NavProps> = (props) => {
  const { navItems, currentUrl } = props;
  return (
    <>
      {navItems.map((navItemProps) => (
        <NavItem {...navItemProps} currentUrl={currentUrl} key={navItemProps.url} />
      ))}
    </>
  );
};

import * as React from "react";
import styled from "styled-components";
import { Link, generatePath } from "react-router-dom";
import { routes } from "../../../../constants";
import { Box, Flex, Text } from "rimble-ui";
import { Code, People, SelectAll, Send, Settings } from "@rimble/icons";
import { baseColors, colors } from "../../themes";

const NavItemStyled = styled.div`
  padding: 10px 0;

  a {
    text-decoration: none;
    &:hover svg {
      fill: #5952ff;
    }
  }
`;

interface NavItemProps {
  currentUrl: string;
  icon: any;
  text: string;
  url: string;
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
  url: string;
}

export const Nav: React.FunctionComponent<NavProps> = (props) => {
  const { url } = props;
  return (
    <>
      {/* <NavItem url={routes.FEEDS} text="Feeds" icon={Home} currentUrl={url} /> */}
      <NavItem url={routes.CREDENTIALS} text="Credentials" icon={Send} currentUrl={url} />
      <NavItem url={routes.SCHEMAS} text="Schemas" icon={SelectAll} currentUrl={url} />
      <NavItem url={routes.IDENTITIES} text="Identities" icon={People} currentUrl={url} />
      <NavItem url={routes.SETTINGS} text="Settings" icon={Settings} currentUrl={url} />
      <NavItem url={routes.DEVELOPER} text="Developer" icon={Code} currentUrl={url} />
    </>
  );
};

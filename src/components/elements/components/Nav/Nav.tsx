import * as React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { routes } from "../../../../constants";
import { Box, Flex, Text } from "rimble-ui";
import { Home, List, Inbox, Send } from "@rimble/icons";
import { baseColors, colors } from "../../";

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
  const Icon = props.icon;

  if (props.currentUrl === props.url) {
    return (
      <Box py={2}>
        <Flex alignItems="center">
          <Icon color={colors.primary.base} size="16px" mr={3} />
          <Text.span color={baseColors.black} fontSize={1} fontWeight={3}>
            {props.text}
          </Text.span>
        </Flex>
      </Box>
    );
  }

  return (
    <NavItemStyled>
      <Link to={props.url}>
        <Flex alignItems="center">
          <Icon color={colors.midGray} size="16px" mr={3} />
          <Text.span color={colors.midGray} fontSize={1}>
            {props.text}
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
      <NavItem url={routes.TENANT} text="Tenant Home" icon={Home} currentUrl={url} />
      <NavItem url={routes.FEEDS} text="Credential Feeds" icon={List} currentUrl={url} />
      <NavItem url={routes.ISSUED_CREDENTIAL} text="Issued Credentials" icon={Send} currentUrl={url} />
      <NavItem url={routes.RECEIVED_CREDENTIAL} text="Received Credentials" icon={Inbox} currentUrl={url} />
    </>
  );
};

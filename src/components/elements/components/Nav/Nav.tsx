import * as React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { routes } from "../../../../constants";
import { Box, Flex, Text } from "rimble-ui";
import { Home, Inbox, Send } from "@rimble/icons";
import { baseColors } from "../../";

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
      <Box py={"10px"}>
        <Flex alignItems={"center"}>
          <Icon color={"#5952FF"} size={"15px"} mr={"15px"} />
          <Text.span color={baseColors.black} fontSize={"14px"} fontWeight={"600"}>
            {props.text}
          </Text.span>
        </Flex>
      </Box>
    );
  }

  return (
    <NavItemStyled>
      <Link to={props.url}>
        <Flex alignItems={"center"}>
          <Icon color={"#53535F"} size={"15px"} mr={"15px"} />
          <Text.span color={"#53535F"} fontSize={"14px"}>
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
      <NavItem url={routes.TENANT} text={"Tenant Home"} icon={Home} currentUrl={url} />
      <NavItem url={routes.FEEDS} text={"Credential Feeds"} icon={Home} currentUrl={url} />
      <NavItem url={routes.ISSUED_CREDENTIAL} text={"Issued Credentials"} icon={Send} currentUrl={url} />
      <NavItem url={routes.RECEIVED_CREDENTIAL} text={"Received Credentials"} icon={Inbox} currentUrl={url} />
    </>
  );
};

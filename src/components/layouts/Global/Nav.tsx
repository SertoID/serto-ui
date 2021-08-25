import { useContext, useState } from "react";
import styled from "styled-components";
import { generatePath, Link } from "react-router-dom";
import { KeyboardArrowDown, KeyboardArrowUp } from "@rimble/icons";
import { Box, Flex, Text } from "rimble-ui";
import { SertoUiContext, SertoUiContextInterface } from "../../../context/SertoUiContext";
import { baseColors, colors } from "../../../themes";

export interface NavProps {
  currentUrl: string;
  hasPermissions?: boolean;
  navItems?: NavItemProps[];
}

export const Nav: React.FunctionComponent<NavProps> = (props) => {
  const { currentUrl } = props;
  const context = useContext<SertoUiContextInterface>(SertoUiContext);
  const navItems = props.navItems || context.navItems;
  return (
    <>
      {navItems.map((navItemProps) => (
        <NavItem {...navItemProps} currentUrl={currentUrl} key={navItemProps.url} />
      ))}
    </>
  );
};

export interface NavItemStyledProps {
  active: boolean;
  open?: boolean;
}

const NavItemStyled = styled(Box)<NavItemStyledProps>`
  a {
    background-color: ${(props) => (props.active ? baseColors.white : "none")};
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

const NavItemTabsStyled = styled(Box)<NavItemStyledProps>`
  cursor: pointer;

  &:hover {
    background-color: ${baseColors.white};
    text-decoration: none;

    svg {
      fill: ${colors.primary.base};
    }
  }

  a {
    background-color: ${(props) => (props.active ? baseColors.white : "none")};
    border-radius: 4px;
    display: block;
    padding: 8px 4px;
    text-decoration: none;

    &:hover {
      background-color: ${colors.primary.border};
      text-decoration: none;
    }
  }
`;

export interface NavItemProps {
  currentUrl?: string;
  icon: React.FunctionComponent<any>;
  subTabs?: any[];
  text: string;
  url: string;
}

const NavItem: React.FunctionComponent<NavItemProps> = (props) => {
  const { currentUrl, icon, subTabs, text, url } = props;
  const active = currentUrl?.includes(url) || false;
  const [isOpen, setIsOpen] = useState<boolean>(false);

  if (subTabs) {
    return (
      <NavItemTabsStyled
        active={active}
        open={isOpen}
        bg={active || isOpen ? baseColors.white : "none"}
        borderRadius={1}
        mb={1}
        p={1}
      >
        <Flex
          alignItems="center"
          justifyContent="space-between"
          onClick={() => setIsOpen(!isOpen)}
          p="12px"
          width="100%"
        >
          <NavItemPrimary active={active} icon={icon} text={text} />
          {isOpen ? <KeyboardArrowUp color={colors.moonGray} /> : <KeyboardArrowDown color={colors.moonGray} />}
        </Flex>
        {isOpen &&
          subTabs?.map((tab: any, i: number) => {
            return <NavItemTab key={i} tab={tab} />;
          })}
      </NavItemTabsStyled>
    );
  }

  return (
    <NavItemStyled active={active} mb={1}>
      <Link to={generatePath(url)}>
        <NavItemPrimary active={active} icon={icon} text={text} />
      </Link>
    </NavItemStyled>
  );
};

export interface NavItemPrimaryProps {
  active: boolean;
  icon: React.FunctionComponent<any>;
  text: string;
}

export const NavItemPrimary: React.FunctionComponent<NavItemPrimaryProps> = (props) => {
  const { active, icon, text } = props;
  const Icon = icon;

  return (
    <Flex alignItems="center">
      <Icon color={active ? colors.primary.base : colors.midGray} size="16px" mr={3} />
      <Text.span color={active ? baseColors.black : colors.midGray} fontSize={1} fontWeight={3}>
        {text}
      </Text.span>
    </Flex>
  );
};

export interface NavItemTabProps {
  tab: any;
}

export const NavItemTab: React.FunctionComponent<NavItemTabProps> = (props) => {
  const { tab } = props;

  return (
    <Link to={generatePath(tab.url)}>
      <Text.span color={baseColors.black} fontSize={1} fontWeight={3} px={2}>
        {tab.text}
      </Text.span>
    </Link>
  );
};

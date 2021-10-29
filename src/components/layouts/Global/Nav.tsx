import { useContext, useState, Fragment } from "react";
import { generatePath, Link } from "react-router-dom";
import { KeyboardArrowDown, KeyboardArrowUp } from "@rimble/icons";
import { Flex, Text } from "rimble-ui";
import { SertoUiContext, SertoUiContextInterface } from "../../../context/SertoUiContext";
import { baseColors, colors } from "../../../themes";
import { NavItemPrimary, NavItemStyled, NavItemTabsStyled, SubNavItemStyled } from "./NavComponents";

export interface NavProps {
  currentUrl: string;
  hasPermissions?: boolean;
  navItems?: NavItemProps[];
  currentSection?: string;
}

export const Nav: React.FunctionComponent<NavProps> = (props) => {
  const context = useContext<SertoUiContextInterface>(SertoUiContext);
  const navItems = props.navItems || context.navItems;
  return (
    <>
      {navItems?.map((navItemProps) => (
        <NavItem
          {...navItemProps}
          currentUrl={props.currentUrl}
          hasPermissions={props.hasPermissions}
          key={navItemProps.url}
          currentSection={props.currentSection}
        />
      ))}
    </>
  );
};

// props from SertoUiWrapper navItem
export interface NavItemProps {
  icon: React.FunctionComponent<any>;
  section?: string;
  subNav?: any[];
  text: string;
  url: string;
}

// props from Global Layout
export interface NavItemGlobalProps {
  currentSection?: string;
  currentUrl: string;
  hasPermissions?: boolean;
}

const NavItem: React.FunctionComponent<NavItemProps & NavItemGlobalProps> = (props) => {
  const { currentSection, currentUrl, hasPermissions, icon, section, subNav, text, url } = props;
  const sectionActive = section ? section === currentSection : url === currentUrl;
  const [isOpen, setIsOpen] = useState<boolean>(sectionActive);

  if (subNav) {
    return (
      <NavItemTabsStyled
        active={sectionActive}
        open={isOpen}
        bg={sectionActive || isOpen ? baseColors.white : "none"}
        borderRadius={1}
        mb={1}
        p={1}
      >
        <Flex
          alignItems="center"
          justifyContent="space-between"
          onClick={() => setIsOpen(!isOpen)}
          p="8px"
          width="100%"
        >
          <NavItemPrimary active={sectionActive} icon={icon} text={text} />
          {isOpen ? <KeyboardArrowUp color={colors.moonGray} /> : <KeyboardArrowDown color={colors.moonGray} />}
        </Flex>
        {isOpen &&
          subNav?.map((tab: any, i: number) => {
            const subNavActive = currentUrl === tab.url;
            if (tab.admin && !hasPermissions) {
              return <Fragment key={i}></Fragment>;
            }
            return (
              <SubNavItemStyled active={subNavActive} key={i}>
                <Link to={generatePath(tab.url)}>
                  <Text.span color={baseColors.black} fontSize={1} fontWeight={3} px={2}>
                    {tab.text}
                  </Text.span>
                </Link>
              </SubNavItemStyled>
            );
          })}
      </NavItemTabsStyled>
    );
  }

  return (
    <NavItemStyled className={sectionActive ? "active" : ""} active={sectionActive} mb={1}>
      <Link to={generatePath(url)}>
        <NavItemPrimary active={sectionActive} icon={icon} text={text} />
      </Link>
    </NavItemStyled>
  );
};

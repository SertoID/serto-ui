import styled from "styled-components";
import { Box, Flex, Text } from "rimble-ui";
import { baseColors, colors } from "../../../themes";

export interface NavItemStyledProps {
  active: boolean;
  subNavActive?: boolean;
  open?: boolean;
}

export const NavItemStyled = styled(Box)<NavItemStyledProps>`
  a {
    background-color: ${(props) => (props.active ? baseColors.white : "none")};
    border-radius: 4px;
    display: block;
    padding: 12px;
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

export const NavItemTabsStyled = styled(Box)<NavItemStyledProps>`
  cursor: pointer;

  svg {
    fill: ${(props) => (props.active ? colors.primary.base : colors.midGray)};
  }

  &:hover {
    background-color: ${baseColors.white};
    text-decoration: none;

    svg {
      fill: ${colors.primary.base};
    }
  }
`;

export const SubNavItemStyled = styled(Box)<NavItemStyledProps>`
  a {
    background-color: ${(props) => (props.active ? colors.primary.border : "none")};
    border-radius: 4px;
    color: ${colors.midGray};
    display: block;
    padding: 8px 4px;
    text-decoration: none;

    &:hover {
      background-color: ${colors.primary.border};
      text-decoration: none;
    }
  }
`;

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

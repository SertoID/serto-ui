import styled from "styled-components";
import { Box } from "rimble-ui";
import { colors } from "../../themes";

const UnstyledButtonStyled = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  margin: 0;
  padding: 0;
`;

export const HoverSvgFill = styled.span`
  &:hover svg {
    fill: ${colors.primary.base};
    transition: 250ms ease;
  }
`;

export const HoverPathFill = styled.span`
  &:hover path {
    fill: ${colors.primary.base};
    transition: 250ms ease;
  }
`;

export const HoverPathStroke = styled.span`
  &:hover path {
    stroke: ${colors.primary.base};
    transition: 250ms ease;
  }
`;

export interface ButtonsProps {
  onClick?(): void;
  [key: string]: any;
}

export const UnstyledButton: React.FunctionComponent<ButtonsProps> = (props) => {
  return (
    <Box {...props}>
      <UnstyledButtonStyled onClick={props.onClick}>
        {props.children}
      </UnstyledButtonStyled>
    </Box>
  );
};

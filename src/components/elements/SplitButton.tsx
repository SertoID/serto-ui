import * as React from "react";
import { Loader, Box, Button, Flex } from "rimble-ui";
import styled from "styled-components";
import { baseColors, colors } from "../../themes/colors";

const StyledOutlineButton = styled(Button.Outline)`
  svg {
    width: 18px;
    height: 18px;
  }
`;

const HalfButton: React.FunctionComponent<any> = (props) => (
  <StyledOutlineButton {...props} mainColor={baseColors.black} style={{ ...props.style }} size="small" />
);

export interface SplitButtonProps {
  rightContent: JSX.Element | string | number;
  icon?: string;
  style?: any;
  leftWidth?: string | number;
  isLoading?: boolean;
  disabled?: boolean;
  onClick?(): void;
}

export const SplitButton: React.FC<SplitButtonProps> = ({
  rightContent,
  icon,
  style,
  leftWidth,
  isLoading,
  disabled,
  onClick,
  children,
}) => {
  return (
    <Flex style={style}>
      <HalfButton
        borderRadius="4px 0 0 4px"
        icon={icon}
        onClick={onClick}
        style={{ paddingLeft: icon && 20, opacity: 1 }}
        disabled={disabled}
      >
        <Box width={leftWidth}>{isLoading ? <Loader style={{ overflow: "visible" }} m="auto" /> : children}</Box>
      </HalfButton>
      <HalfButton
        disabled
        borderRadius="0 4px 4px 0"
        style={{ borderLeft: 0, opacity: 1, backgroundColor: colors.nearWhite }}
      >
        {rightContent}
      </HalfButton>
    </Flex>
  );
};

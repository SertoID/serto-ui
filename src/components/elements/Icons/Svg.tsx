import * as React from "react";
import { Box } from "rimble-ui";
import { colors } from "../../../themes";

export interface SvgProps {
  color?: string | null;
  size?: number | string;
  [key: string]: any;
}

export const Svg: React.FunctionComponent<SvgProps> = (props) => {
  const color = props.color || colors.primary.base;
  const size = (props.size || 24).toString();
  return (
    <Box {...props}>
      <svg viewBox="0 0 24 24" height={size} width={size} fill={color}>
        {props.children}
      </svg>
    </Box>
  );
};

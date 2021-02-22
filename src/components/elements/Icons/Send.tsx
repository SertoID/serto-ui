import * as React from "react";
import { Svg, SvgProps } from "./";

export const Send: React.FunctionComponent<SvgProps> = (props) => {
  return (
    <Svg color={props.color} size={props.size} {...props.style}>
      <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
    </Svg>
  );
};

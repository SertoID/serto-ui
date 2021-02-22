import * as React from "react";
import { Svg, SvgProps } from "./";

export const KeyboardArrowUp: React.FunctionComponent<SvgProps> = (props) => {
  return (
    <Svg color={props.color} size={props.size} {...props.style}>
      <path d="M15.41 16.09l-4.58-4.59 4.58-4.59L14 5.5l-6 6 6 6z" />
      <path d="M0-.5h24v24H0z" fill="none" />
    </Svg>
  );
};

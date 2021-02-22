import * as React from "react";
import { Svg, SvgProps } from "./";

export const Home: React.FunctionComponent<SvgProps> = (props) => {
  return (
    <Svg color={props.color} size={props.size} {...props.style}>
      <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
      <path d="M0 0h24v24H0z" fill="none" />
    </Svg>
  );
};

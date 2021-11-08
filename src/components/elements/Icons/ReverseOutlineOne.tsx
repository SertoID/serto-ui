import * as React from "react";
import { SvgProps } from "./";

export const ReverseOutlineOne: React.FunctionComponent<SvgProps> = (props) => {
  return (
    <svg width="18" height="19" viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="9" cy="9.04729" rx="7.5" ry="7.53947" fill={props.color || "#53535F"}/>
      <path d="M10.0955 5.23509H9.02663L7.212 6.42116V7.4723L8.95206 6.33594H8.99467V12.5078H10.0955V5.23509Z" fill="white"/>
    </svg>
  );
};

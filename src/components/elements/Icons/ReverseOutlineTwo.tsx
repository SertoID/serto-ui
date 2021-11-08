import * as React from "react";
import { SvgProps } from "./";

export const ReverseOutlineTwo: React.FunctionComponent<SvgProps> = (props) => {
  return (
    <svg width="18" height="19" viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="8.99963" cy="9.04729" rx="7.5" ry="7.53947" fill={props.color || "#AAAAB5"}/>
      <path d="M6.6328 12.5078H11.4197V11.5668H8.14559V11.5135L9.5909 10.0007C10.9226 8.65483 11.3025 8.01207 11.3025 7.19886C11.3025 6.03054 10.3508 5.13565 8.9801 5.13565C7.62002 5.13565 6.6257 6.01634 6.6257 7.34446H7.67328C7.66973 6.56321 8.17399 6.05185 8.9588 6.05185C9.69743 6.05185 10.2585 6.50639 10.2585 7.23082C10.2585 7.87358 9.87499 8.33523 9.09374 9.16264L6.6328 11.7124V12.5078Z" fill="white"/>
    </svg>
  );
};

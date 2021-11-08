import * as React from "react";
import { SvgProps } from "./";

export const ReverseOutlineFour: React.FunctionComponent<SvgProps> = (props) => {
  return (
    <svg width="18" height="19" viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="8.99963" cy="9.04729" rx="7.5" ry="7.53947" fill={props.color || "#AAAAB5"}/>
      <path d="M6.27502 11.0874H9.72318V12.5078H10.7708V11.0874H11.7331V10.157H10.7708V5.23509H9.41778L6.27502 10.1996V11.0874ZM9.73028 10.157H7.42559V10.1001L9.67346 6.5419H9.73028V10.157Z" fill="white"/>
    </svg>
  );
};

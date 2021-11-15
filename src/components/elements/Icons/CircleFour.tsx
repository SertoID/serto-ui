import * as React from "react";
import { SvgProps } from ".";

export const CircleFour: React.FunctionComponent<SvgProps> = (props) => {
  return (
    <svg
      width={props.size || "34"}
      height={props.size || "34"}
      viewBox="0 0 34 34"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="16.9997" cy="16.9997" r="13.1667" fill="white" stroke="#53535F" stroke-width="2" />
      <path
        d="M11.93 21.6989H18.2134V24H20.8597V21.6989H22.4833V19.4808H20.8597V10.9091H17.3952L11.93 19.5192V21.6989ZM18.2645 19.4808H14.7169V19.3786L18.1622 13.9261H18.2645V19.4808Z"
        fill="#53535F"
      />
    </svg>
  );
};

import * as React from "react";
import { SvgProps } from "./";

export const CircleOne: React.FunctionComponent<SvgProps> = (props) => {
  return (
    <svg
      width={props.size || "34"}
      height={props.size || "34"}
      viewBox="0 0 34 34"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M30.0031 17.0007C30.0031 24.2774 24.1365 30.1673 16.9106 30.1673C9.68477 30.1673 3.81812 24.2774 3.81812 17.0007C3.81812 9.72395 9.68477 3.83398 16.9106 3.83398C24.1365 3.83398 30.0031 9.72395 30.0031 17.0007Z"
        fill="white"
        stroke="#53535F"
        stroke-width="2"
      />
      <path
        d="M19.2637 10.7431H16.6621L13.4214 12.7949V15.2495L16.4192 13.3702H16.4959V23.834H19.2637V10.7431Z"
        fill="#53535F"
      />
    </svg>
  );
};

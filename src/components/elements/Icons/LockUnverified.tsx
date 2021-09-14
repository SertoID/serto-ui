import { SvgProps } from "./";

export const LockUnverified: React.FunctionComponent<SvgProps> = (props) => {
  return (
    <svg
      width={props.size || "16"}
      height={props.size || "16"}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="8" cy="8" r="8" fill="white" />
      <path
        d="M8 10.5C8.5525 10.5 9 10.0525 9 9.5C9 8.9475 8.5525 8.5 8 8.5C7.4475 8.5 7 8.9475 7 9.5C7 10.0525 7.4475 10.5 8 10.5ZM11 6H10.5V5C10.5 3.62 9.38 2.5 8 2.5C6.62 2.5 5.5 3.62 5.5 5H6.45C6.45 4.145 7.145 3.45 8 3.45C8.855 3.45 9.55 4.145 9.55 5V6H5C4.4475 6 4 6.4475 4 7V12C4 12.5525 4.4475 13 5 13H11C11.5525 13 12 12.5525 12 12V7C12 6.4475 11.5525 6 11 6ZM11 12H5V7H11V12Z"
        fill="#E9403A"
      />
    </svg>
  );
};

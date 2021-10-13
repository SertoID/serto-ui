import { SvgProps } from "./";
import { baseColors } from "../../../themes";

export const Medium: React.FunctionComponent<SvgProps> = (props) => {
  return (
    <svg
      width={props.size || "16"}
      height={props.size || "16"}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M9.02496 7.88505C9.02496 10.3989 7.00463 12.4367 4.51256 12.4367C2.02049 12.4367 0 10.3984 0 7.88505C0 5.3717 2.02033 3.33325 4.51256 3.33325C7.00478 3.33325 9.02496 5.37124 9.02496 7.88505Z"
        fill={props.color || baseColors.black}
      />
      <path
        d="M13.975 7.88502C13.975 10.2512 12.9648 12.1702 11.7187 12.1702C10.4726 12.1702 9.4624 10.2512 9.4624 7.88502C9.4624 5.51881 10.4724 3.59985 11.7185 3.59985C12.9646 3.59985 13.9748 5.5182 13.9748 7.88502"
        fill={props.color || baseColors.black}
      />
      <path
        d="M16 7.88522C16 10.0048 15.6448 11.7241 15.2065 11.7241C14.7682 11.7241 14.4131 10.0052 14.4131 7.88522C14.4131 5.76522 14.7683 4.04639 15.2065 4.04639C15.6446 4.04639 16 5.76506 16 7.88522Z"
        fill={props.color || baseColors.black}
      />
    </svg>
  );
};

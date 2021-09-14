import { SvgProps } from ".";

export const ShareIcon: React.FunctionComponent<SvgProps> = (props) => {
  return (
    <svg
      width={props.size || "16"}
      height={props.size || "16"}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12.6667 12.6667H3.33333V8H2V12.6667C2 13.4033 2.59667 14 3.33333 14H12.6667C13.4033 14 14 13.4033 14 12.6667V8H12.6667V12.6667Z"
        fill={props.color || "#53535F"}
      />
      <path
        d="M8.66667 11.3333L8.66667 4.55333L11.0567 6.94333L12 6L8 2L4 6L4.94333 6.94333L7.33333 4.55333L7.33333 11.3333L8.66667 11.3333Z"
        fill={props.color || "#53535F"}
      />
    </svg>
  );
};

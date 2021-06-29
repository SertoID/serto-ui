import { colors } from "../../../themes";

export interface GreenCircleCheckProps {
  color?: string | undefined;
  colorCheck?: string | undefined;
  size?: number | string;
}

export const GreenCircleCheck: React.FunctionComponent<GreenCircleCheckProps> = (props) => {
  return (
    <svg
      width={props.size || "24"}
      height={props.size || "24"}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 2C6.475 2 2 6.475 2 12C2 17.52 6.475 22 12 22C17.52 22 22 17.52 22 12C22 6.475 17.52 2 12 2ZM10 17L5 12L6.415 10.585L10 14.17L17.585 6.585L19 8L10 17Z"
        fill={props.color || "#DFF6EC"}
      />
      <path
        d="M10 17L5 12L6.415 10.585L10 14.17L17.585 6.58501L19 8.00001L10 17Z"
        fill={props.colorCheck || colors.success.base}
      />
    </svg>
  );
};

import { SvgProps } from "./";

export const YouTube: React.FunctionComponent<SvgProps & { size?: number }> = (props) => {
  return (
    <svg
      width={props.size || "18"}
      height={(props.size && props.size * 0.7222) || "13"}
      viewBox="0 0 18 13"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M17.2841 1.93337C17.0806 1.17747 16.4846 0.581465 15.7287 0.377952C14.3477 0 8.82375 0 8.82375 0C8.82375 0 3.29982 0 1.91884 0.363416C1.17747 0.566929 0.56693 1.17747 0.363416 1.93337C0 3.31435 0 6.17807 0 6.17807C0 6.17807 0 9.05632 0.363416 10.4228C0.56693 11.1787 1.16293 11.7747 1.91884 11.9782C3.31436 12.3561 8.82375 12.3561 8.82375 12.3561C8.82375 12.3561 14.3477 12.3561 15.7287 11.9927C16.4846 11.7892 17.0806 11.1932 17.2841 10.4373C17.6475 9.05632 17.6475 6.1926 17.6475 6.1926C17.6475 6.1926 17.662 3.31435 17.2841 1.93337Z"
        fill={props.color || "#CE1A19"}
      />
      <path d="M7.06494 3.53247V8.8238L11.6585 6.17814L7.06494 3.53247Z" fill="#FFFFFF" />
    </svg>
  );
};

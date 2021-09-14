import { SvgProps } from "./";

export const SertoVerifiedCheckmark: React.FunctionComponent<SvgProps> = (props) => {
  return (
    <svg
      width={props.size || "55px"}
      height={props.size || "55px"}
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M41.5705 0.650533C40.5649 0.234002 39.4351 0.234002 38.4295 0.650533L13.2863 11.0652C12.2807 11.4817 11.4817 12.2807 11.0652 13.2863L0.650533 38.4295C0.234002 39.4351 0.234002 40.5649 0.650533 41.5705L11.0652 66.7137C11.4817 67.7193 12.2807 68.5183 13.2863 68.9348L38.4295 79.3495C39.4351 79.766 40.5649 79.766 41.5705 79.3495L66.7137 68.9348C67.7193 68.5183 68.5183 67.7193 68.9348 66.7137L79.3495 41.5705C79.766 40.5649 79.766 39.4351 79.3495 38.4295L68.9348 13.2863C68.5183 12.2807 67.7193 11.4817 66.7137 11.0652L41.5705 0.650533ZM34.725 44.6435L27.8713 37.6962V37.6424C26.8567 36.7669 25.556 36.3148 24.2292 36.3766C22.9024 36.4383 21.6474 37.0094 20.7149 37.9755C19.7824 38.9416 19.2413 40.2316 19.1997 41.5876C19.158 42.9437 19.619 44.2658 20.4903 45.2897L31.0345 56.0606C32.02 57.0474 33.345 57.6001 34.725 57.6001C36.105 57.6001 37.4299 57.0474 38.4155 56.0606L59.5038 34.5188C60.3752 33.4949 60.8361 32.1728 60.7945 30.8167C60.7528 29.4607 60.2117 28.1707 59.2793 27.2046C58.3468 26.2385 57.0917 25.6674 55.765 25.6057C54.4382 25.5439 53.1375 25.996 52.1229 26.8715L34.725 44.6435Z"
        fill={props.color || "#5952FF"}
      />
    </svg>
  );
};

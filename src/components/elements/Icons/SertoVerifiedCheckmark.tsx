import * as React from "react";
import { SvgProps } from "./";

export const SertoVerifiedCheckmark: React.FunctionComponent<SvgProps> = (props) => {
  return (
    <svg width="55" height="55" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M 38.4295 0.650535 C 39.4351 0.234004 40.5649 0.234005 41.5705 0.650536 L 66.7137 11.0652 C 67.7193 11.4817 68.5183 12.2807 68.9348 13.2863 L 79.3495 38.4295 C 79.766 39.4351 79.766 40.5649 79.3495 41.5705 L 68.9348 66.7137 C 68.5183 67.7193 67.7193 68.5183 66.7137 68.9348 L 41.5705 79.3495 C 40.5649 79.766 39.4351 79.766 38.4295 79.3495 L 13.2863 68.9348 C 12.2807 68.5183 11.4817 67.7193 11.0652 66.7137 L 0.650535 41.5705 C 0.234004 40.5649 0.234005 39.4351 0.650536 38.4295 L 11.0652 13.2863 C 11.4817 12.2807 12.2807 11.4817 13.2863 11.0652 L 38.4295 0.650535 Z"
        fill="#5952FF"
      />
      <path
        d="M 27.8713 37.6962 L 34.725 44.6435 L 52.1229 26.8715 C 53.1375 25.996 54.4382 25.5439 55.765 25.6057 C 57.0917 25.6674 58.3468 26.2385 59.2793 27.2046 C 60.2117 28.1707 60.7529 29.4607 60.7945 30.8167 C 60.8361 32.1728 60.3752 33.4949 59.5038 34.5188 L 38.4155 56.0606 C 37.43 57.0474 36.105 57.6001 34.725 57.6001 C 33.345 57.6001 32.02 57.0474 31.0345 56.0606 L 20.4903 45.2897 C 19.619 44.2658 19.158 42.9437 19.1997 41.5876 C 19.2413 40.2316 19.7824 38.9416 20.7149 37.9755 C 21.6474 37.0094 22.9024 36.4383 24.2292 36.3766 C 25.556 36.3148 26.8567 36.7669 27.8713 37.6424 V 37.6962 Z"
        fill="white"
      />
    </svg>
  );
};
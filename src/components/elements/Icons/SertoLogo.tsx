import * as React from "react";
import { colors } from "../../../themes";

export interface SertoLogoProps {
  color?: string;
}

export const SertoLogo: React.FunctionComponent<SertoLogoProps> = (props) => {
  const color = props.color || colors.primary.base;
  return (
    <svg width="136" height="32" viewBox="0 0 136 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M45.6698 13.9309C45.6698 13.2998 46.2442 12.9492 47.1775 12.9492C48.3622 12.9492 49.0802 13.5803 49.5828 14.492L54.1779 12.0726C52.6701 9.58304 50.0854 8.32074 47.1775 8.32074C43.444 8.32074 40.1413 10.2492 40.1413 14.0712C40.1413 20.1372 48.9725 19.1204 48.9725 21.0489C48.9725 21.7502 48.3263 22.1359 47.034 22.1359C45.4544 22.1359 44.4492 21.3995 43.9825 20.0671L39.3156 22.6618C40.7157 25.502 43.444 26.8344 47.034 26.8344C50.9111 26.8344 54.501 25.1163 54.501 21.084C54.501 14.5972 45.6698 15.9296 45.6698 13.9309Z"
        fill={color}
      />
      <path
        d="M65.5705 19.6814H78.2096C78.352 19.0152 78.4232 18.3139 78.4232 17.5776C78.4232 12.2829 74.5781 8.32074 69.38 8.32074C63.7547 8.32074 59.9095 12.3531 59.9095 17.5776C59.9095 22.8021 63.6835 26.8344 69.7716 26.8344C73.154 26.8344 75.7886 25.6072 77.5331 23.2229L73.2608 20.8035C72.5487 21.5749 71.3026 22.1359 69.8428 22.1359C67.8847 22.1359 66.2469 21.5047 65.5705 19.6814ZM65.4637 15.7543C65.9621 13.966 67.315 12.9842 69.3444 12.9842C70.9466 12.9842 72.5487 13.7206 73.1183 15.7543H65.4637Z"
        fill={color}
      />
      <path
        d="M89.6562 12.5852V9.49956H84.0397V26.8345H89.6562V18.9991C89.6562 15.5668 92.9513 14.7 95.2728 15.0467V9.15286C92.9138 9.15286 90.4051 10.2623 89.6562 12.5852Z"
        fill={color}
      />
      <path
        d="M110.458 14.0464V8.92829H106.901V3.95233L101.721 5.55175V8.92829L101.721 14.0464L101.721 20.3375C101.721 25.3134 103.69 27.4104 110.458 26.6996V21.8658C108.179 22.008 106.901 21.8658 106.901 20.3375V14.0464H110.458Z"
        fill={color}
      />
      <path
        d="M125.851 26.8344C131.275 26.8344 135.628 22.8021 135.628 17.5776C135.628 12.3531 131.275 8.32074 125.851 8.32074C120.428 8.32074 116.075 12.3531 116.075 17.5776C116.075 22.8021 120.428 26.8344 125.851 26.8344ZM125.851 21.7151C123.453 21.7151 121.609 20.0671 121.609 17.5776C121.609 15.0881 123.453 13.4401 125.851 13.4401C128.25 13.4401 130.094 15.0881 130.094 17.5776C130.094 20.0671 128.25 21.7151 125.851 21.7151Z"
        fill={color}
      />
      <path
        d="M2.25064 13.9612C3.49364 13.9612 4.50129 12.9531 4.50129 11.7096C4.50129 10.4661 3.49364 9.45801 2.25064 9.45801C1.00765 9.45801 0 10.4661 0 11.7096C0 12.9531 1.00765 13.9612 2.25064 13.9612Z"
        fill={color}
      />
      <path
        d="M7.08884 7.16823C8.33184 7.16823 9.33948 6.16016 9.33948 4.91665C9.33948 3.67314 8.33184 2.66507 7.08884 2.66507C5.84584 2.66507 4.8382 3.67314 4.8382 4.91665C4.8382 6.16016 5.84584 7.16823 7.08884 7.16823Z"
        fill={color}
      />
      <path
        d="M15.1745 4.50316C16.4175 4.50316 17.4251 3.49509 17.4251 2.25158C17.4251 1.00807 16.4175 0 15.1745 0C13.9315 0 12.9238 1.00807 12.9238 2.25158C12.9238 3.49509 13.9315 4.50316 15.1745 4.50316Z"
        fill={color}
      />
      <path
        d="M23.2497 7.19603C24.4927 7.19603 25.5003 6.18796 25.5003 4.94445C25.5003 3.70094 24.4927 2.69287 23.2497 2.69287C22.0067 2.69287 20.999 3.70094 20.999 4.94445C20.999 6.18796 22.0067 7.19603 23.2497 7.19603Z"
        fill={color}
      />
      <path
        d="M28.0635 14.0064C29.3065 14.0064 30.3142 12.9983 30.3142 11.7548C30.3142 10.5113 29.3065 9.5032 28.0635 9.5032C26.8205 9.5032 25.8129 10.5113 25.8129 11.7548C25.8129 12.9983 26.8205 14.0064 28.0635 14.0064Z"
        fill={color}
      />
      <path
        d="M15.1501 13.5234C15.5962 13.5227 16.0325 13.6545 16.4037 13.902C16.7749 14.1495 17.0644 14.5017 17.2354 14.9139C17.4064 15.3261 17.4514 15.7798 17.3645 16.2175C17.2776 16.6553 17.0629 17.0574 16.7474 17.373C16.432 17.6886 16.03 17.9034 15.5925 17.9903C15.1549 18.0772 14.7014 18.0323 14.2893 17.8612C13.8773 17.6901 13.5253 17.4005 13.2779 17.0291C13.0305 16.6577 12.8988 16.2213 12.8995 15.775C12.8995 15.1778 13.1366 14.6051 13.5587 14.1828C13.9807 13.7606 14.5532 13.5234 15.1501 13.5234ZM15.1501 9.03412C13.8166 9.03412 12.5131 9.42975 11.4044 10.171C10.2957 10.9122 9.43161 11.9657 8.92146 13.1983C8.41132 14.4309 8.27802 15.7871 8.53842 17.0955C8.79882 18.4038 9.44123 19.6055 10.3844 20.5486C11.3275 21.4917 12.5291 22.1337 13.837 22.3936C15.145 22.6534 16.5006 22.5194 17.7323 22.0084C18.9641 21.4974 20.0167 20.6324 20.7571 19.5228C21.4974 18.4133 21.8922 17.109 21.8915 15.775C21.8888 13.9874 21.1775 12.2739 19.9138 11.0103C18.65 9.74663 16.9369 9.03596 15.1501 9.03412Z"
        fill={color}
      />
      <path
        d="M15.1502 31.5499C11.8534 31.5622 8.6365 30.5357 5.95576 28.616C3.27501 26.6963 1.26656 23.9809 0.215327 20.8549C0.200226 20.8109 0.194111 20.7643 0.197343 20.7179C0.200575 20.6715 0.213089 20.6262 0.234144 20.5847C0.255199 20.5432 0.284365 20.5064 0.319913 20.4764C0.355461 20.4464 0.396667 20.4239 0.441087 20.4101L4.06365 19.2704C4.1498 19.2439 4.24289 19.2519 4.32326 19.2927C4.40363 19.3336 4.46497 19.4041 4.49433 19.4893C5.26575 21.6999 6.70535 23.6158 8.61366 24.9714C10.522 26.327 12.8045 27.0552 15.1449 27.0552C17.4854 27.0552 19.7679 26.327 21.6762 24.9714C23.5845 23.6158 25.0241 21.6999 25.7956 19.4893C25.8249 19.4041 25.8863 19.3336 25.9666 19.2927C26.047 19.2519 26.1401 19.2439 26.2262 19.2704L29.8453 20.4101C29.8901 20.4235 29.9316 20.4458 29.9676 20.4756C30.0035 20.5055 30.033 20.5423 30.0544 20.5838C30.0758 20.6253 30.0886 20.6707 30.0921 20.7173C30.0956 20.7639 30.0896 20.8107 30.0746 20.8549C29.0225 23.9783 27.0153 26.6916 24.337 28.611C21.6586 30.5303 18.4447 31.5584 15.1502 31.5499Z"
        fill={color}
      />
    </svg>
  );
};

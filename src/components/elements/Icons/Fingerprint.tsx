export interface FingerprintProps {
  size?: string;
}

export const Fingerprint: React.FunctionComponent<FingerprintProps> = (props) => {
  return (
    <svg
      width={props.size || "16"}
      height={props.size || "16"}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M11.8735 2.97992C11.8202 2.97992 11.7702 2.96659 11.7202 2.94325C10.4435 2.28325 9.33354 1.99992 8.00687 1.99992C6.68354 1.99992 5.43687 2.31659 4.29354 2.93992C4.1302 3.02659 3.9302 2.96992 3.8402 2.80659C3.75354 2.64325 3.8102 2.44325 3.97354 2.35325C5.21687 1.67659 6.57354 1.33325 8.00687 1.33325C9.42687 1.33325 10.6669 1.64659 12.0269 2.34992C12.1902 2.43325 12.2535 2.63659 12.1702 2.79992C12.1102 2.91325 11.9935 2.97992 11.8735 2.97992V2.97992ZM2.33354 6.47992C2.26687 6.47992 2.2002 6.45992 2.1402 6.41992C1.9902 6.31325 1.95354 6.10659 2.0602 5.95659C2.7202 5.02325 3.56354 4.28992 4.56354 3.77325C6.6602 2.68992 9.3402 2.68659 11.4402 3.76659C12.4369 4.27992 13.2769 5.00659 13.9402 5.93325C14.0469 6.08325 14.0135 6.28992 13.8635 6.39659C13.7135 6.50325 13.5035 6.46992 13.3969 6.31992C12.7969 5.47992 12.0369 4.81992 11.1369 4.35992C9.22354 3.37659 6.7802 3.37992 4.8702 4.36659C3.96687 4.83325 3.20354 5.49659 2.60687 6.34325C2.5402 6.43325 2.43687 6.47992 2.33354 6.47992V6.47992ZM6.50354 14.5233C6.41687 14.5233 6.33354 14.4899 6.26687 14.4233C5.6902 13.8399 5.37687 13.4699 4.92687 12.6666C4.46687 11.8466 4.22354 10.8433 4.22354 9.76992C4.22354 7.78992 5.91687 6.17659 8.0002 6.17659C10.0835 6.17659 11.7769 7.78659 11.7769 9.76992C11.7769 9.95325 11.6269 10.1033 11.4435 10.1033C11.2602 10.1033 11.1102 9.95325 11.1102 9.76992C11.1102 8.15659 9.71687 6.84325 8.0002 6.84325C6.28687 6.84325 4.8902 8.15659 4.8902 9.76992C4.8902 10.7299 5.10354 11.6166 5.50687 12.3399C5.93687 13.1066 6.22354 13.4366 6.73687 13.9533C6.86687 14.0833 6.86687 14.2966 6.73354 14.4233C6.67354 14.4933 6.58687 14.5233 6.50354 14.5233V14.5233ZM11.2802 13.2899C10.4869 13.2899 9.7902 13.0899 9.21354 12.6999C8.22354 12.0266 7.6302 10.9333 7.6302 9.77325C7.6302 9.58992 7.7802 9.43992 7.96354 9.43992C8.14687 9.43992 8.29687 9.58992 8.29687 9.77325C8.29687 10.7099 8.7802 11.5966 9.5902 12.1466C10.0602 12.4666 10.6135 12.6233 11.2802 12.6233C11.4402 12.6233 11.7102 12.6066 11.9769 12.5599C12.1569 12.5266 12.3302 12.6499 12.3635 12.8299C12.3969 13.0099 12.2735 13.1833 12.0935 13.2166C11.7035 13.2866 11.3735 13.2899 11.2802 13.2899V13.2899ZM9.93687 14.6666C9.90687 14.6666 9.87687 14.6633 9.8502 14.6533C8.78687 14.3633 8.09354 13.9699 7.37354 13.2533C6.44354 12.3266 5.9302 11.0899 5.9302 9.77325C5.9302 8.68992 6.8502 7.80992 7.98354 7.80992C9.11687 7.80992 10.0369 8.68992 10.0369 9.77325C10.0369 10.4866 10.6602 11.0699 11.4235 11.0699C12.1869 11.0699 12.8102 10.4899 12.8102 9.77325C12.8102 7.25992 10.6435 5.21659 7.9802 5.21659C6.08354 5.21659 4.35354 6.26992 3.57354 7.90325C3.31354 8.44325 3.18354 9.07325 3.18354 9.77325C3.18354 10.2933 3.2302 11.1133 3.62687 12.1766C3.6902 12.3499 3.60354 12.5399 3.4302 12.6066C3.25687 12.6699 3.06687 12.5833 3.0002 12.4099C2.67354 11.5333 2.51354 10.6733 2.51354 9.77325C2.51354 8.97325 2.66687 8.24659 2.9702 7.61659C3.8602 5.75659 5.82687 4.55325 7.97687 4.55325C11.0069 4.55325 13.4735 6.89659 13.4735 9.77659C13.4735 10.8599 12.5502 11.7399 11.4202 11.7399C10.2902 11.7399 9.36687 10.8599 9.36687 9.77659C9.36687 9.06325 8.74354 8.47992 7.9802 8.47992C7.21687 8.47992 6.59354 9.05992 6.59354 9.77659C6.59354 10.9133 7.03687 11.9833 7.8402 12.7833C8.4702 13.4099 9.08354 13.7566 10.0235 14.0133C10.2002 14.0633 10.3069 14.2466 10.2569 14.4233C10.2169 14.5699 10.0835 14.6666 9.93687 14.6666V14.6666Z" fill="black"/>
    </svg>
  );
};

export interface LockVerifiedProps {
  size?: string;
}

export const LockVerified: React.FunctionComponent<LockVerifiedProps> = (props) => {
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
        d="M11 6H10.5V5C10.5 3.62 9.38 2.5 8 2.5C6.62 2.5 5.5 3.62 5.5 5V6H5C4.4475 6 4 6.4475 4 7V12C4 12.5525 4.4475 13 5 13H11C11.5525 13 12 12.5525 12 12V7C12 6.4475 11.5525 6 11 6ZM9.55 6H6.45V5C6.45 4.145 7.145 3.45 8 3.45C8.855 3.45 9.55 4.145 9.55 5V6Z"
        fill="#28C081"
      />
    </svg>
  );
};

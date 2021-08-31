export interface LockUnverifiedProps {
  size?: string;
}

export const LockUnverified: React.FunctionComponent<LockUnverifiedProps> = (props) => {
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
        d="M4 8.5C4.5525 8.5 5 8.0525 5 7.5C5 6.9475 4.5525 6.5 4 6.5C3.4475 6.5 3 6.9475 3 7.5C3 8.0525 3.4475 8.5 4 8.5ZM7 4H6.5V3C6.5 1.62 5.38 0.5 4 0.5C2.62 0.5 1.5 1.62 1.5 3H2.45C2.45 2.145 3.145 1.45 4 1.45C4.855 1.45 5.55 2.145 5.55 3V4H1C0.4475 4 0 4.4475 0 5V10C0 10.5525 0.4475 11 1 11H7C7.5525 11 8 10.5525 8 10V5C8 4.4475 7.5525 4 7 4ZM7 10H1V5H7V10Z"
        fill="#E9403A"
      />
    </svg>
  );
};

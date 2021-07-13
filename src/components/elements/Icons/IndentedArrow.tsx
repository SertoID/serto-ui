export interface IndentedArrowProps {
  size?: string;
}

export const IndentedArrow: React.FunctionComponent<IndentedArrowProps> = (props) => {
  return (
    <svg
      width={props.size || "16"}
      height={props.size || "16"}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M3.07975 8.49994L3.08 0H2.5L2 0.00839818V9.49994H13.2779L10.9494 11.8284C10.7542 12.0236 10.7542 12.3402 10.9494 12.5355C11.1447 12.7307 11.4613 12.7307 11.6566 12.5355L14.8385 9.35349C15.0338 9.15823 15.0338 8.84165 14.8385 8.64639L11.6566 5.46441C11.4613 5.26914 11.1447 5.26914 10.9494 5.46441C10.7542 5.65967 10.7542 5.97625 10.9494 6.17151L13.2779 8.49994H3.07975Z"
        fill="#9797A5"
      />
    </svg>
  );
};

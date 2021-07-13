export interface IcoWebProps {
  size?: string;
}

export const IcoWeb: React.FunctionComponent<IcoWebProps> = (props) => {
  return (
    <svg
      width={props.size || "16"}
      height={props.size || "16"}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M12.6667 2.66675H3.33333C2.59333 2.66675 2 3.26675 2 4.00008V12.0001C2 12.7334 2.59333 13.3334 3.33333 13.3334H12.6667C13.4 13.3334 14 12.7334 14 12.0001V4.00008C14 3.26675 13.4067 2.66675 12.6667 2.66675ZM12.6667 12.0001H3.33333V5.33341H12.6667V12.0001Z" fill="#010101"/>
    </svg>
  );
};

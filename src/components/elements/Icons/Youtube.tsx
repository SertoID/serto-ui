export interface YoutubeProps {
  color?: string | null;
  height?: number | string;
  width?: number | string;
}

export const Youtube: React.FunctionComponent<YoutubeProps> = (props) => {
  return (
    <svg
      width={props.width || "18"}
      height={props.height || "14"}
      viewBox="0 0 18 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M17.5917 2.75539C17.3882 1.99949 16.7922 1.40349 16.0363 1.19997C14.6553 0.822021 9.13137 0.822021 9.13137 0.822021C9.13137 0.822021 3.60744 0.822021 2.22646 1.18544C1.48509 1.38895 0.874547 1.99949 0.671034 2.75539C0.307617 4.13637 0.307617 7.00009 0.307617 7.00009C0.307617 7.00009 0.307617 9.87834 0.671034 11.2448C0.874547 12.0007 1.47055 12.5967 2.22646 12.8002C3.62197 13.1782 9.13137 13.1782 9.13137 13.1782C9.13137 13.1782 14.6553 13.1782 16.0363 12.8147C16.7922 12.6112 17.3882 12.0152 17.5917 11.2593C17.9551 9.87834 17.9551 7.01462 17.9551 7.01462C17.9551 7.01462 17.9697 4.13637 17.5917 2.75539V2.75539Z"
        fill={props.color || "#FF0000"}
      />
      <path d="M7.37256 4.35449V9.64583L11.9661 7.00016L7.37256 4.35449Z" fill="white" />
    </svg>
  );
};

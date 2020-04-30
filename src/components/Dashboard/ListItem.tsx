import * as React from "react";
import { Metadata } from "../types";

export interface ListItemProps {
  contentId: string;
  metadata: Metadata;
}

export const ListItem: React.FunctionComponent<ListItemProps> = props => {
  const { metadata } = props;
  return (
    <tr>
      <td>{metadata.credential}</td>
      <td>{metadata.time}</td>
      <td>{metadata.time}</td>
      <td>{metadata.contentType}</td>
    </tr>
  );
};

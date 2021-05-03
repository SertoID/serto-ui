import React from "react";
import { Flex } from "rimble-ui";

export interface DomainImageProps {
  domain: string;
}

export const DomainImage: React.FunctionComponent<DomainImageProps> = (props) => {
  return (
    <Flex alignItems="center" width="16px" {...props}>
      <img
        src={"https://www.google.com/s2/favicons?domain=" + props.domain}
        alt={props.domain}
        width="100%"
        height="auto"
      />
    </Flex>
  );
};

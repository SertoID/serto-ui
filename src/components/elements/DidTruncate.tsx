import styled from "styled-components";
import { Flex } from "rimble-ui";

const DidPart1 = styled.span`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const DidPart2 = styled.span`
  flex-shrink: 0;
`;

export interface DidTruncateProps {
  did: string;
  alignRight?: boolean;
  endLength?: number;
}

export const DidTruncate: React.FunctionComponent<DidTruncateProps> = (props) => {
  const endLength = props.endLength || 6;
  const slice = props.did.length - endLength;
  const didPart1 = props.did.slice(0, slice);
  const didPart2 = props.did.slice(slice);

  return (
    <Flex justifyContent={props.alignRight ? "flex-end" : "flex-start"} minWidth={0} flexShrink={0} width="100%">
      <DidPart1>{didPart1}</DidPart1>
      <DidPart2>{didPart2}</DidPart2>
    </Flex>
  );
};

import * as React from "react";
import { Text } from "rimble-ui";
import { CopyToClipboard } from "../CopyToClipboard";
import styled from "styled-components";

const TruncatableText = styled(Text)`
  text-overflow: ellipsis;
  max-width: 256px;
  overflow: hidden;
`;

export interface CopyableTruncatableTextProps {
  text: string;
  size?: string;
}

export const CopyableTruncatableText: React.FunctionComponent<CopyableTruncatableTextProps> = (props) => {
  return (
    <>
      <TruncatableText fontFamily="mono" maxWidth={400} overflow="hidden" text-overflow="ellipsis">
        {props.text}
      </TruncatableText>
      <CopyToClipboard text={props.text} size={props.size} />
    </>
  );
};

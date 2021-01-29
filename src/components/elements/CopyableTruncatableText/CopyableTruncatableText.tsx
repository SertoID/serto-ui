import * as React from "react";
import styled from "styled-components";
import { Box, Flex } from "rimble-ui";
import { CopyToClipboard } from "../CopyToClipboard";
import { baseColors } from "../../../themes";

const TruncatableText = styled.input`
  border: none;
  font-size: 16px;
  line-height: 26px;
  outline: none;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 100%;
`;

export interface CopyableTruncatableTextProps {
  text: string;
  size?: string;
  textButton?: boolean;
}

export const CopyableTruncatableText: React.FunctionComponent<CopyableTruncatableTextProps> = (props) => {
  return (
    <Flex
      alignItems="center"
      bg={baseColors.white}
      border={1}
      borderRadius={1}
      height="48px"
      p={1}
      justifyContent="space-between"
      width="100%"
    >
      <TruncatableText type="text" value={props.text} readOnly />
      <Box style={{ position: "relative", right: "2px" }}>
        <CopyToClipboard {...props} />
      </Box>
    </Flex>
  );
};

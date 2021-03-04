import * as React from "react";
import { Box, Flex, Text } from "rimble-ui";
import { CopyToClipboard } from "../CopyToClipboard";
import { baseColors } from "../../../themes";

export interface CopyableTruncatableTextProps {
  text: string;
  fontSize?: string | number;
  fontWeight?: string | number;
  size?: string;
}

export const CopyableTruncatableText: React.FunctionComponent<CopyableTruncatableTextProps> = (props) => {
  return (
    <Flex
      alignItems="center"
      bg={baseColors.white}
      border={2}
      borderRadius={1}
      justifyContent="space-between"
      pl={3}
      pr={2}
      py={2}
      width="100%"
    >
      <Text
        color={baseColors.black}
        fontSize={props.fontSize || 2}
        fontWeight={props.fontWeight || 3}
        lineHeight="solid"
        style={{ overflow: "hidden", textOverflow: "ellipsis" }}
        width="100%"
      >
        {props.text}
      </Text>
      <Box bg={baseColors.white} pl={2}>
        <CopyToClipboard size={props.size || "24px"} text={props.text} />
      </Box>
    </Flex>
  );
};

import * as React from "react";
import { Box, Flex, Text, Link } from "rimble-ui";
import { OpenInNew } from "@rimble/icons";
import { CopyToClipboard } from "../CopyToClipboard";
import { baseColors, colors } from "../../../themes/colors";

export interface CopyableTruncatableTextProps {
  text: string;
  fontFamily?: string;
  fontSize?: string | number;
  fontWeight?: string | number;
  size?: string;
  linkOutHref?: string;
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
        fontFamily={props.fontFamily}
        fontSize={typeof props.fontSize === "undefined" ? 2 : props.fontSize}
        fontWeight={props.fontWeight || 3}
        lineHeight="solid"
        minHeight="14px"
        style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}
        width="100%"
      >
        {props.text}
      </Text>
      <Box bg={baseColors.white} pl={2}>
        <CopyToClipboard size={props.size || "24px"} text={props.text} />
      </Box>
      {props.linkOutHref && (
        <Link href={props.linkOutHref} target="_blank" color={baseColors.black} hoverColor={colors.primary.base}>
          <OpenInNew size={props.size || "24px"} ml={2} />
        </Link>
      )}
    </Flex>
  );
};

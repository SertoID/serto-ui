import * as React from "react";
import { Box, Flex, Text, Link, Input } from "rimble-ui";
import { OpenInNew } from "@rimble/icons";
import { CopyToClipboard } from "../CopyToClipboard";
import { baseColors, colors } from "../../../themes/colors";

export interface CopyableTruncatableTextProps {
  text: string;
  fontFamily?: string;
  fontSize?: string | number;
  fontWeight?: string | number;
  size?: string;
  linkOutHref?: boolean;
  useInput?: boolean;
  copyButtonOverride?(copied: boolean): JSX.Element;
  linkOutButtonOverride?: JSX.Element;
}

export const CopyableTruncatableText: React.FunctionComponent<CopyableTruncatableTextProps> = (props) => {
  return (
    <Flex alignItems="center" justifyContent="start" width="100%" p={1}>
      {props.useInput ? (
        <Input value={props.text} readOnly width="100%" />
      ) : (
        <Text
          color={baseColors.black}
          fontFamily={props.fontFamily}
          fontSize={typeof props.fontSize === "undefined" ? 2 : props.fontSize}
          fontWeight={props.fontWeight || 3}
          lineHeight="solid"
          minHeight="14px"
          style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}
        >
          {props.text}
        </Text>
      )}

      <Box pl={2}>
        <CopyToClipboard size={props.size || "24px"} text={props.text} buttonOverride={props.copyButtonOverride} />
      </Box>
      {props.linkOutHref && (
        <Link href={props.text} target="_blank" color={baseColors.black} hoverColor={colors.primary.base}>
          {props.linkOutButtonOverride || <OpenInNew size={props.size || "24px"} ml={2} />}
        </Link>
      )}
    </Flex>
  );
};

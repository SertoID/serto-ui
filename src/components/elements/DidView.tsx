import { Box, Flex, Text } from "rimble-ui";
import { colors } from "../../themes";
import { CopyToClipboard } from "./CopyToClipboard";
import { DidMethodIcon } from "./DidMethodIcon";
import { DidTruncate } from "./DidTruncate";
import { H4 } from "../layouts";

export interface DidViewProps {
  copy?: boolean;
  did: string;
  maxCharCount?: number;
  size?: string;
  dontTruncate?: boolean;
}

export const DidView: React.FunctionComponent<DidViewProps> = (props) => {
  const { copy, did, size } = props;
  const iconSize = size === "large" ? "32px" : "24px";
  const iconAlign = size === "large" ? "flex-start" : "center";
  const copyIconSize = size === "large" ? "20px" : "16px";

  return (
    <Flex alignItems="center" pl="40px" position="relative" width="100%">
      <Flex alignItems="center" justifyContent={iconAlign} left={0} position="absolute" width="40px">
        <DidMethodIcon did={did} size={iconSize} />
      </Flex>
      {size === "large" ? (
        <H4 m={0} maxWidth="100%" title={did}>
          <DidTruncate did={did} />
        </H4>
      ) : (
        <Text color={colors.midGray} fontSize={2} fontWeight={2} maxWidth="100%" title={did}>
          <DidTruncate did={did} />
        </Text>
      )}
      {copy && (
        <Box ml={1}>
          <CopyToClipboard color={colors.primary.base} hoverTitle="Copy DID" size={copyIconSize} text={did} />
        </Box>
      )}
    </Flex>
  );
};

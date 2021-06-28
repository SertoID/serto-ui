import { Eth } from "@rimble/icons";
import { Box, Flex, Text } from "rimble-ui";
import { colors } from "../../themes";
import { truncateDid } from "../../utils";
import { CopyToClipboard } from "./CopyToClipboard";
import { SovrinDidLogo } from "./Icons";
import { H4 } from "../layouts";

export interface DidViewProps {
  copy?: boolean;
  did: string;
  maxCharCount?: number;
  size?: string;
}

export const DidView: React.FunctionComponent<DidViewProps> = (props) => {
  const { copy, did, size } = props;
  const didDisplayed = truncateDid(did, props.maxCharCount);
  const iconSize = size === "large" ? "32px" : "24px";
  const iconAlign = size === "large" ? "flex-start" : "center";
  const copyIconSize = size === "large" ? "20px" : "16px";

  return (
    <Flex alignItems="center">
      <Flex alignItems="center" justifyContent={iconAlign} width="40px">
        {did.includes("did:ethr") && <Eth color="#637EEA" size={iconSize} />}
        {did.includes("did:sov") && <SovrinDidLogo />}
      </Flex>
      {size === "large" ? (
        <H4 m={0} title={did}>
          {didDisplayed}
        </H4>
      ) : (
        <Text color={colors.midGray} fontSize={2} fontWeight={2} title={did}>
          {didDisplayed}
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

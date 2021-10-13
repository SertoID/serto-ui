import styled from "styled-components";
import { useState } from "react";
import { Tooltip, Box, Text } from "rimble-ui";
import { VC } from "vc-schema-tools";
import { TwitterBird, LinkedIn, Facebook, Medium, YouTube } from "../../../elements/Icons";
import { baseColors } from "../../../../themes/colors";
import { SvgProps } from "../../../elements/Icons/SvgProps";
import { ModalWithX } from "../../../elements/Modals";
import { CopyToClipboard } from "../../../elements/CopyToClipboard/CopyToClipboard";

const ShareTextTextarea = styled.textarea`
  width: 100%;
  height: 320px;
`;

function getShareLink(
  vc: VC,
  vcUrl: string,
): { shareLink?: string; Icon?: React.FC<SvgProps>; showCopyModal?: boolean; shareText?: string; siteName?: string } {
  const profileUrl: string | false =
    vc.type.includes("SocialMediaProfileLinkage") && vc.credentialSubject.socialMediaProfileUrl;
  if (!profileUrl) {
    return {};
  }

  const shareText = `I'm linking this account to my Decentralized Identifier (DID)

My credential 👉 ${vcUrl}

#SertoID`;

  let shareLink: string | undefined;
  let Icon: React.FC | undefined;
  let showCopyModal = false;
  let siteName: string | undefined;

  if (profileUrl.includes("twitter.com")) {
    shareLink = "https://twitter.com/intent/tweet?text=" + encodeURIComponent(shareText);
    Icon = TwitterBird;
    siteName = "Twitter";
  } else if (profileUrl.includes("linkedin.com")) {
    shareLink = "https://www.linkedin.com/sharing/share-offsite/?url=" + encodeURIComponent(vcUrl);
    Icon = LinkedIn;
    siteName = "LinkedIn";
  } else if (profileUrl.includes("facebook.com")) {
    shareLink = "https://www.facebook.com/sharer.php?u=" + encodeURIComponent(vcUrl);
    Icon = Facebook;
    siteName = "Facebook";
  } else if (profileUrl.includes("medium.com")) {
    showCopyModal = true;
    Icon = Medium;
    siteName = "Medium";
  } else if (profileUrl.includes("youtube.com")) {
    showCopyModal = true;
    Icon = YouTube;
    siteName = "YouTube";
  }

  return { shareLink, Icon, showCopyModal, shareText, siteName };
}

export const SocialMediaVerify: React.FunctionComponent<{ vc: VC; vcUrl: string }> = (props) => {
  const { shareLink, Icon, showCopyModal, shareText, siteName } = getShareLink(props.vc, props.vcUrl);
  const [isModalOpen, setIsModalOpen] = useState(false);
  if (!Icon || !shareText) {
    return null;
  }
  return (
    <>
      <Tooltip placement="top" message="Verify account by publishing this credential">
        {showCopyModal ? (
          <span onClick={() => setIsModalOpen(true)} style={{ cursor: "pointer" }}>
            <Icon color={baseColors.warning} />
          </span>
        ) : (
          <a href={shareLink} target="_blank">
            <Icon color={baseColors.warning} />
          </a>
        )}
      </Tooltip>

      <ModalWithX borderRadius={2} isOpen={isModalOpen} close={() => setIsModalOpen(false)}>
        <Box maxWidth={9} px={5} py={3}>
          <Text my={4}>Copy and paste the following message into your {siteName} profile:</Text>
          <ShareTextTextarea value={shareText} readOnly />
          <Box mt={3}>
            <CopyToClipboard textButton text={shareText} />
          </Box>
          <Text my={4}>Note that you may change the message, but must include the link for verification.</Text>
        </Box>
      </ModalWithX>
    </>
  );
};

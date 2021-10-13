import { Tooltip } from "rimble-ui";
import { VC } from "vc-schema-tools";
import { TwitterBird } from "../../elements/Icons/TwitterBird";

function getShareLink(vc: VC, vcUrl: string): string | undefined {
  const profileUrl: string | false =
    vc.type.includes("SocialMediaProfileLinkage") && vc.credentialSubject.socialMediaProfileUrl;
  if (!profileUrl) {
    return;
  }

  const shareText = `I'm linking this account to my Decentralized Identifier (DID)

My credential 👉 ${vcUrl}

#SertoID`;

  if (profileUrl.includes("twitter.com")) {
    return "https://twitter.com/intent/tweet?text=" + encodeURIComponent(shareText);
  }
}

export const SocialMediaVerify: React.FunctionComponent<{ vc: VC; vcUrl: string }> = (props) => {
  const shareLink = getShareLink(props.vc, props.vcUrl);
  if (!shareLink) {
    return null;
  }
  return (
    <Tooltip placement="top" message="Verify account by publishing this credential">
      <a href={shareLink} target="_blank">
        <TwitterBird />
      </a>
    </Tooltip>
  );
};

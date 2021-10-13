import { Flex, Link } from "rimble-ui";
import { VC } from "vc-schema-tools";
import { TwitterBird, LinkedIn, Facebook } from "../../../elements/Icons";
import { useVcSchema } from "../../../../services/useVcSchema";
import { CopyToClipboard } from "../../../elements/CopyToClipboard/CopyToClipboard";

export const ShareViaSocial: React.FC<{ vc: VC; vcUrl: string }> = (props) => {
  const { vc, vcUrl } = props;
  const { vcSchemaName } = useVcSchema(vc);
  const shareText = `Check out my ${vcSchemaName} credential 👉 ${vcUrl}

#SertoID`;
  const shareTextParam = encodeURIComponent(shareText);
  const vcUrlParam = encodeURIComponent(vcUrl);

  return (
    <Flex>
      <Link mr={5} mt={1} href={"https://twitter.com/intent/tweet?text=" + shareTextParam} target="_blank">
        <TwitterBird size={32} />
      </Link>
      <Link mr={5} href={"https://www.linkedin.com/sharing/share-offsite/?url=" + vcUrlParam} target="_blank">
        <LinkedIn size={32} />
      </Link>
      <Link mr={5} href={"https://www.facebook.com/sharer.php?u=" + vcUrlParam} target="_blank">
        <Facebook size={32} />
      </Link>
      <CopyToClipboard hoverTitle="Copy share text" size="32px" text={shareText} />
    </Flex>
  );
};

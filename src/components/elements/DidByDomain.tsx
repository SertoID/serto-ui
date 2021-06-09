import { Box } from "rimble-ui";
import { DidView, DomainImage } from "./";
import { H5 } from "../layouts";
import { colors } from "../../themes";

export interface DidByDomainProps {
  did: string;
  didCopy?: boolean;
  domain: string;
  linkDomain?: string;
}

export const DidByDomain: React.FunctionComponent<DidByDomainProps> = (props) => {
  const { did, didCopy, domain, linkDomain } = props;

  return (
    <Box>
      <Box position="relative" pb={2} pl="50px" pr={3} pt={3}>
        <Box height="16px" width="16px" position="absolute" left="18px" top="18px">
          <DomainImage domain={domain} />
        </Box>
        {linkDomain ? (
          <a href={linkDomain} style={{ textDecoration: "none" }}>
            <H5 color={colors.primary.base} m={0}>
              {domain}
            </H5>
          </a>
        ) : (
          <H5 m={0}>{domain}</H5>
        )}
      </Box>
      <Box borderTop={2} ml="50px" pr={3} py={3}>
        <DidView did={did} copy={didCopy} />
      </Box>
    </Box>
  );
};

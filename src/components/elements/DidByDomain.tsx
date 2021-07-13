import { Box, Text } from "rimble-ui";
import { DidView, DomainImage } from "./";
import { H5 } from "../layouts";
import { colors } from "../../themes";

export interface DidByDomainProps {
  didDocs: any[];
  didCopy?: boolean;
  domain: string;
  linkDomain?: string;
  name?: string;
}

export const DidByDomain: React.FunctionComponent<DidByDomainProps> = (props) => {
  const { didDocs, didCopy, domain, linkDomain, name } = props;

  return (
    <Box>
      <Box position="relative" pb={2} pl="50px" pr={3} pt={3}>
        <Box height="32px" width="32px" position="absolute" left="12px" top="10px">
          <DomainImage domain={domain} size="32px" />
        </Box>
        <Box>
          {linkDomain ? (
            <a href={linkDomain} style={{ textDecoration: "none" }}>
              <H5 color={colors.primary.base} m={0}>
                {domain}
              </H5>
            </a>
          ) : (
            <H5 m={0}>{domain}</H5>
          )}
          {name && <Text>{name}</Text>}
        </Box>
      </Box>
      {didDocs.map((didDoc) => {
        const parsedDidDoc = JSON.parse(didDoc);
        return (
          <Box borderTop={2} ml="50px" pr={3} py={3}>
            <DidView did={parsedDidDoc.id} copy={didCopy} dontTruncate={true} />
          </Box>
        );
      })}
    </Box>
  );
};

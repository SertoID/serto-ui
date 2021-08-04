import { OpenInNew, Sms } from "@rimble/icons";
import { Box, Flex, Text } from "rimble-ui";
import { DidView, DomainImage } from "./";
import { H5 } from "../layouts";
import { colors } from "../../themes";

export interface DidByDomainProps {
  didDocs: any[];
  didCopy?: boolean;
  domain: string;
  externalLink?: boolean;
  linkDomain?: string;
  name?: string;
}

export const DidByDomain: React.FunctionComponent<DidByDomainProps> = (props) => {
  const { didDocs, didCopy, domain, externalLink, linkDomain, name } = props;

  return (
    <Box overflow="scroll" width="100%">
      <Box position="relative" pb={2} pl="50px" pr={3} pt={3}>
        <Box height="32px" width="32px" position="absolute" left="12px" top="10px">
          <DomainImage domain={domain} size="32px" />
        </Box>
        <Box>
          {linkDomain ? (
            <>
              {externalLink ? (
                <a href={linkDomain} style={{ textDecoration: "none" }} target="_blank" title="View on Serto Search">
                  <Flex alignItems="center">
                    <H5 color={colors.primary.base} m={0} mr={1}>
                      {domain}
                    </H5>
                    <OpenInNew color={colors.primary.base} size="16px" />
                  </Flex>
                </a>
              ) : (
                <a href={linkDomain} style={{ textDecoration: "none" }}>
                  <H5 color={colors.primary.base} m={0}>
                    {domain}
                  </H5>
                </a>
              )}
            </>
          ) : (
            <H5 m={0}>{domain}</H5>
          )}
          {name && <Text>{name}</Text>}
        </Box>
      </Box>
      {didDocs.map((didDoc, i) => {
        const parsedDidDoc = JSON.parse(didDoc);
        return (
          <Flex alignItems="center" borderTop={2} justifyContent="space-between" key={i} ml="50px" pr={3} py={3}>
            <DidView did={parsedDidDoc.id} copy={didCopy} dontTruncate={true} />
            {parsedDidDoc.service?.length > 0 && <Sms color={colors.silver} size="18px" />}
          </Flex>
        );
      })}
    </Box>
  );
};

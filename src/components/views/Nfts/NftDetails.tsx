import * as React from "react";
import { H5, H6 } from "../../layouts/LayoutComponents";
import { NftBorder } from "./NftComponents";
import { Box, Flex, Text } from "rimble-ui";
import { LinkedDomainsBorder } from "./NftComponents";
import { baseColors, fonts } from "../../../themes";
import { DomainImage } from "../../elements/DomainImage";
import { Link } from "react-router-dom";
import styled from "styled-components";

export interface NftDetailsProps {
  name: string;
  imgUrl: string;
  details: string;
  domains: string[];
}

const DomainLink = styled(Link)`
  text-decoration: none;
`;

export const NftDetails: React.FunctionComponent<NftDetailsProps> = (props) => {
  const { imgUrl, name, details, domains } = props;
  return (
    <NftBorder>
      <Flex flexDirection="row" alignItems="flex-start" mx={2} my={2}>
        <Box mr={3} borderRadius={1}>
          <img height={"144px"} src={imgUrl} />
        </Box>
        <Flex flexDirection="column" alignItems="start" justifyContent="start">
          <H5 mt={0}>{name}</H5>
          <Text>{details}</Text>
          {domains && domains.length > 0 ? (
            <>
              <H6 mb={1}>Domains linked to this creator</H6>
              <LinkedDomainsBorder>
                {domains?.map((d) => {
                  return (
                    <DomainLink to={`search?filter=${d}`} key={`domain-${d}`}>
                      <Flex flexDirection="row" flexGrow={1}>
                        <DomainImage domain={d} />
                        <Text color={baseColors.blurple} fontFamily={fonts.sansSerif} fontWeight={2}>
                          {d}
                        </Text>
                      </Flex>
                    </DomainLink>
                  );
                })}
              </LinkedDomainsBorder>
            </>
          ) : (
            <></>
          )}
        </Flex>
      </Flex>
    </NftBorder>
  );
};

import * as React from "react";
import styled from "styled-components";
import Linkify from "linkify-react";
import { Flex, Box, Text } from "rimble-ui";
import { StarBorder, CallSplit, Send } from "@rimble/icons";
import { SchemaDataResponse, SchemaDataInput } from "./types";
import { fonts, colors } from "../../../themes";
import { SchemaHeader } from "./SchemaHeader";

const Wrapper = styled(Flex)`
  ${(props) =>
    props.onClick &&
    `
    cursor: pointer;
    &:hover {
      border-color: ${colors.primary.base};
    }
  `}
`;
const IconWrap = styled(Box)`
  svg {
    vertical-align: text-bottom;
  }
`;
const GitHubLink = styled.a`
  text-decoration: none;
  color: ${colors.silver};
  &:hover {
    color: ${colors.primary.base};
  }
`;

export interface SchemaCardProps {
  schema: SchemaDataResponse | SchemaDataInput;
  style?: any;
  className?: string;
  onClick?(): void;
}

export const SchemaCard: React.FunctionComponent<SchemaCardProps> = (props) => {
  const { schema, className, style, onClick } = props;
  return (
    <Wrapper
      className={className}
      pt={4}
      border={1}
      borderRadius={2}
      fontFamily={fonts.sansSerif}
      flexDirection="column"
      justifyContent="space-between"
      style={style}
      onClick={onClick}
    >
      <Box px={3}>
        <SchemaHeader schema={schema} />
        {"favoriteCount" in schema && (
          <IconWrap fontSize={1} mt={3} mb={4}>
            <StarBorder size="18px" /> {schema.favoriteCount}
            <CallSplit size="18px" ml={3} /> 0
            <Send size="18px" ml={3} /> 0
          </IconWrap>
        )}
        {schema.description && (
          <Text my={2} onClick={(event: any) => event.stopPropagation()}>
            <Linkify options={{ target: "_blank" }}>{schema.description}</Linkify>
          </Text>
        )}
      </Box>
      <Flex px={3} borderTop={2} height="48px" fontSize={1} justifyContent="space-between" alignItems="center">
        {"creator" in schema && schema.creator ? (
          <GitHubLink
            href={`https://github.com/${schema.creator.nickName}`}
            target="_blank"
            color={colors.silver}
            onClick={(event) => event.stopPropagation()}
          >
            {schema.creator.name || schema.creator.nickName}
          </GitHubLink>
        ) : (
          <span></span>
        )}
        {"updated" in schema && (
          <Box title="Last Updated" color={colors.silver}>
            {new Date(schema.updated).toLocaleDateString()}
          </Box>
        )}
      </Flex>
    </Wrapper>
  );
};

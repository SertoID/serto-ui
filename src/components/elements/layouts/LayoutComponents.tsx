import * as React from "react";
import styled from "styled-components";
import { Box, Flex, Heading, Text } from "rimble-ui";
import { baseColors, colors, fonts } from "../";

export interface HeaderProps {
  heading: string;
}

export const Header: React.FunctionComponent<HeaderProps> = (props) => {
  return (
    <Flex alignItems="center" justifyContent="space-between" p={3} minHeight="4rem">
      <Heading as="h2" color={colors.primary.base} m={0}>
        {props.heading}
      </Heading>
      {props.children}
    </Flex>
  );
};

export const HeaderBox: React.FunctionComponent = (props) => {
  return (
    <Box bg={baseColors.white} borderRadius={1} mb={3}>
      {props.children}
    </Box>
  );
};

export const TH: React.FunctionComponent = (props) => {
  return (
    <th style={{ borderTop: "none", padding: "16px", textTransform: "none" }}>
      <Text.span color={colors.lightSilver} fontFamily={fonts.sansSerif} fontSize={2} fontWeight={3} lineHeight="title">
        {props.children}
      </Text.span>
    </th>
  );
};

export const TR = styled.tr`
  border-bottom: 1px solid #edecfa;
`;

export const TBody = styled.thead`
  tr {
    height: auto;
  }

  td {
    padding: 30px 15px;
  }
`;

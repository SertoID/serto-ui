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

export interface SecondaryHeaderProps {
  activeTenantID?: string;
  heading: string;
}

export const SecondaryHeader: React.FunctionComponent<SecondaryHeaderProps> = (props) => {
  return (
    <Box mb={4} mt={5} mx={3}>
      <Heading.h3 letterSpacing=".3px" mb={2} mt={0}>
        {props.heading}
      </Heading.h3>
      <Flex alignItems="center" justifyContent="space-between">
        {props.activeTenantID && (
          <Text fontSize={2} color={colors.silver}>
            Organization ID: {props.activeTenantID}
          </Text>
        )}
        {props.children}
      </Flex>
    </Box>
  );
};

export const THead = styled.thead`
  border-top: 1px solid #edecfa;
`;

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

export const TBody = styled.tbody`
  tr {
    height: auto;
  }

  td {
    font-size: 16px;
    padding: 30px 15px;
  }
`;

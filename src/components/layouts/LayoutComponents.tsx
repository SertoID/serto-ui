import * as React from "react";
import styled from "styled-components";
import { Box, Flex, Heading, Text } from "rimble-ui";
import { baseColors, colors, fonts } from "../../themes/";

export interface HeadingProps {
  [key: string]: any;
}
// font-size: 48px
export const H1: React.FunctionComponent<HeadingProps> = (props) => {
  return (
    <Heading.h1 fontFamily={fonts.sansSerifHeader} {...props}>
      {props.children}
    </Heading.h1>
  );
};
// font-size: 32px
export const H2: React.FunctionComponent<HeadingProps> = (props) => {
  return (
    <Heading.h2 fontFamily={fonts.sansSerifHeader} letterSpacing=".1px" {...props}>
      {props.children}
    </Heading.h2>
  );
};
// font-size: 24px
export const H3: React.FunctionComponent<HeadingProps> = (props) => {
  return (
    <Heading.h3 fontFamily={fonts.sansSerifHeader} letterSpacing=".3px" {...props}>
      {props.children}
    </Heading.h3>
  );
};
// font-size: 20px
export const H4: React.FunctionComponent<HeadingProps> = (props) => {
  return (
    <Heading.h4 fontFamily={fonts.sansSerifHeader} {...props}>
      {props.children}
    </Heading.h4>
  );
};
// font-size: 16px
export const H5: React.FunctionComponent<HeadingProps> = (props) => {
  return (
    <Heading.h5 fontFamily={fonts.sansSerifHeader} {...props}>
      {props.children}
    </Heading.h5>
  );
};
// font-size: 14px
export const H6: React.FunctionComponent<HeadingProps> = (props) => {
  return (
    <Heading.h6 fontFamily={fonts.sansSerifHeader} {...props}>
      {props.children}
    </Heading.h6>
  );
};

export interface HeaderProps {
  heading: string | JSX.Element;
}

export const Header: React.FunctionComponent<HeaderProps> = (props) => {
  return (
    <Flex alignItems="center" justifyContent="space-between" px={4} py={3} minHeight="4rem">
      <H2 color={colors.primary.base} m={0}>
        {props.heading}
      </H2>
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
    <Box mb={4} mt={5} mx={4}>
      <H3 mb={2} mt={0}>
        {props.heading}
      </H3>
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

  th:first-of-type {
    padding: 16px 16px 16px 24px !important;
  }

  th:last-of-type {
    padding: 16px 24px 16px 16px !important;
  }
`;

export const TH: React.FunctionComponent<{ style?: { [key: string]: string } }> = (props) => {
  return (
    <th style={{ borderTop: "none", padding: "16px", textTransform: "none", ...props.style }}>
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
    padding: 30px 16px;
  }

  td:first-of-type {
    padding: 30px 16px 30px 24px !important;
  }

  td:last-of-type {
    padding: 30px 24px 30px 16px !important;
  }
`;

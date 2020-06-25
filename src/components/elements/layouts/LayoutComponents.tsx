import * as React from "react";
import styled from "styled-components";
import { Box, Flex, Heading, Text } from "rimble-ui";
import { baseColors, fonts } from "../";

export interface HeaderProps {
  heading: string;
}

export const Header: React.FunctionComponent<HeaderProps> = (props) => {
  return (
    <Flex alignItems={"center"} justifyContent={"space-between"} p={"16px"} minHeight={"4.5rem"}>
      <Heading as={"h2"} color="#5952FF" m={0}>
        {props.heading}
      </Heading>
      {props.children}
    </Flex>
  );
};

export const HeaderBox: React.FunctionComponent = (props) => {
  return (
    <Box bg={baseColors.white} borderRadius={4} mb={"17px"}>
      {props.children}
    </Box>
  );
};

export const TH: React.FunctionComponent = (props) => {
  return (
    <th style={{ borderTop: "none", padding: "15px", textTransform: "none" }}>
      <Text.span color={"#AAAAB5"} fontFamily={fonts.sansSerif} fontSize={"16px"} fontWeight={"600"} lineHeight={1}>
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

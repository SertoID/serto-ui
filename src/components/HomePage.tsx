import * as React from "react";
import { Box, Text } from "rimble-ui";
import { routes } from "../constants";
import { GlobalLayout, HeaderBox, Header, baseColors } from "./elements";

export const HomePage: React.FunctionComponent = (props) => {
  return (
    <GlobalLayout url={routes.HOMEPAGE}>
      <HeaderBox>
        <Header heading="Home Page" />
      </HeaderBox>
      <Box bg={baseColors.white} borderRadius={1} p={3}>
        <Text>Home</Text>
      </Box>
    </GlobalLayout>
  );
};

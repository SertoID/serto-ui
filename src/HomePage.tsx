import * as React from "react";
import { GlobalLayout, Header, HeaderBox } from "./components/layouts";
import { Box } from "rimble-ui";
import { baseColors } from "./themes";

export const HomePage: React.FunctionComponent = () => {
  return (
    <GlobalLayout url={"/"}>
      <HeaderBox>
        <Header heading="Serto UI" />
      </HeaderBox>
      <Box bg={baseColors.white} borderRadius={1} p={4}>
        <p>Welcome!</p>
      </Box>
    </GlobalLayout>
  );
};

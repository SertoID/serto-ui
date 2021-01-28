import * as React from "react";
import { GlobalLayout, Header, HeaderBox } from "./components/elements/layouts";
import { Box } from "rimble-ui";
import { baseColors } from "./components/elements/themes";

export const HomePage: React.FunctionComponent = (props) => {
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

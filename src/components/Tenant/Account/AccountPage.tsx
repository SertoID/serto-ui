import * as React from "react";
import { Box } from "rimble-ui";
import { routes } from "../../../constants";
import { GlobalLayout, HeaderBox, Header, baseColors } from "../../elements";
import { AccountPlan } from "./AccountPlan";

export const AccountPage: React.FunctionComponent = (props) => {
  return (
    <GlobalLayout url={routes.ACCOUNT}>
      <HeaderBox>
        <Header heading="Account" />
      </HeaderBox>
      <Box bg={baseColors.white} borderRadius={1} p={3}>
        <AccountPlan />
      </Box>
    </GlobalLayout>
  );
};

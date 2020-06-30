import * as React from "react";
import { routes } from "../../constants";
import { Credentials } from "./Credentials";
import { GlobalLayout, HeaderBox, Header, baseColors } from "../elements";
import { Box } from "rimble-ui";

export const ReceivedCredentialsPage: React.FunctionComponent = (props) => {
  return (
    <GlobalLayout url={routes.RECEIVED_CREDENTIAL}>
      <HeaderBox>
        <Header heading="Received Credentials" />
      </HeaderBox>

      <Box bg={baseColors.white} borderRadius={1} p={3}>
        <Credentials />
      </Box>
    </GlobalLayout>
  );
};

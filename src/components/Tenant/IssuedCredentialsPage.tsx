import * as React from "react";
import { routes } from "../../constants";
import { Credentials } from "./Credentials";
import { GlobalLayout, HeaderBox, Header, baseColors } from "../elements";
import { Box } from "rimble-ui";

export const IssuedCredentialsPage: React.FunctionComponent = (props) => {
  return (
    <GlobalLayout url={routes.ISSUED_CREDENTIAL}>
      <HeaderBox>
        <Header heading={"Issued Credentials"} />
      </HeaderBox>

      <Box bg={baseColors.white} borderRadius={4} p={"16px"}>
        <Credentials />
      </Box>
    </GlobalLayout>
  );
};

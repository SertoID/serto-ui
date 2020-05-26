import * as React from "react";
import { IdentityThemeProvider } from "../elements";
import { Flex, Box } from "rimble-ui";
import { GlobalNav } from "./GlobalNav";
import { GlobalOrg } from "./GlobalOrg";
import { GlobalSearch } from "./GlobalSearch";

export const GlobalLayout: React.FunctionComponent = props => {
  return (
    <IdentityThemeProvider>
      <Flex>
        <Box width={[1/6]} p={10}>
          <GlobalOrg />
          <GlobalNav />
        </Box>
        <Box width={[5/6]} p={10} >
          <GlobalSearch />
          {props.children}
        </Box>
      </Flex>
    </IdentityThemeProvider>
  );
};

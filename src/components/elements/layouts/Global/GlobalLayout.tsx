import * as React from "react";
import { IdentityThemeProvider, Nav } from "../../";
import { Flex, Box } from "rimble-ui";

export const GlobalLayout: React.FunctionComponent = (props) => {
  return (
    <IdentityThemeProvider>
      <Flex>
        <Box width={[1 / 6]} p={10}>
          <Nav />
        </Box>
        <Box width={[5 / 6]} p={10}>
          {props.children}
        </Box>
      </Flex>
    </IdentityThemeProvider>
  );
};

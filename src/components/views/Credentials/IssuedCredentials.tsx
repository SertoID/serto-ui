import * as React from "react";
import { Credentials } from "./Credentials";
import { Box } from "rimble-ui";

export const IssuedCredentials: React.FunctionComponent = (props) => {
  return (
    <Box p={3}>
      <Credentials />
    </Box>
  );
};

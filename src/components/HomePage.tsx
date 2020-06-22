import * as React from "react";
import { Box, Button } from "rimble-ui";
import { Link } from "react-router-dom";
import { LogOut } from "./auth/LogOut";

export const HomePage: React.FunctionComponent = (props) => {
  return (
    <div>
      <LogOut />
      <Box width={"auto"} position={"absolute"} top={"0"} right={"100px"}>
        <Link to="/tenant/feeds">
          <Button.Text>Feeds</Button.Text>
        </Link>
      </Box>
      <Box width={"auto"} position={"absolute"} top={"0"} right={"175px"}>
        <Link to="/tenant">
          <Button.Text>Tenant Home</Button.Text>
        </Link>
      </Box>
    </div>
  );
};

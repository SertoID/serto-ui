import * as React from "react";
import { Input } from "rimble-ui";
import { Container } from "../elements";

export const GlobalSearch: React.FunctionComponent = props => {
  return (
    <Container>
      <Input type="search" required={true} placeholder="Search" />
    </Container>
  );
};

import * as React from "react";
import styled from "styled-components";
import { Container } from "../elements";

const OrganizationLabel = styled.label`
  font-size: 14px;
  font-weight: bold;
  line-height: 21px;
`;

export const GlobalOrg: React.FunctionComponent = (props) => {
  return (
    <Container>
      <OrganizationLabel>Touchstone</OrganizationLabel>
    </Container>
  );
};

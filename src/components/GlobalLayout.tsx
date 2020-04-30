import * as React from "react";
import styled from "styled-components";
import { Input } from "rimble-ui";
import { Container, Grid } from "./elements";

const NavItem = styled.div`
  color: #8b8a93;
  font-size: 12px;
  font-weight: 500;
  line-height: 18px;
  margin-bottom: 15px;
`;

const OrganizationLabel = styled.label`
  font-size: 14px;
  font-weight: bold;
  line-height: 21px;
`;

const Organization: React.FunctionComponent = props => {
  return (
    <Container>
      <OrganizationLabel>TouchStone</OrganizationLabel>
    </Container>
  );
};

const Search: React.FunctionComponent = props => {
  return (
    <Container>
      <Input type="search" required={true} placeholder="Search" />
    </Container>
  );
};

const SideNav: React.FunctionComponent = props => {
  return (
    <>
      <NavItem>Explore</NavItem>
      <NavItem>Issued Credentials</NavItem>
      <NavItem>Recieved Credentials</NavItem>
    </>
  );
};

export const GlobalLayout: React.FunctionComponent = props => {
  return (
    <Grid
      headerLeftComponent={<Organization />}
      headerRightComponent={<Search />}
      sideBarComponent={<SideNav />}
    >
      {props.children}
    </Grid>
  );
};

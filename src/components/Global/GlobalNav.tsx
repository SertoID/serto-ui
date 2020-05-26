import * as React from "react";
import styled from "styled-components";

const NavItem = styled.div`
  color: #8b8a93;
  font-size: 12px;
  font-weight: 500;
  line-height: 18px;
  margin-bottom: 15px;
`;

export const GlobalNav: React.FunctionComponent = props => {
  return (
    <>
      <NavItem>Explore</NavItem>
      <NavItem>Issued Credentials</NavItem>
      <NavItem>Recieved Credentials</NavItem>
    </>
  );
};

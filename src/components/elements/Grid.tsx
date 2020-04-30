import * as React from "react";
import styled from "styled-components";

const GridWrap = styled.div`
  display: grid;
  grid-gap: 15px;
  grid-template-columns: 20% 78%;
  grid-template-areas:
    "headerLeft headerRight"
    "sidebar content";
`;

const GridHeaderRight = styled.div`
  grid-area: headerRight;
`;

const GridHeaderLeft = styled.div`
  grid-area: headerLeft;
`;

const GridSideBar = styled.div`
  grid-area: sidebar;
`;

const GridContent = styled.div`
  grid-area: content;
`;

export interface GridProps {
  headerLeftComponent: JSX.Element;
  headerRightComponent: JSX.Element;
  sideBarComponent: JSX.Element;
}

export const Grid: React.FunctionComponent<GridProps> = props => {
  return (
    <GridWrap>
      <GridHeaderLeft>{props.headerLeftComponent}</GridHeaderLeft>
      <GridHeaderRight>{props.headerRightComponent}</GridHeaderRight>
      <GridSideBar>{props.sideBarComponent}</GridSideBar>
      <GridContent>{props.children}</GridContent>
    </GridWrap>
  );
};

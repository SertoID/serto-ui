import styled from "styled-components";

export const DashboardLayoutContainer = styled.span`
  display: flex;
`;

export const DashboardContent = styled.div`
  padding: 20px;
  width: auto;
`;

export const DashboardNavDefault = styled.nav`
  padding: 20px;
  width: 250px;
`;

export const DashboardTabBtnContainer = styled.ul`
  list-style: none;
  margin: 0 auto;
  padding: 0;
`;

export interface DashboardResponsiveTabsToggleButtonProps {
  isExpanded: boolean;
}

export const DashboardResponsiveTabsToggleButton = styled.div`
  display: none;
  transform: ${(props: DashboardResponsiveTabsToggleButtonProps) =>
    props.isExpanded ? "rotate(180deg)" : "rotate(0)"};

  & svg {
    height: 26px;
    width: 16px;
  }
`;

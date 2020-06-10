import * as React from "react";
import styled from "styled-components";
import { Button } from "rimble-ui";

export interface DashboardTabProps {
  title: string | JSX.Element;
  isActive?: boolean;
  isResponsiveAndVisible?: boolean;
  index?: number;
  children: React.ReactChild;
  DashboardTabBtnCustom?: any;
  onClick?(index: number): void;
}

const DashboardTabBtnDefault = styled.li`
  button {
    &:disabled {
      font-weight: 800;
    }
  }
`;

export class DashboardTab extends React.Component<DashboardTabProps> {
  public render(): JSX.Element {
    const DashboardTabBtn = this.props.DashboardTabBtnCustom || DashboardTabBtnDefault;
    return (
      <DashboardTabBtn isResponsiveAndVisible={this.props.isResponsiveAndVisible}>
        <Button.Text disabled={this.props.isActive} onClick={this.onClick} mainColor="#111" fontWeight={2}>
          {this.props.title}
        </Button.Text>
      </DashboardTabBtn>
    );
  }
  private onClick = () => {
    this.props.onClick!(this.props.index!);
  };
}

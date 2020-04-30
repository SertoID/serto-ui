import * as React from "react";
import { colors, ExpandDownArrow } from "../../";
import { DashboardTabProps } from "./DashboardTab";
import {
  DashboardLayoutContainer,
  DashboardNavDefault,
  DashboardResponsiveTabsToggleButton,
  DashboardTabBtnContainer,
  DashboardContent
} from "./DashboardLayoutStyled";

export interface DashboardLayoutProps {
  activeIndex?: number;
  children: Array<React.ReactElement<DashboardTabProps>>;
  DashboardTabBtnCustom?: any;
  DashboardNavCustom?: any;
  /** Set to `true` to prevent tab change silently. If set to a string, on tab change attempt string will be passed to `window.confirm`: if user hits "cancel" tab change will be prevented. */
  preventTabChange?: boolean | string;
  onActiveTabChange?(activeIndex: number): void;
}

export interface DashboardLayoutState {
  activeIndex: number;
  isResponsiveTabsetVisible: boolean;
}

export class DashboardLayout extends React.Component<
  DashboardLayoutProps,
  DashboardLayoutState
> {
  public static getDerivedStateFromProps(
    nextProps: DashboardLayoutProps,
    prevState: DashboardLayoutState
  ): DashboardLayoutState {
    return {
      ...prevState,
      activeIndex:
        typeof nextProps.activeIndex === "number"
          ? nextProps.activeIndex
          : prevState.activeIndex
    };
  }

  constructor(props: DashboardLayoutProps) {
    super(props);
    this.state = {
      activeIndex: props.activeIndex || 0,
      isResponsiveTabsetVisible: false
    };
  }

  public renderTabs(): Array<React.ReactElement<DashboardTabProps>> {
    return React.Children.map(this.props.children, (child, index) => {
      return React.cloneElement(child as React.ReactElement, {
        index,
        isActive: this.state.activeIndex === index,
        isResponsiveAndVisible: this.state.isResponsiveTabsetVisible,
        onClick: this.handleClick,
        DashboardTabBtnCustom: this.props.DashboardTabBtnCustom
      });
    });
  }

  public renderContent(): React.ReactNode | undefined {
    const children = this.props.children;
    const { activeIndex } = this.state;
    if (children[activeIndex]) {
      return children[activeIndex].props.children;
    }
  }

  public render(): JSX.Element {
    const DashboardNav = this.props.DashboardNavCustom || DashboardNavDefault;
    const arrowColor = this.state.isResponsiveTabsetVisible
      ? colors.primary.BLUE
      : colors.basic.GRAY_500;

    return (
      <DashboardLayoutContainer>
        <DashboardNav>
          <DashboardTabBtnContainer>
            {this.renderTabs()}
          </DashboardTabBtnContainer>

          <DashboardResponsiveTabsToggleButton
            isExpanded={this.state.isResponsiveTabsetVisible}
            onClick={this.toggleResponsiveVisible}
          >
            <ExpandDownArrow color={arrowColor} opacity={1} />
          </DashboardResponsiveTabsToggleButton>
        </DashboardNav>
        <DashboardContent>{this.renderContent()}</DashboardContent>
      </DashboardLayoutContainer>
    );
  }

  private handleClick = (index: number) => {
    if (
      this.props.preventTabChange &&
      (this.props.preventTabChange === true ||
        !window.confirm(this.props.preventTabChange))
    ) {
      return;
    }

    this.setState({ activeIndex: index });
    if (this.props.onActiveTabChange) {
      this.props.onActiveTabChange(index);
    }
  };

  private toggleResponsiveVisible = () => {
    this.setState({
      isResponsiveTabsetVisible: !this.state.isResponsiveTabsetVisible
    });
  };
}

import * as React from "react";
import { RouteComponentProps } from "react-router-dom";
import { formatRoute } from "react-router-named-routes";
import { Explore } from "./Explore";
import { DashboardLayout, DashboardTab } from "../elements";

export interface DashboardParams {
  activeTab?: "explore" | "settings";
}
const TABS = ["explore", "settings"];

export interface DashboardProps extends RouteComponentProps<DashboardParams> {
  user?: any;
}

export const Dashboard: React.FunctionComponent<DashboardProps> = props => {
  const [activeTabIndex, setActiveTabIndex] = React.useState<number>(0);
  React.useEffect(() => {
    const activeTab = props.match.params.activeTab || "explore";
    if (TABS[activeTabIndex] !== activeTab) {
      setActiveTabIndex(TABS.indexOf(activeTab));
    }
  }, [props.match.params.activeTab]);

  return (
    <>
      <DashboardLayout
          activeIndex={activeTabIndex}
          onActiveTabChange={(tab: number) => {
            props.history.push(formatRoute(props.match.path, { activeTab: TABS[tab] }));
          }}>
        <DashboardTab title={"Explore"}>
          <Explore />
        </DashboardTab>
        <DashboardTab title={"Settings"}>
          <p>Settings</p>
        </DashboardTab>
      </DashboardLayout>
    </>
  );
};

export default Dashboard;

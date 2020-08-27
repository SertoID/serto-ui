import * as React from "react";
import { useParams, useHistory, generatePath } from "react-router-dom";
import { routes } from "../../../constants";
import { GlobalLayout, Header, HeaderBox } from "../../elements/layouts";
import { Tabs } from "../../elements/layouts";
import { MemberManagement } from "./MemberManagement";
import { AccountPlan } from "./AccountPlan";

export const SettingsPage: React.FunctionComponent = (props) => {
  const { tabName } = useParams();
  const history = useHistory();
  if (tabName && tabName !== "members" && tabName !== "account-plan") {
    history.push(generatePath(routes.SETTINGS));
  }

  return (
    <GlobalLayout url={routes.SETTINGS}>
      <HeaderBox>
        <Header heading="Settings" />
      </HeaderBox>
      <Tabs
        activeTabName={tabName || "members"}
        tabs={[
          {
            tabName: "members",
            title: "Members",
            content: <MemberManagement />,
          },
          {
            tabName: "account-plan",
            title: "Account Plan",
            content: <AccountPlan />,
          },
        ]}
        onTabClicked={(tabName) => {
          history.push(generatePath(routes.SETTINGS, { tabName }));
        }}
      />
    </GlobalLayout>
  );
};

import * as React from "react";
import { routes } from "../../constants";

import { GlobalLayout, HeaderBox, Header } from "../elements";
import { useParams, useHistory } from "react-router-dom";
import { Tabs } from "../elements/layouts/Tabs";
import { MemberManagementComponent } from "./MemberManagementComponent";

export const OrganizationManagementPage: React.FunctionComponent = (props) => {
  const { tabName } = useParams();
  const history = useHistory();
  if (tabName && tabName !== "members") {
    history.push(`/tenant/management`);
  }

  return (
    <GlobalLayout url={routes.ORGANIZATION_MANAGEMENT}>
      <HeaderBox>
        <Header heading="Organization" />
      </HeaderBox>
      <Tabs
        activeTabName={tabName || "members"}
        tabs={[
          {
            tabName: "members",
            title: "Members",
            content: <MemberManagementComponent />,
          },
        ]}
        onTabClicked={(tabName) => {
          history.push(`/tenant/management/${tabName}`);
        }}
      />
    </GlobalLayout>
  );
};

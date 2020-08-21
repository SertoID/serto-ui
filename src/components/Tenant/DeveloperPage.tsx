import * as React from "react";
import { routes } from "../../constants";

import { GlobalLayout, HeaderBox, Header } from "../elements";
import { useParams, useHistory } from "react-router-dom";
import { Tabs } from "../elements/layouts/Tabs";
import { APIKeyManagementComponent } from "./APIKeyManagementComponent";
import { DocumentationComponent } from "./DocumentationComponent";

export const DeveloperPage: React.FunctionComponent = (props) => {
  const { tabName } = useParams();
  const history = useHistory();
  if (tabName && tabName !== "api-keys" && tabName !== "docs") {
    history.push(`/tenant/developer`);
  }

  return (
    <GlobalLayout url={routes.DEVELOPER}>
      <HeaderBox>
        <Header heading="Developers" />
      </HeaderBox>
      <Tabs
        activeTabName={tabName || "api-keys"}
        tabs={[
          {
            tabName: "api-keys",
            title: "API Keys",
            content: <APIKeyManagementComponent />,
          },
          {
            tabName: "docs",
            title: "Documentation",
            content: <DocumentationComponent />,
          },
        ]}
        onTabClicked={(tabName) => {
          history.push(`/tenant/developer/${tabName}`);
        }}
      />
    </GlobalLayout>
  );
};

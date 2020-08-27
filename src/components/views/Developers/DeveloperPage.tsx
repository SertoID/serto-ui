import * as React from "react";
import { useParams, useHistory, generatePath } from "react-router-dom";
import { routes } from "../../../constants";
import { GlobalLayout, Header, HeaderBox } from "../../elements/layouts";
import { Tabs } from "../../elements/layouts";
import { APIKeyManagementComponent } from "./APIKeyManagementComponent";
import { DocumentationComponent } from "./DocumentationComponent";

export const DeveloperPage: React.FunctionComponent = (props) => {
  const { tabName } = useParams();
  const history = useHistory();
  if (tabName && tabName !== "api-keys" && tabName !== "docs") {
    history.push(generatePath(routes.DEVELOPER));
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
          history.push(generatePath(routes.DEVELOPER, { tabName }));
        }}
      />
    </GlobalLayout>
  );
};

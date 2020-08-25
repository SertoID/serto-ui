import * as React from "react";
import { useParams, useHistory } from "react-router-dom";
import { routes } from "../../../constants";
import { GlobalLayout, Header, HeaderBox } from "../../elements/layouts";
import { Tabs } from "../../elements/layouts";
import { Issue } from "./Issue";
import { IssuedCredentials } from "./IssuedCredentials";
import { ReceivedCredentials } from "./ReceivedCredentials";

export const CredentialsPage: React.FunctionComponent = (props) => {
  const { tabName } = useParams();
  const history = useHistory();
  if (tabName && tabName !== "issue" && tabName !== "issued" && tabName !== "received") {
    history.push(`/credentials`);
  }

  return (
    <GlobalLayout url={routes.CREDENTIALS}>
      <HeaderBox>
        <Header heading="Credentials" />
      </HeaderBox>
      <Tabs
        activeTabName={tabName || "issue"}
        tabs={[
          {
            tabName: "issue",
            title: "Issue Credential",
            content: <Issue />,
          },
          {
            tabName: "issued",
            title: "Issued Credentials",
            content: <IssuedCredentials />,
          },
          {
            tabName: "received",
            title: "Received Credentials",
            content: <ReceivedCredentials />,
          },
        ]}
        onTabClicked={(tabName) => {
          history.push(`/credentials/${tabName}`);
        }}
      />
    </GlobalLayout>
  );
};

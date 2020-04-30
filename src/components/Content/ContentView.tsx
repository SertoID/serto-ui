import * as React from "react";
import { dummyData } from "../types";
import { GlobalLayout } from "../GlobalLayout";
import { ContentDetails } from "./ContentDetails";
import { ContentTimeline } from "./ContentTimeline";
import { ContentVCFeed } from "./ContentVCFeed";

export const ContentView: React.FunctionComponent = props => {
  return (
    <GlobalLayout>
      <ContentDetails metadata={dummyData[1]} />
      <ContentTimeline />
      <ContentVCFeed />
    </GlobalLayout>
  );
};

export default ContentView;

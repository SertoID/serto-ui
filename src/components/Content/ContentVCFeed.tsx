import * as React from "react";
import styled from "styled-components";
import { Input } from "rimble-ui";

const ContentVCFeedContainer = styled.div`
  margin: 0 auto;
  padding: 50px 0;
  width: 500px;
`;

const ContentVCFeedFilters = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
`;

export const ContentVCFeed: React.FunctionComponent = props => {
  return (
    <ContentVCFeedContainer>
      <ContentVCFeedFilters>
        <select>
          <option value="">Filter</option>
          <option value="date">Date</option>
        </select>
        <Input type="date" />
      </ContentVCFeedFilters>
    </ContentVCFeedContainer>
  );
};

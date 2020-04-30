import * as React from "react";
import { ListItem } from "./ListItem";
import { dummyData } from "../types";
import { Table } from "rimble-ui";
import { GlobalLayout } from "../GlobalLayout";
import { Container } from "../elements";

export const Explore: React.FunctionComponent = props => {
  const metadata = dummyData;
  return (
    <GlobalLayout>
      <Container>
        <Table>
          <thead>
            <tr>
              <th>Credential</th>
              <th>Time</th>
              <th>Issuer</th>
              <th>Content type</th>
            </tr>
          </thead>
          <tbody>
            {metadata.map((article, idx) => (
              <ListItem
                key={idx}
                metadata={article}
                contentId={""}
              />
            ))}
          </tbody>
        </Table>
      </Container>
    </GlobalLayout>
  );
};

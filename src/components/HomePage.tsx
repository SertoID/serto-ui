import * as React from "react";
import { routes } from "../constants";
import { GlobalLayout, HeaderBox, Header } from "./elements";

export const HomePage: React.FunctionComponent = (props) => {
  return (
    <GlobalLayout url={routes.HOMEPAGE}>
      <HeaderBox>
        <Header heading="Home Page" />
      </HeaderBox>
    </GlobalLayout>
  );
};

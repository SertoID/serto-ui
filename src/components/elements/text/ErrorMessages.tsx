import * as React from "react";
import { links } from "../../../constants";

export const LoginErrorMsg: React.FunctionComponent = () => (
  <>
    Error logging in, please try again. If this error persists contact{" "}
    <a href={"mailto:" + links.EMAIL_SUPPORT}>{links.EMAIL_SUPPORT}</a>.
  </>
);

export const CreateOrgErrorMsg: React.FunctionComponent = () => <>Organization name must be unique.</>;

import * as React from "react";
import { links } from "../../../constants";

export const LoginErrorMsg: React.FunctionComponent = (props) => (
  <>
    Error logging in, please try again. If this error persists contact{" "}
    <a href={"mailto:" + links.EMAIL_SUPPORT}>{links.EMAIL_SUPPORT}</a>.
  </>
);

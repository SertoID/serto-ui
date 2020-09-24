import * as React from "react";
import { links } from "../../../constants";

export const ErrorLogin: React.FunctionComponent = () => (
  <>
    Error logging in, please try again. If this error persists contact{" "}
    <a href={"mailto:" + links.EMAIL_SUPPORT}>{links.EMAIL_SUPPORT}</a>.
  </>
);

export const ErrorSignup: React.FunctionComponent = () => (
  <>
    Error signing up, please try again. If this error persists contact{" "}
    <a href={"mailto:" + links.EMAIL_SUPPORT}>{links.EMAIL_SUPPORT}</a>.
  </>
);

// code: 111
export const ErrorTenantNameUnique: React.FunctionComponent = () => <>Organization name must be unique.</>;

// code: 453
export const ErrorValueTooLong: React.FunctionComponent = () => <>Organization name is too long.</>;

// code: 455
export const ErrorUserNameUnique: React.FunctionComponent = () => <>User name must be unique.</>;

// code: 312
export const ErrorUserNotFound: React.FunctionComponent = () => <>User does not exist.</>;

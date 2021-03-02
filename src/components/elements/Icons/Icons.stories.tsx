import React from "react";
import { storiesOf } from "@storybook/react";
import {
  AddCircle,
  ArrowBack,
  Check,
  Code,
  ContentCopy,
  CredentialCheck,
  EthrDidLogo,
  Home,
  Info,
  KeyboardArrowDown,
  KeyboardArrowUp,
  People,
  Person,
  SelectAll,
  Send,
  SertoLogo,
  SertoSearchLogo,
  Settings,
  SovrinDidLogo,
  VerifiedUser,
} from "./";

storiesOf("Icons", module)
  .add("AddCircle", () => {
    return <AddCircle />;
  })
  .add("ArrowBack", () => {
    return <ArrowBack />;
  })
  .add("Check", () => {
    return <Check />;
  })
  .add("Code", () => {
    return <Code />;
  })
  .add("ContentCopy", () => {
    return <ContentCopy />;
  })
  .add("CredentialCheck", () => {
    return <CredentialCheck />;
  })
  .add("EthrDidLogo", () => {
    return <EthrDidLogo />;
  })
  .add("Home", () => {
    return <Home />;
  })
  .add("Info", () => {
    return <Info />;
  })
  .add("KeyboardArrowDown", () => {
    return <KeyboardArrowDown />;
  })
  .add("KeyboardArrowUp", () => {
    return <KeyboardArrowUp />;
  })
  .add("People", () => {
    return <People />;
  })
  .add("Person", () => {
    return <Person />;
  })
  .add("SelectAll", () => {
    return <SelectAll />;
  })
  .add("Send", () => {
    return <Send />;
  })
  .add("SertoLogo", () => {
    return <SertoLogo />;
  })
  .add("SertoSearchLogo", () => {
    return <SertoSearchLogo />;
  })
  .add("Settings", () => {
    return <Settings />;
  })
  .add("SovrinDidLogo", () => {
    return <SovrinDidLogo />;
  })
  .add("VerifiedUser", () => {
    return <VerifiedUser />;
  });

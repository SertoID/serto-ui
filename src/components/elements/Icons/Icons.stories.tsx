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
  GitHub,
  Home,
  Info,
  KeyboardArrowDown,
  KeyboardArrowUp,
  People,
  Person,
  SelectAll,
  Send,
  SertoAgentLogo,
  SertoLogo,
  SertoSchemasLogo,
  SertoSearchLogo,
  SertoVerifiedCheckmark,
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
  .add("GitHub", () => {
    return <GitHub />;
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
  .add("SertoAgentLogo", () => {
    return <SertoAgentLogo />;
  })
  .add("SertoLogo", () => {
    return <SertoLogo />;
  })
  .add("SertoSchemasLogo", () => {
    return <SertoSchemasLogo />;
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
  })
  .add("SertoVerifiedCheckmark", () => {
    return <SertoVerifiedCheckmark size="50px"/>;
  });
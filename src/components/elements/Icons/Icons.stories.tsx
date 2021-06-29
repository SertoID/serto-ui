import { storiesOf } from "@storybook/react";
import {
  AddCircle,
  ArrowBack,
  Check,
  Code,
  ContentCopy,
  CredentialCheck,
  CredentialCheckFilled,
  DidKeyIcon,
  DidSovIcon,
  DidWebIcon,
  EthrDidLogo,
  GitHub,
  GreenCircleCheck,
  Home,
  Info,
  KeyboardArrowDown,
  KeyboardArrowUp,
  OutlineOne,
  OutlineTwo,
  People,
  Person,
  SelectAll,
  Send,
  SertoAgentLogo,
  SertoLogo,
  SertoSchemasLogo,
  SertoSearchLogo,
  SertoVerifiedCheckmark,
  SertoVerificationError,
  Settings,
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
  .add("CredentialCheckFilled", () => {
    return <CredentialCheckFilled />;
  })
  .add("DidKeyIcon", () => {
    return <DidKeyIcon />;
  })
  .add("DidSovIcon", () => {
    return <DidSovIcon />;
  })
  .add("DidWebIcon", () => {
    return <DidWebIcon />;
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
  .add("VerifiedUser", () => {
    return <VerifiedUser />;
  })
  .add("SertoVerificationError", () => {
    return <SertoVerificationError size="50px" />;
  })
  .add("SertoVerifiedCheckmark", () => {
    return <SertoVerifiedCheckmark size="50px" />;
  })
  .add("GreenCircleCheck", () => {
    return <GreenCircleCheck />;
  })
  .add("OutlineOne", () => {
    return <OutlineOne />;
  })
  .add("OutlineTwo", () => {
    return <OutlineTwo />;
  });

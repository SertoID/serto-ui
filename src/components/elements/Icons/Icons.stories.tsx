import { storiesOf } from "@storybook/react";
import {
  CredentialCheck,
  CredentialCheckFilled,
  DidKeyIcon,
  DidSovIcon,
  DidWebIcon,
  GitHub,
  GreenCircleCheck,
  OutlineOne,
  OutlineTwo,
  SertoAgentLogo,
  SertoLogo,
  SertoSchemasLogo,
  SertoSearchLogo,
  SertoVerifiedCheckmark,
  SertoVerificationError,
} from "./";

storiesOf("Icons", module)
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
  .add("GitHub", () => {
    return <GitHub />;
  })
  .add("SertoAgentLogo", () => {
    return <SertoAgentLogo />;
  })
  .add("GreenCircleCheck", () => {
    return <GreenCircleCheck />;
  })
  .add("OutlineOne", () => {
    return <OutlineOne />;
  })
  .add("OutlineTwo", () => {
    return <OutlineTwo />;
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
  .add("SertoVerificationError", () => {
    return <SertoVerificationError size="50px" />;
  })
  .add("SertoVerifiedCheckmark", () => {
    return <SertoVerifiedCheckmark size="50px" />;
  });

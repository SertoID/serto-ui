import { storiesOf } from "@storybook/react";
import {
  CredentialCheck,
  CredentialCheckFilled,
  DidKeyIcon,
  DidSovIcon,
  DidWebIcon,
  Fingerprint,
  GitHub,
  GreenCircleCheck,
  IcoWeb,
  IndentedArrow,
  LockUnverified,
  LockVerified,
  OutlineOne,
  OutlineTwo,
  SertoAgentLogo,
  SertoLogo,
  SertoSchemasLogo,
  SertoSearchLogo,
  SertoVerifiedCheckmark,
  SertoVerificationError,
  Verified,
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
  .add("Fingerprint", () => {
    return <Fingerprint />;
  })
  .add("GitHub", () => {
    return <GitHub />;
  })
  .add("IcoWeb", () => {
    return <IcoWeb />;
  })
  .add("IndentedArrow", () => {
    return <IndentedArrow />;
  })
  .add("LockUnverified", () => {
    return <LockUnverified />;
  })
  .add("LockVerified", () => {
    return <LockVerified />;
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
  })
  .add("Verified", () => {
    return <Verified />;
  });

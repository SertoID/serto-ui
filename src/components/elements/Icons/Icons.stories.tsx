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
  LinkedIn,
  LockUnverified,
  LockVerified,
  Medium,
  OutlineOne,
  OutlineTwo,
  QrCode,
  SearchIcon,
  SertoAgentLogo,
  SertoLogo,
  SertoSchemasLogo,
  SertoSearchLogo,
  SertoVerifiedCheckmark,
  SertoVerificationError,
  ShareIcon,
  Youtube,
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
  .add("GreenCircleCheck", () => {
    return <GreenCircleCheck />;
  })
  .add("IcoWeb", () => {
    return <IcoWeb />;
  })
  .add("IndentedArrow", () => {
    return <IndentedArrow />;
  })
  .add("LinkedIn", () => {
    return <LinkedIn />;
  })
  .add("LockUnverified", () => {
    return <LockUnverified />;
  })
  .add("LockVerified", () => {
    return <LockVerified />;
  })
  .add("Medium", () => {
    return <Medium />;
  })
  .add("OutlineOne", () => {
    return <OutlineOne />;
  })
  .add("OutlineTwo", () => {
    return <OutlineTwo />;
  })
  .add("QrCode", () => {
    return <QrCode />;
  })
  .add("SearchIcon", () => {
    return <SearchIcon />;
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
  .add("SertoVerificationError", () => {
    return <SertoVerificationError size="50px" />;
  })
  .add("SertoVerifiedCheckmark", () => {
    return <SertoVerifiedCheckmark size="50px" />;
  })
  .add("ShareIcon", () => {
    return <ShareIcon size="50px" />;
  })
  .add("Youtube", () => {
    return <Youtube />;
  })
  .add("Verified", () => {
    return <Verified />;
  });

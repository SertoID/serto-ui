import { storiesOf } from "@storybook/react";
import { DomainImage } from "./DomainImage";

storiesOf("Domain Image", module).add("Domain Image", () => {
  return <DomainImage domain="serto.id" />;
});

import * as React from "react";
import { Text } from "rimble-ui";
import { colors } from "../../elements/themes";

export const RequiredField: React.FunctionComponent = () => (
  <Text.span color={colors.silver} display="block" fontSize={1} mb={3}>
    * Indicates a required field
  </Text.span>
);

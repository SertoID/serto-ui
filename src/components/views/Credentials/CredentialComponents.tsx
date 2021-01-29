import * as React from "react";
import { Box, Text } from "rimble-ui";
import { baseColors, fonts, colors } from "../../../themes";

export const CredentialBorder: React.FunctionComponent = (props) => {
  return (
    <Box bg={baseColors.white} border={2} borderRadius={2} boxShadow={1} maxWidth="480px" mb={4} padding={2}>
      {props.children}
    </Box>
  );
};

export const CredentialTR: React.FunctionComponent = (props) => {
  return (
    <tr
      style={{
        height: "auto",
      }}
    >
      {props.children}
    </tr>
  );
};

export const CredentialTDRight: React.FunctionComponent = (props) => {
  return (
    <td
      style={{
        border: "none",
        padding: "5px 0",
        textAlign: "right",
        wordBreak: "break-word",
      }}
    >
      <Text.span color={baseColors.black} fontFamily={fonts.sansSerif} fontSize={1} fontWeight={3} lineHeight="copy">
        {props.children}
      </Text.span>
    </td>
  );
};

export const CredentialTDLeft: React.FunctionComponent = (props) => {
  return (
    <td
      style={{
        border: "none",
        padding: "5px 0",
      }}
    >
      <Text.span color={colors.midGray} fontFamily={fonts.sansSerif} fontSize={1} fontWeight={3} lineHeight="copy">
        {props.children}
      </Text.span>
    </td>
  );
};

import * as React from "react";
import { Box, Text } from "rimble-ui";
import { fonts } from "../../themes";

export const CredentialBorder: React.FunctionComponent = (props) => {
  return (
    <Box
      backgroundColor={"#FFFFFF"}
      border={"1px solid #CCC3F3"}
      borderRadius={"8px"}
      boxShadow={"0 2px 4px rgba(50, 50, 63, 0.1)"}
      maxWidth={"480px"}
      mb={"20px"}
      padding={"10px"}
    >
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
      <Text.span
        color={"#000E1A"}
        fontFamily={fonts.sansSerif}
        fontSize={"14px"}
        fontWeight={"600"}
        lineHeight={"18px"}
      >
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
      <Text.span
        color={"#53535F"}
        fontFamily={fonts.sansSerif}
        fontSize={"14px"}
        fontWeight={"600"}
        lineHeight={"18px"}
      >
        {props.children}
      </Text.span>
    </td>
  );
};

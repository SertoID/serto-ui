import * as React from "react";
import { Box, Text } from "rimble-ui";
import { baseColors, fonts, colors } from "../../../themes";

export const NftBorder: React.FunctionComponent = (props) => {
  return (
    <Box bg={baseColors.white} border={2} borderRadius={2} boxShadow={1} maxWidth="770px" mb={4} padding={2}>
      {props.children}
    </Box>
  );
};

export const LinkedDomainsBorder: React.FunctionComponent = (props) => {
  return (
    <Box bg={baseColors.white} border={2} borderRadius={2} padding={2}>
      {props.children}
    </Box>
  )
}

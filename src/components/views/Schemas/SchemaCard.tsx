import * as React from "react";
import { Box, Text } from "rimble-ui";
import { SchemaDataResponse, SchemaDataInput } from "./types";
import { H3 } from "../../layouts/LayoutComponents";
import { fonts, colors } from "../../../themes";

export interface SchemaCardProps {
  schema: SchemaDataResponse | SchemaDataInput;
  style?: any;
}

export const SchemaCard: React.FunctionComponent<SchemaCardProps> = (props) => {
  const { schema } = props;
  return (
    <Box p={4} pb={3} border={1} borderRadius={1} fontFamily={fonts.sansSerif} style={props.style}>
      <H3 mt={0}>
        {schema.icon} {schema.name}
      </H3>
      <Text color={colors.silver} my={2} fontFamily={fonts.monospace}>
        {schema.slug}
      </Text>
      {schema.description && (
        <Text color={colors.silver} my={2}>
          {schema.description}
        </Text>
      )}
    </Box>
  );
};

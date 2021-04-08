import * as React from "react";
import { Flex, Box, Text } from "rimble-ui";
import { SchemaDataResponse, SchemaDataInput } from "./types";
import { H4 } from "../../layouts/LayoutComponents";
import { fonts } from "../../../themes";

export interface SchemaHeaderProps {
  schema: SchemaDataResponse | SchemaDataInput;
  style?: any;
  className?: string;
  rimbleProps?: { [prop: string]: any };
}

export const SchemaHeader: React.FunctionComponent<SchemaHeaderProps> = (props) => {
  const { schema, style, className, rimbleProps } = props;
  return (
    <Flex style={style} className={className} {...rimbleProps}>
      <Flex
        alignItems="center"
        justifyContent="center"
        border={1}
        borderRadius="50%"
        minWidth="50px"
        width="50px"
        height="50px"
        textAlign="center"
        fontSize={4}
      >
        {schema.icon}
      </Flex>
      <Box ml={2}>
        <H4 mt={1} mb={1}>
          {schema.name}
        </H4>
        <Text fontFamily={fonts.monospace} fontSize={1}>
          {schema.slug}
        </Text>
      </Box>
    </Flex>
  );
};

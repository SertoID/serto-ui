import * as React from "react";
import { Box, Button, Flex, Heading, Text } from "rimble-ui";
import { baseColors, colors, fonts } from "../../../";
import { WorkingSchema, typeOptions } from "./utils";

const MetadataText: React.FunctionComponent = (props) => (
  <Text color={colors.midGray} fontFamily={fonts.sansSerif} fontWeight={3} my={2}>
    {props.children}
  </Text>
);
const PropertyText: React.FunctionComponent = (props) => (
  <Text color={baseColors.black} fontSize={1} fontFamily={fonts.sansSerif} fontWeight={3} my={1}>
    {props.children}
  </Text>
);

export interface ConfirmStepProps {
  schema: WorkingSchema;
  onComplete(): void;
}

export const ConfirmStep: React.FunctionComponent<ConfirmStepProps> = (props) => {
  const { schema } = props;

  return (
    <>
      <Heading mt={4} mb={3} color={baseColors.black} fontFamily={fonts.sansSerif} fontSize={4} fontWeight={3}>
        Confirm and Publish
      </Heading>
      <Box p={4} mb={5} backgroundColor={colors.primary.background}>
        <Heading as="h3" mt={0}>
          {schema.icon} {schema.name}
        </Heading>
        <MetadataText>{schema.slug}</MetadataText>
        <MetadataText>Version: {schema.version}</MetadataText>
        <MetadataText>Discoverable: {(!!schema.discoverable).toString()}</MetadataText>
        {schema.description && <MetadataText>{schema.description}</MetadataText>}

        {schema.properties.map((prop, i) => (
          <Box key={i} my={5}>
            <Flex justifyContent="space-between">
              <PropertyText>{prop["@title"]}</PropertyText>
              <PropertyText>{typeOptions[prop["@type"]]?.niceName || "Custom"}</PropertyText>
            </Flex>
            {prop["@description"] && <PropertyText>{prop["@description"]}</PropertyText>}
            {prop["@required"] && <PropertyText>Required</PropertyText>}
          </Box>
        ))}
      </Box>
      <Button width="100%" onClick={props.onComplete}>
        Publish
      </Button>
    </>
  );
};

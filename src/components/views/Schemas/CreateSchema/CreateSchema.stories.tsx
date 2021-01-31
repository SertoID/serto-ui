import React from "react";
import { storiesOf } from "@storybook/react";
import { Card, Flex, Box } from "rimble-ui";
import { IdentityThemeProvider } from "../../../../themes/IdentityTheme";
import { CreateSchema } from "./";
import { HighlightedJson } from "../../../elements/HighlightedJson/HighlightedJson";

storiesOf("Schemas", module).add("Create Schema", () => {
  const [schema, setSchema] = React.useState({});
  return (
    <IdentityThemeProvider>
      <Flex>
        <Card width={9} mr={4} p={0} pb={3} pt="48px">
          <Flex flexDirection="column" minHeight="0" maxHeight="calc(95vh - 48px)">
            <CreateSchema onSchemaUpdate={setSchema} onSchemaCreated={setSchema} />
          </Flex>
        </Card>
        <Box flexGrow={1}>
          <Box mb={1}>debug:</Box>
          <HighlightedJson json={JSON.stringify(typeof schema === "string" ? JSON.parse(schema) : schema, null, 2)} />
        </Box>
      </Flex>
    </IdentityThemeProvider>
  );
});

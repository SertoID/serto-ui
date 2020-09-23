import * as React from "react";
import { generatePath, useHistory, useParams } from "react-router-dom";
import { Box, Button, Flex, Text } from "rimble-ui";
import { routes } from "../../../constants";
import { CreateSchema, SchemasTable } from "../../elements/components";
import { GlobalLayout, Header, HeaderBox } from "../../elements/layouts";
import { Tabs } from "../../elements/layouts/Tabs/Tabs";
import { baseColors } from "../../elements/themes";
import { ModalWithX } from "../../elements/components/Modals";

export const SchemasPage: React.FunctionComponent = (props) => {
  const { tabName } = useParams();
  const history = useHistory();
  if (tabName && tabName !== "created" && tabName !== "discover") {
    history.push(generatePath(routes.SCHEMAS));
  }

  const [isCreateModalOpen, setIsCreateModalOpen] = React.useState(false);

  const noSchemas = (
    <Flex alignItems="center" justifyContent="center" minHeight={8}>
      <Box bg={baseColors.white} borderRadius={1} py={3} maxWidth={9}>
        <Text.span display="block" fontSize={1} lineHeight="copy" textAlign="center">
          <b style={{ display: "block", fontWeight: 600 }}>
            {tabName === "discover"
              ? "There are no publicly discoverable credential schemas yet."
              : "You do not have any credential schemas."}
          </b>
          Create a credential schema to coordinate around verified data with your customers and partners.
        </Text.span>
        <Flex alignItems="center" justifyContent="center">
          <Button onClick={() => setIsCreateModalOpen(true)} size="small" mt={5} mx="auto">
            Create Schema
          </Button>
        </Flex>
      </Box>
    </Flex>
  );

  return (
    <GlobalLayout url={routes.SCHEMAS}>
      <HeaderBox>
        <Header heading="Schemas">
          <Button.Outline onClick={() => setIsCreateModalOpen(true)} size="small" minWidth="150px">
            Create Schema
          </Button.Outline>
        </Header>
      </HeaderBox>

      <Box bg={baseColors.white} borderRadius={1} pt={2} pb={3}>
        <Tabs
          activeTabName={tabName || "created"}
          tabs={[
            {
              tabName: "created",
              title: "Created",
              content: <SchemasTable discover={false} noSchemasElement={noSchemas} />,
            },
            {
              tabName: "discover",
              title: "Discover",
              content: <SchemasTable discover={true} noSchemasElement={noSchemas} />,
            },
          ]}
          onTabClicked={(tabName) => {
            history.push(generatePath(routes.SCHEMAS, { tabName }));
          }}
        />
      </Box>

      <ModalWithX isOpen={isCreateModalOpen} close={() => setIsCreateModalOpen(false)} width={9}>
        <CreateSchema onComplete={() => setIsCreateModalOpen(false)}></CreateSchema>
      </ModalWithX>
    </GlobalLayout>
  );
};

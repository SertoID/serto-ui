import * as React from "react";
import { Box, Button, Flash, Flex, Loader, Card, Modal, Table, Text } from "rimble-ui";
import useSWR from "swr";
import { routes } from "../../../constants";
import { TrustAgencyContext } from "../../../context/TrustAgentProvider";
import { TrustAgencyService } from "../../../services/TrustAgencyService";
import { CreateSchema, SchemaDataResponse, SchemasTable, Toggle } from "../../elements/components";
import { GlobalLayout, Header, HeaderBox, TBody, TH, TR } from "../../elements/layouts";
import { baseColors, colors } from "../../elements/themes";

export const SchemasPage: React.FunctionComponent = (props) => {
  const TrustAgent = React.useContext<TrustAgencyService>(TrustAgencyContext);
  const [isCreateModalOpen, setIsCreateModalOpen] = React.useState(false);
  const modes: [string, string] = ["Your Schemas", "Global Schemas"];
  const [getGlobal, setGetGlobal] = React.useState(false);
  const { data, error: getSchemasError, isValidating } = useSWR(["/v1/schemas", getGlobal], () =>
    TrustAgent.getSchemas(getGlobal),
  );

  const noSchemas = (
    <Flex alignItems="center" justifyContent="center" minHeight={8}>
      <Box bg={baseColors.white} borderRadius={1} py={3} maxWidth={9}>
        <Text.span display="block" fontSize={1} lineHeight="copy" textAlign="center">
          <b style={{ display: "block", fontWeight: 600 }}>
            {getGlobal
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
          <Flex>
            <Toggle
              options={modes}
              onChange={(mode) => {
                setGetGlobal(mode === modes[1]);
              }}
              style={{ marginRight: 16 }}
            />
            <Button.Outline onClick={() => setIsCreateModalOpen(true)} size="small" minWidth="150px">
              Create Schema
            </Button.Outline>
          </Flex>
        </Header>
      </HeaderBox>

      <Box bg={baseColors.white} borderRadius={1} py={3}>
        <SchemasTable schemas={data} loading={isValidating} error={getSchemasError} noSchemasElement={noSchemas} />
      </Box>

      <Modal isOpen={isCreateModalOpen}>
        <CreateSchema onClose={() => setIsCreateModalOpen(false)}></CreateSchema>
      </Modal>
    </GlobalLayout>
  );
};

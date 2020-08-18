import * as React from "react";
import { Box, Button, Flash, Flex, Loader, Modal, Table, Text } from "rimble-ui";
import useSWR from "swr";
import { routes } from "../../constants";
import { TrustAgencyContext } from "../../context/TrustAgentProvider";
import { TrustAgencyService } from "../../services/TrustAgencyService";
import { baseColors, colors, GlobalLayout, Header, HeaderBox, TBody, TH, TR } from "../elements";
import { CreateSchema } from "../elements/components/Schemas/CreateSchema";
import { SchemaDataResponse } from "../elements/components/Schemas/types";

export const SchemasPage: React.FunctionComponent = (props) => {
  const TrustAgent = React.useContext<TrustAgencyService>(TrustAgencyContext);
  const [isCreateModalOpen, setIsCreateModalOpen] = React.useState(false);
  const { data, error: getSchemasError, isValidating } = useSWR("/v1/schemas", () => TrustAgent.getSchemas());

  function viewSchema(schema: SchemaDataResponse) {
    alert("Coming soon!");
  }

  return (
    <GlobalLayout url={routes.SCHEMAS}>
      {data?.length ? (
        <>
          <HeaderBox>
            <Header heading="Credential Schemas">
              <Button.Outline onClick={() => setIsCreateModalOpen(true)} size="small">
                Create Schema
              </Button.Outline>
            </Header>
          </HeaderBox>

          <Box bg={baseColors.white} borderRadius={1} py={3}>
            <Table border={0} boxShadow={0} width="100%">
              <thead>
                <TR>
                  <TH></TH>
                  <TH>Name</TH>
                  <TH>Slug</TH>
                  <TH>Version</TH>
                  <TH>Discoverable</TH>
                  <TH>Created</TH>
                  <TH></TH>
                </TR>
              </thead>
              <TBody>
                {data?.map((schema, i) => {
                  return (
                    <TR key={i}>
                      <td style={{ maxWidth: 32 }}>{schema.icon}</td>
                      <td>{schema.name}</td>
                      <td>{schema.slug}</td>
                      <td>{schema.version}</td>
                      <td>{(!!schema.discoverable).toString()}</td>
                      <td>
                        {schema.created && (
                          <time title={schema.created} dateTime={schema.created}>
                            {new Date(schema.created).toDateString()}
                          </time>
                        )}
                      </td>
                      <td>
                        <Button.Outline size="small" onClick={() => viewSchema(schema)}>
                          View
                        </Button.Outline>
                      </td>
                    </TR>
                  );
                })}
              </TBody>
            </Table>
          </Box>
        </>
      ) : isValidating ? (
        <Box bg={baseColors.white} borderRadius={1} py={3}>
          <Flex minHeight={8} alignItems="center" justifyContent="center">
            <Loader color={colors.primary.base} size={4} />
          </Flex>
        </Box>
      ) : getSchemasError ? (
        <Box bg={baseColors.white} borderRadius={1} py={3}>
          <Flash my={3} variant="danger">
            Error loading schemas: {JSON.stringify(getSchemasError)}
          </Flash>
        </Box>
      ) : (
        <Box bg={baseColors.white} borderRadius={1} py={3}>
          <Flex alignItems="center" justifyContent="center" minHeight={8}>
            <Box bg={baseColors.white} borderRadius={1} py={3} maxWidth={9}>
              <Text.span display="block" fontSize={1} lineHeight="copy" textAlign="center">
                <b style={{ display: "block", fontWeight: 600 }}>You do not have any credential schemas.</b>
                Create a credential schema to coordinate around verified data with your customers or partners.
              </Text.span>
              <Flex alignItems="center" justifyContent="center">
                <Button onClick={() => setIsCreateModalOpen(true)} size="small" mt={5} mx="auto">
                  Create Schema
                </Button>
              </Flex>
            </Box>
          </Flex>
        </Box>
      )}

      <Modal isOpen={isCreateModalOpen}>
        <CreateSchema onClose={() => setIsCreateModalOpen(false)}></CreateSchema>
      </Modal>
    </GlobalLayout>
  );
};

import * as React from "react";
import useSWR, { mutate } from "swr";
import { routes } from "../../constants";
import { Box, Button, Card, Field, Flash, Flex, Heading, Input, Loader, Modal, Table, Text } from "rimble-ui";
import { TrustAgencyContext } from "../../context/TrustAgentProvider";
import { TrustAgencyService } from "../../services/TrustAgencyService";
import {
  GlobalLayout,
  HeaderBox,
  Header,
  TH,
  TR,
  TBody,
  baseColors,
  colors,
  CopyableTruncatableText,
} from "../elements";

export const DeveloperPage: React.FunctionComponent = (props) => {
  const TrustAgent = React.useContext<TrustAgencyService>(TrustAgencyContext);
  const [createError, setCreateError] = React.useState("");
  const [createLoading, setCreateLoading] = React.useState(false);
  const [apiKeyName, setApiKeyName] = React.useState("");
  const [apiKey, setApiKey] = React.useState("");
  const [isCreateModalOpen, setIsCreateModalOpen] = React.useState(false);
  const [isReceiveApiKeyModalOpen, setIsReceiveApiKeyModalOpen] = React.useState(false);
  const [apiKeyToDeleteName, setApiKeyToDeleteName] = React.useState("");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = React.useState(false);
  const [deleteError, setDeleteError] = React.useState("");
  const [deleteLoading, setDeleteLoading] = React.useState(false);

  const { data, error: getFeedsError, isValidating } = useSWR("/v1/tenant/apiKeys", () => TrustAgent.getApiKeys());

  const createApiKey = async () => {
    if (!apiKeyName) {
      setCreateError("Please supply a name.");
      return;
    }

    setCreateError("");
    setCreateLoading(true);

    try {
      const resp = await TrustAgent.createApiKey({
        keyName: apiKeyName,
      });
      setApiKeyName("");
      setApiKey(resp.apiKey);
      await mutate("/v1/tenant/apiKeys");
      setIsCreateModalOpen(false);
      setIsReceiveApiKeyModalOpen(true);
    } catch (err) {
      console.error("failed to create api key:", err);
      setCreateError("Error: " + err.message);
    }

    setCreateLoading(false);
  };

  const confirmReceiptOfApiKey = async () => {
    setApiKey("");
    setIsReceiveApiKeyModalOpen(false);
  };

  const deleteApiKey = async () => {
    if (!apiKeyToDeleteName) {
      setDeleteError("Error deleting this key. Please contact customer support.");
      return;
    }

    setDeleteError("");
    setDeleteLoading(true);

    try {
      await TrustAgent.deleteApiKey({
        keyName: apiKeyToDeleteName,
      });
      setApiKeyToDeleteName("");
      await mutate("/v1/tenant/apiKeys");
      setIsDeleteModalOpen(false);
    } catch (err) {
      console.error("failed to delete api key:", err);
      setDeleteError("Error: " + err.message);
    }
    setDeleteLoading(false);
  };

  return (
    <GlobalLayout url={routes.DEVELOPER}>
      {data && data.length > 0 ? (
        <>
          <HeaderBox>
            <Header heading="API Keys">
              <Button.Outline onClick={() => setIsCreateModalOpen(true)} size="small">
                Create API Key
              </Button.Outline>
            </Header>
          </HeaderBox>

          <Box bg={baseColors.white} borderRadius={1} py={3}>
            <Table border={0} boxShadow={0} width="100%">
              <thead>
                <TR>
                  <TH>Name</TH>
                  <TH>Hash</TH>
                  <TH />
                </TR>
              </thead>
              <TBody>
                {data.map((apiKey: any, i: number) => {
                  return (
                    <TR key={i}>
                      <td>{apiKey.name}</td>
                      <td>{apiKey.hash}</td>
                      <td>
                        <Button.Outline
                          onClick={() => {
                            setApiKeyToDeleteName(apiKey.name);
                            setIsDeleteModalOpen(true);
                          }}
                          size="small"
                        >
                          Delete
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
      ) : getFeedsError ? (
        <Box bg={baseColors.white} borderRadius={1} py={3}>
          <Flash my={3} variant="danger">
            Error loading api keys: {JSON.stringify(getFeedsError)}
          </Flash>
        </Box>
      ) : (
        <Box bg={baseColors.white} borderRadius={1} py={3}>
          <Flex alignItems="center" justifyContent="center" minHeight={8}>
            <Box bg={baseColors.white} borderRadius={1} py={3} maxWidth={9}>
              <Text.span display="block" fontSize={1} lineHeight="copy" textAlign="center">
                <b style={{ display: "block", fontWeight: 600 }}>You do not have any api keys.</b>
                Create an API Key to start doing the stuff.
              </Text.span>
              <Flex alignItems="center" justifyContent="center">
                <Button onClick={() => setIsCreateModalOpen(true)} size="small" mt={5} mx="auto">
                  Create API Key
                </Button>
              </Flex>
            </Box>
          </Flex>
        </Box>
      )}

      <Modal isOpen={isCreateModalOpen}>
        <Card p={0}>
          <Button.Text
            icononly
            icon="Close"
            position="absolute"
            top={0}
            right={0}
            mt={3}
            mr={3}
            onClick={() => setIsCreateModalOpen(false)}
          />

          <Box p={4}>
            <Heading.h4>Create API Key</Heading.h4>
            <Field width="100%" label="Name">
              <Input
                type="text"
                required={true}
                value={apiKeyName}
                onChange={(event: any) => setApiKeyName(event.target.value)}
              />
            </Field>

            {createError && (
              <Box p={1} mb={1}>
                <Flash my={3} variant="danger">
                  {createError}
                </Flash>
              </Box>
            )}
          </Box>
          <Flex px={4} py={3} justifyContent="flex-end">
            <Button.Outline onClick={() => setIsCreateModalOpen(false)}>Cancel</Button.Outline>
            <Button ml={3} onClick={createApiKey} disabled={createLoading}>
              {createLoading || isValidating ? <Loader color="white" /> : "Create API Key"}
            </Button>
          </Flex>
        </Card>
      </Modal>

      <Modal isOpen={isReceiveApiKeyModalOpen}>
        <Card p={0}>
          <Box p={4}>
            <Heading.h4>Create API Key</Heading.h4>
            <Heading.h6>API Key:</Heading.h6>
            <CopyableTruncatableText text={apiKey} textButton />
          </Box>
          <Flex px={4} py={3} justifyContent="flex-end">
            <Button ml={3} onClick={confirmReceiptOfApiKey}>
              {"Continue"}
            </Button>
          </Flex>
        </Card>
      </Modal>

      <Modal isOpen={isDeleteModalOpen}>
        <Card p={0}>
          <Box p={4}>
            <Heading.h4>This Key Will be Deleted:</Heading.h4>
            <Heading.h6>API Key Name:</Heading.h6>
            <Text.span>{apiKeyToDeleteName}</Text.span>

            {deleteError && (
              <Box p={1} mb={1}>
                <Flash my={3} variant="danger">
                  {deleteError}
                </Flash>
              </Box>
            )}
          </Box>
          <Flex px={4} py={3} justifyContent="flex-end">
            <Button.Outline onClick={() => setIsCreateModalOpen(false)}>Cancel</Button.Outline>
            <Button ml={3} onClick={deleteApiKey} disabled={deleteLoading}>
              {"DELETE"}
            </Button>
          </Flex>
        </Card>
      </Modal>
    </GlobalLayout>
  );
};

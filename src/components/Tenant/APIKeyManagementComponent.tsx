import * as React from "react";
import useSWR, { mutate } from "swr";
import { Box, Button, Card, Field, Flash, Flex, Heading, Input, Loader, Modal, Table, Text } from "rimble-ui";
import { TrustAgencyContext } from "../../context/TrustAgentProvider";
import { TrustAgencyService } from "../../services/TrustAgencyService";
import { TH, TR, TBody, baseColors, colors, CopyableTruncatableText } from "../elements";
import styled from "styled-components";

const APIKeysInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`;

const APIKeysCTAContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`;

export const APIKeyManagementComponent: React.FunctionComponent = (props) => {
  const TrustAgent = React.useContext<TrustAgencyService>(TrustAgencyContext);
  const activeTenantID = TrustAgent.getAuth()?.tenantid;
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
      setDeleteError(err.message);
    }
    setDeleteLoading(false);
  };

  return (
    <>
      <Flex justifyContent="space-between" ml={3} mr={3}>
        <Flex flexDirection="column" justifyContent="flex-end">
          <Heading.h4>API Keys</Heading.h4>
          <Text>Organization ID: {activeTenantID}</Text>
        </Flex>
        <Flex flexDirection="column" justifyContent="flex-end">
          <Button onClick={() => setIsCreateModalOpen(true)} size="small">
            Create API Key
          </Button>
        </Flex>
      </Flex>
      {data && data.length > 0 ? (
        <>
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
                Create an API Key to use Trust Agent programatically.
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

          <Box p={4} width="424px">
            <Heading.h4>Create API Key</Heading.h4>
            <Field width="100%" label="Name your API key">
              <Input
                type="text"
                width="100%"
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
            <Button onClick={createApiKey} disabled={createLoading} width="100%">
              {createLoading || isValidating ? <Loader color="white" /> : "Generate API Key"}
            </Button>
          </Box>
        </Card>
      </Modal>

      <Modal isOpen={isReceiveApiKeyModalOpen}>
        <Card p={0}>
          <Box p={4} width="424px">
            <Heading.h4>Create API Key</Heading.h4>
            <Box bg="#DFF6EC" borderRadius="4px" color="#28C081" p={4} border="#28C081" mb={4}>
              <Text>
                Your API Key has been generated. Please copy this API Key and save it in a safe place, as you will not
                be able to see it again.
              </Text>
            </Box>
            <Box
              as={"label"}
              display={"inline-flex"}
              flexDirection={"column"}
              alignItems={"flex-start"}
              mb={3}
              width="100%"
            >
              <Text fontSize={1} fontWeight={3} mb={2}>
                API Key
              </Text>
              <CopyableTruncatableText text={apiKey} textButton />
            </Box>
            <Button.Outline onClick={confirmReceiptOfApiKey} width="100%">
              {"Done"}
            </Button.Outline>
          </Box>
        </Card>
      </Modal>

      <Modal isOpen={isDeleteModalOpen}>
        <Card p={0}>
          <Box p={4}>
            <Heading.h4>Delete API Key</Heading.h4>
            <Box
              as={"label"}
              display={"inline-flex"}
              flexDirection={"column"}
              alignItems={"flex-start"}
              mb={3}
              width="100%"
            >
              <Text fontSize={1} fontWeight={3} mb={2}>
                API Key
              </Text>
              <Text>{apiKeyToDeleteName}</Text>
            </Box>

            {deleteError && (
              <Box p={1} mb={1}>
                <Flash my={3} variant="danger">
                  {deleteError}
                </Flash>
              </Box>
            )}
          </Box>
          <Flex px={4} py={3} justifyContent="flex-end">
            <Button.Outline onClick={() => setIsDeleteModalOpen(false)}>Cancel</Button.Outline>
            <Button ml={3} onClick={deleteApiKey} disabled={deleteLoading} variant="danger" color="white">
              {"DELETE"}
            </Button>
          </Flex>
        </Card>
      </Modal>
    </>
  );
};

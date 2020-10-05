import React, { useContext, useState } from "react";
import useSWR, { mutate } from "swr";
import { TrustAgencyContext } from "../../../context/TrustAgentProvider";
import { TrustAgencyService } from "../../../services/TrustAgencyService";
import { Box, Button, Flash, Flex, Input, Loader, Table, Text } from "rimble-ui";
import { AddCircle } from "@rimble/icons";
import { ModalWithX, ModalContent, ModalFooter, ModalHeader } from "../../elements/components";
import { SecondaryHeader, TBody, TH, THead, TR } from "../../elements/layouts";
import { ellipsis } from "../../elements/utils";
import { colors } from "../../elements/themes";

export const DIDManagement: React.FunctionComponent = () => {
  const TrustAgent = useContext<TrustAgencyService>(TrustAgencyContext);
  const activeTenantID = TrustAgent.getAuth()?.tenantid;
  const [isCreateDidModalOpen, setIsCreateDidModalOpen] = useState(false);
  const [isEditAliasModalOpen, setIsEditAliasModalOpen] = useState(false);
  const [alias, setAlias] = useState("");
  const [didToEdit, setDidToEdit] = useState("");
  const [getIdentifierLoading, setGetIdentifierLoading] = React.useState(false);
  const [createError, setCreateError] = useState<string | undefined>();
  const [editError, setEditError] = useState<string | undefined>();

  const { data: identifiers, error: getIdentifiersError } = useSWR(
    "/v1/tenant/agent/identityManagerGetIdentities",
    () => TrustAgent.getTenantIdentifiers(),
  );
  if (getIdentifiersError) {
    console.error("failed to get identifiers:", getIdentifiersError);
  }

  async function createIdentifier() {
    setCreateError("");
    try {
      await TrustAgent.createTenantIdentifier(alias);
    } catch (err) {
      console.error("failed to create identifier:", err);
      setCreateError("Failed to create identifier");
      return;
    }
    setIsCreateDidModalOpen(false);
    setAlias("");
    mutate("/v1/tenant/agent/identityManagerGetIdentities");
  }

  async function getIdentifier(did: string) {
    setEditError("");
    setIsEditAliasModalOpen(true);
    setGetIdentifierLoading(true);
    setDidToEdit(did);
    try {
      const data = await TrustAgent.getTenantIdentifier(did);
      setAlias(data.alias);
    } catch (err) {
      console.error("Identity not found:", err);
      setEditError("Identity not found");
    }
    setGetIdentifierLoading(false);
  }

  async function editAlias() {
    setEditError("");
    try {
      await TrustAgent.setTenantIdentifierAlias(didToEdit, alias);
    } catch (err) {
      console.error("failed to set alias:", err);
      setEditError("Failed to edit external ID");
      return;
    }
    setIsEditAliasModalOpen(false);
    setAlias("");
    mutate("/v1/tenant/agent/identityManagerGetIdentities");
  }

  return (
    <>
      <SecondaryHeader heading="Identifiers (DIDs)" activeTenantID={activeTenantID}>
        <Button onClick={() => setIsCreateDidModalOpen(true)} size="small">
          <AddCircle size="14px" mr={1} color={colors.primary.disabled} />
          Create DID
        </Button>
      </SecondaryHeader>
      <Table border={0} boxShadow={0} width="100%">
        <THead>
          <TR>
            <TH>Address</TH>
            <TH>External ID</TH>
            <TH>Created</TH>
            <TH>Last Updated</TH>
            <TH />
          </TR>
        </THead>
        <TBody>
          {identifiers &&
            identifiers.map((identifier: any, i: number) => {
              return (
                <TR key={i}>
                  <td>
                    <Text.span fontWeight={3} title={identifier.did}>
                      {ellipsis(identifier.did, 14, 5)}
                    </Text.span>
                  </td>
                  <td>{identifier.alias}</td>
                  <td>{new Date(identifier.saveDate).toLocaleDateString()}</td>
                  <td>{new Date(identifier.updateDate).toLocaleDateString()}</td>
                  <td>
                    <Button onClick={() => getIdentifier(identifier.did)} size="small" variant="warning">
                      Edit External ID
                    </Button>
                  </td>
                </TR>
              );
            })}
        </TBody>
      </Table>

      <ModalWithX isOpen={isCreateDidModalOpen} close={() => setIsCreateDidModalOpen(false)}>
        <Box width="425px">
          <ModalHeader>Create DID</ModalHeader>
          <ModalContent>
            <Text fontSize={1} fontWeight={3} mb={1}>
              External ID
            </Text>
            <Input
              type="text"
              placeholder="Enter External ID"
              onChange={(event: any) => setAlias(event.target.value)}
              width="100%"
            />
            {createError && (
              <Box p={1} mb={1}>
                <Flash my={3} variant="danger">
                  {createError}
                </Flash>
              </Box>
            )}
          </ModalContent>
          <ModalFooter mb={1}>
            <Button onClick={createIdentifier} width="100%">
              Create DID
            </Button>
          </ModalFooter>
        </Box>
      </ModalWithX>

      <ModalWithX isOpen={isEditAliasModalOpen} close={() => setIsEditAliasModalOpen(false)}>
        <Box width="425px">
          <ModalHeader>Edit External ID</ModalHeader>
          <ModalContent>
            {getIdentifierLoading ? (
              <Flex justifyContent="center">
                <Loader size={5} my={3} />
              </Flex>
            ) : (
              <>
                <Text fontSize={1} fontWeight={3} mb={1}>
                  External ID
                </Text>
                <Input
                  type="text"
                  placeholder={alias || "Enter External ID"}
                  value={alias}
                  onChange={(event: any) => setAlias(event.target.value)}
                  width="100%"
                />
                {editError && (
                  <Box p={1} mb={1}>
                    <Flash my={3} variant="danger">
                      {editError}
                    </Flash>
                  </Box>
                )}
              </>
            )}
          </ModalContent>
          <ModalFooter mb={1}>
            <Button onClick={editAlias} disabled={getIdentifierLoading} width="100%">
              Edit External ID
            </Button>
          </ModalFooter>
        </Box>
      </ModalWithX>
    </>
  );
};

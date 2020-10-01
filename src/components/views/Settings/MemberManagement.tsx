import * as React from "react";
import useSWR, { mutate } from "swr";
import { Box, Button, Flash, Flex, Loader, Table, Text } from "rimble-ui";
import { AddCircle } from "@rimble/icons";
import { TrustAgencyContext } from "../../../context/TrustAgentProvider";
import { TrustAgencyService } from "../../../services/TrustAgencyService";
import { CopyableTruncatableText, ModalWithX, ModalContent, ModalFooter, ModalHeader } from "../../elements/components";
import { SecondaryHeader, TBody, TH, THead, TR } from "../../elements/layouts";
import { baseColors, colors } from "../../elements/themes";
import { config } from "../../../config";

export const MemberManagement: React.FunctionComponent = (props) => {
  const TrustAgent = React.useContext<TrustAgencyService>(TrustAgencyContext);
  const activeTenantID = TrustAgent.getAuth()?.tenantid;
  const [createError, setGetInviteCodeError] = React.useState("");
  const [getCodeLoading, setGetInviteCodeLoading] = React.useState(false);
  const [inviteCode, setInviteCodeKey] = React.useState("");
  const [isCreateModalOpen, setIsGetInviteCodeModalOpen] = React.useState(false);
  const [isReceiveApiKey, setIsReceiveInviteCode] = React.useState(false);
  const [memberToDeleteID, setMemberToDeleteID] = React.useState("");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = React.useState(false);
  const [deleteError, setRemoveError] = React.useState("");
  const [removeLoading, setRemoveLoading] = React.useState(false);

  const { data, error: getMembersError, isValidating } = useSWR("/v1/tenant/members", () =>
    TrustAgent.getTenantMembers(),
  );

  const getInviteCode = async () => {
    setGetInviteCodeError("");
    setGetInviteCodeLoading(true);

    try {
      const resp = await TrustAgent.getInviteCode();
      setInviteCodeKey(resp);
      await mutate("/v1/tenant/members");
      setIsReceiveInviteCode(true);
    } catch (err) {
      setGetInviteCodeError("Error: " + err.message);
    }

    setGetInviteCodeLoading(false);
  };

  const confirmReceiptOfInviteCode = async () => {
    setInviteCodeKey("");
    setIsGetInviteCodeModalOpen(false);
  };

  const removeMember = async () => {
    if (!memberToDeleteID) {
      setRemoveError("Error removing this member. Please contact customer support.");
      return;
    }
    setRemoveError("");
    setRemoveLoading(true);
    try {
      // TODO: actually delete member once endpoint is ready
      // await TrustAgent.removeMember({
      //   memberID: memberToDeleteID,
      // });
      setMemberToDeleteID("");
      await mutate("/v1/tenant/members");
      setIsDeleteModalOpen(false);
    } catch (err) {
      setRemoveError("Error: " + err.message);
    }
    setRemoveLoading(false);
  };
  return (
    <>
      <SecondaryHeader heading="Members" activeTenantID={activeTenantID}>
        <Button onClick={() => setIsGetInviteCodeModalOpen(true)} size="small">
          <AddCircle size="14px" mr={1} color={colors.primary.disabled} />
          Invite a Member
        </Button>
      </SecondaryHeader>
      {data && data.length > 0 ? (
        <>
          <Box bg={baseColors.white} borderRadius={1} py={3}>
            <Table border={0} boxShadow={0} width="100%">
              <THead>
                <TR>
                  <TH>Email</TH>
                  <TH>Organization Member ID</TH>
                  <TH>Permissions</TH>
                  <TH />
                </TR>
              </THead>
              <TBody>
                {data.map((member: any, i: number) => {
                  return (
                    <TR key={i}>
                      <td>{member.user.email}</td>
                      <td>{member.id}</td>
                      <td>Full access</td>
                      <td>
                        <Button.Outline
                          onClick={() => {
                            setMemberToDeleteID(member.id);
                            setIsDeleteModalOpen(true);
                          }}
                          size="small"
                        >
                          Remove Member
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
            <Loader color={colors.primary.base} size={5} />
          </Flex>
        </Box>
      ) : getMembersError ? (
        <Box bg={baseColors.white} borderRadius={1} py={3}>
          <Flash my={3} variant="danger">
            Error loading organization members: {getMembersError.toString()}
          </Flash>
        </Box>
      ) : (
        <Box bg={baseColors.white} borderRadius={1} py={3}>
          <Flash my={3} variant="danger">
            Unknown Error. Please contact customer support.
          </Flash>
        </Box>
      )}

      <ModalWithX isOpen={isCreateModalOpen} close={() => setIsGetInviteCodeModalOpen(false)}>
        <Box width="425px">
          <ModalHeader>Get Member Invite</ModalHeader>
          <ModalContent>
            {createError && (
              <Box p={1} mb={1}>
                <Flash my={3} variant="danger">
                  {createError}
                </Flash>
              </Box>
            )}
            {!isReceiveApiKey ? (
              <Button onClick={getInviteCode} disabled={getCodeLoading} width="100%">
                {getCodeLoading || isValidating ? <Loader color={baseColors.white} /> : "Get Invite Code"}
              </Button>
            ) : (
              <>
                <Text mb={2}>Send this URL to whoever you'd like to invite</Text>
                <CopyableTruncatableText text={`${config.UI_URL}acceptInvite/${inviteCode}`} textButton />
                <Button.Outline onClick={confirmReceiptOfInviteCode} mt={3} width="100%">
                  Done
                </Button.Outline>
              </>
            )}
          </ModalContent>
        </Box>
      </ModalWithX>

      <ModalWithX isOpen={isDeleteModalOpen} close={() => setIsDeleteModalOpen(false)}>
        <Box width="425px">
          <ModalHeader>Remove Member</ModalHeader>
          <ModalContent>
            <Text fontSize={2}>Organization Member ID: {memberToDeleteID}</Text>

            {deleteError && (
              <Box p={1} mb={1}>
                <Flash my={3} variant="danger">
                  {deleteError}
                </Flash>
              </Box>
            )}
          </ModalContent>
          <ModalFooter mb={1}>
            <Button onClick={removeMember} disabled={removeLoading} variant="danger" width="100%">
              {"TODO: REMOVE"}
            </Button>
          </ModalFooter>
        </Box>
      </ModalWithX>
    </>
  );
};

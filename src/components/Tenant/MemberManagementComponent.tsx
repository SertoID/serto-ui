import * as React from "react";
import useSWR, { mutate } from "swr";
import { routes } from "../../constants";
import { Box, Button, Card, Flash, Flex, Heading, Loader, Modal, Table, Text } from "rimble-ui";
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
import { config } from "../../config";

export const MemberManagementComponent: React.FunctionComponent = (props) => {
  const TrustAgent = React.useContext<TrustAgencyService>(TrustAgencyContext);
  const activeTenantID = TrustAgent.getAuth()?.tenantid;
  const [createError, setGetInviteCodeError] = React.useState("");
  const [getCodeLoading, setGetInviteCodeLoading] = React.useState(false);
  const [inviteCode, setInviteCodeKey] = React.useState("");
  const [isCreateModalOpen, setIsGetInviteCodeModalOpen] = React.useState(false);
  const [isReceiveApiKeyModalOpen, setIsReceiveInviteCodeModalOpen] = React.useState(false);
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
      setIsGetInviteCodeModalOpen(false);
      setIsReceiveInviteCodeModalOpen(true);
    } catch (err) {
      setGetInviteCodeError("Error: " + err.message);
    }

    setGetInviteCodeLoading(false);
  };

  const confirmReceiptOfInviteCode = async () => {
    setInviteCodeKey("");
    setIsReceiveInviteCodeModalOpen(false);
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
      <Flex justifyContent="space-between" ml={3} mr={3}>
        <Flex flexDirection="column" justifyContent="flex-end">
          <Heading.h4>Members</Heading.h4>
          <Text>Organization ID: {activeTenantID}</Text>
        </Flex>
        <Flex flexDirection="column" justifyContent="flex-end">
          <Button onClick={() => setIsGetInviteCodeModalOpen(true)} size="small">
            Get Invite Code
          </Button>
        </Flex>
      </Flex>
      {data && data.length > 0 ? (
        <>
          <Box bg={baseColors.white} borderRadius={1} py={3}>
            <Table border={0} boxShadow={0} width="100%">
              <thead>
                <TR>
                  <TH>Email</TH>
                  <TH>Organization Member ID</TH>
                  <TH>Permissions</TH>
                  <TH />
                </TR>
              </thead>
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
            <Loader color={colors.primary.base} size={4} />
          </Flex>
        </Box>
      ) : getMembersError ? (
        <Box bg={baseColors.white} borderRadius={1} py={3}>
          <Flash my={3} variant="danger">
            Error loading organization members: {JSON.stringify(getMembersError)}
          </Flash>
        </Box>
      ) : (
        <Box bg={baseColors.white} borderRadius={1} py={3}>
          <Flash my={3} variant="danger">
            Unknown Error. Please contact customer support.
          </Flash>
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
            onClick={() => setIsGetInviteCodeModalOpen(false)}
          />

          <Box p={4}>
            <Heading.h4>Get Member Invite URL</Heading.h4>
            {createError && (
              <Box p={1} mb={1}>
                <Flash my={3} variant="danger">
                  {createError}
                </Flash>
              </Box>
            )}
          </Box>
          <Flex px={4} py={3} justifyContent="flex-end">
            <Button.Outline onClick={() => setIsGetInviteCodeModalOpen(false)}>Cancel</Button.Outline>
            <Button ml={3} onClick={getInviteCode} disabled={getCodeLoading}>
              {getCodeLoading || isValidating ? <Loader color="white" /> : "Get Invite Code"}
            </Button>
          </Flex>
        </Card>
      </Modal>

      <Modal isOpen={isReceiveApiKeyModalOpen}>
        <Card p={0}>
          <Box p={4}>
            <Heading.h4>Get Member Invite URL</Heading.h4>
            <Heading.h6>Send this URL to whoever you'd like to invite</Heading.h6>
            <CopyableTruncatableText text={`${config.UI_URL}acceptInvite/${inviteCode}`} textButton />
          </Box>
          <Flex px={4} py={3} justifyContent="flex-end">
            <Button ml={3} onClick={confirmReceiptOfInviteCode}>
              {"Continue"}
            </Button>
          </Flex>
        </Card>
      </Modal>

      <Modal isOpen={isDeleteModalOpen}>
        <Card p={0}>
          <Box p={4}>
            <Heading.h4>This Member will be Removed:</Heading.h4>
            <Heading.h6>Organization Member ID:</Heading.h6>
            <Text.span>{memberToDeleteID}</Text.span>

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
            <Button ml={3} onClick={removeMember} disabled={removeLoading} variant="danger">
              {"TODO: REMOVE"}
            </Button>
          </Flex>
        </Card>
      </Modal>
    </>
  );
};

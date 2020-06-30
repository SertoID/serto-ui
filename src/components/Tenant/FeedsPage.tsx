import * as React from "react";
import useSWR, { mutate } from "swr";
import slugify from "@sindresorhus/slugify";
import { routes } from "../../constants";
import { Box, Button, Card, Field, Flash, Flex, Heading, Input, Loader, Modal, Table, Text } from "rimble-ui";
import { TrustAgencyContext } from "../../context/TrustAgentProvider";
import { TrustAgencyService } from "../../services/TrustAgencyService";
import { GlobalLayout, HeaderBox, Header, TH, TR, TBody, baseColors, colors } from "../elements";

export const FeedsPage: React.FunctionComponent = (props) => {
  const TrustAgent = React.useContext<TrustAgencyService>(TrustAgencyContext);
  const [createError, setCreateError] = React.useState("");
  const [createLoading, setCreateLoading] = React.useState(false);
  const [feedName, setFeedName] = React.useState("");
  const [feedDescription, setFeedDescription] = React.useState("");
  const [isCreateModalOpen, setIsCreateModalOpen] = React.useState(false);

  const { data, error: getFeedsError, isValidating } = useSWR("/v1/feeds", () => TrustAgent.getFeeds());

  const feedSlug = React.useMemo(() => slugify(feedName), [feedName]);

  const createFeed = async () => {
    if (!feedName || !feedDescription) {
      setCreateError("Please supply a name and description.");
      return;
    }

    setCreateError("");
    setCreateLoading(true);

    try {
      await TrustAgent.createFeed({
        name: feedName,
        slug: feedSlug,
        description: feedDescription,
      });
      setFeedName("");
      setFeedDescription("");
      await mutate("/v1/feeds");
      setIsCreateModalOpen(false);
    } catch (err) {
      console.error("failed to create feed:", err);
      setCreateError("Error: " + err.message);
    }

    setCreateLoading(false);
  };

  return (
    <GlobalLayout url={routes.FEEDS}>
      {data && data.length > 0 ? (
        <>
          <HeaderBox>
            <Header heading="Credential Feeds">
              <Button.Outline onClick={() => setIsCreateModalOpen(true)} size="small">
                Create Feed
              </Button.Outline>
            </Header>
          </HeaderBox>

          <Box bg={baseColors.white} borderRadius={1} py={3}>
            <Table border={0} boxShadow={0} width="100%">
              <thead>
                <TR>
                  <TH>Name</TH>
                  <TH>Slug</TH>
                  <TH>Description</TH>
                  <TH>Created</TH>
                  <TH>Updated</TH>
                </TR>
              </thead>
              <TBody>
                {data.map((feed: any, i: number) => {
                  return (
                    <TR key={i}>
                      <td>{feed.name}</td>
                      <td>{feed.slug}</td>
                      <td>{feed.description}</td>
                      <td>
                        <time title={feed.created} dateTime={feed.created}>
                          {new Date(feed.created).toDateString()}
                        </time>
                      </td>
                      <td>
                        <time title={feed.updated} dateTime={feed.updated}>
                          {new Date(feed.updated).toDateString()}
                        </time>
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
            Error loading feeds: {JSON.stringify(getFeedsError)}
          </Flash>
        </Box>
      ) : (
        <Box bg={baseColors.white} borderRadius={1} py={3}>
          <Flex alignItems="center" justifyContent="center" minHeight={8}>
            <Box bg={baseColors.white} borderRadius={1} py={3} maxWidth={9}>
              <Text.span display="block" fontSize={1} lineHeight="copy" textAlign="center">
                <b style={{ display: "block", fontWeight: 600 }}>You are not following any data feeds.</b>
                Create a Verified Data Feed to expose real-time data streams to your customers or partners.
              </Text.span>
              <Flex alignItems="center" justifyContent="center">
                <Button onClick={() => setIsCreateModalOpen(true)} size="small" mt={5} mx="auto">
                  Create Feed
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
            <Heading.h4>Create Feed</Heading.h4>
            <Field width="100%" label="Name">
              <Input
                type="text"
                required={true}
                value={feedName}
                onChange={(event: any) => setFeedName(event.target.value)}
              />
            </Field>
            <Field width="100%" label="Slug">
              <Input type="text" disabled required={true} value={feedSlug} />
            </Field>
            <Field width="100%" label="Description">
              <textarea
                required
                value={feedDescription}
                style={{ width: "100%", minHeight: "150px" }}
                onChange={(e: any) => setFeedDescription(e.target.value)}
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
            <Button ml={3} onClick={createFeed} disabled={createLoading}>
              {createLoading || isValidating ? <Loader color="white" /> : "Create Feed"}
            </Button>
          </Flex>
        </Card>
      </Modal>
    </GlobalLayout>
  );
};

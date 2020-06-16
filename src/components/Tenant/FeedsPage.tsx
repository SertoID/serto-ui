import * as React from "react";
import { Link } from "react-router-dom";
import useSWR, { mutate } from "swr";
import slugify from "@sindresorhus/slugify";
import { Box, Button, Heading, Input, Field, Flex, Modal, Card, Loader, Flash } from "rimble-ui";
import { TrustAgencyContext } from "../../context/TrustAgentProvider";
import { TrustAgencyService } from "../../services/TrustAgencyService";
import { LogOut } from "../auth/LogOut";

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
    <>
      <LogOut />
      {/*@TODO Terrible, but leaving this for now until we know enough to make an actual reusable nav component.*/}
      <Box width={"auto"} position={"absolute"} top={"0"} right={"100px"}>
        <Link to="/tenant">
          <Button.Text>Tenant Home</Button.Text>
        </Link>
      </Box>

      <Heading as={"h1"}>Feeds</Heading>
      <Box width={[1]} mb={10}>
        <Button onClick={() => setIsCreateModalOpen(true)}>Create Feed</Button>
      </Box>
      {data && data.length !== 0
        ? data.map((feed: any, i: number) => {
            return (
              <Box key={i} border="1px solid #E0E0E0" width={[1]} my={10} p={10}>
                <pre style={{ overflowX: "auto" }}>{JSON.stringify(feed, null, 2)}</pre>
              </Box>
            );
          })
        : isValidating
        ? "Loading..."
        : "You currently have no feeds"}

      {getFeedsError && (
        <Box p={1} mb={1}>
          <Flash my={3} variant="danger">
            Error loading feeds: {JSON.stringify(getFeedsError)}
          </Flash>
        </Box>
      )}

      <Modal isOpen={isCreateModalOpen}>
        <Card p={0}>
          <Button.Text
            icononly
            icon={"Close"}
            position={"absolute"}
            top={0}
            right={0}
            mt={3}
            mr={3}
            onClick={() => setIsCreateModalOpen(false)}
          />

          <Box p={4}>
            <Heading.h4>Create Feed</Heading.h4>
            <Field width={1} label="Name">
              <Input
                type="text"
                required={true}
                value={feedName}
                onChange={(event: any) => setFeedName(event.target.value)}
              />
            </Field>
            <Field width={1} label="Slug">
              <Input type="text" disabled required={true} value={feedSlug} />
            </Field>
            <Field width={1} label="Description">
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
          <Flex px={4} py={3} justifyContent={"flex-end"}>
            <Button.Outline onClick={() => setIsCreateModalOpen(false)}>Cancel</Button.Outline>
            <Button ml={3} onClick={createFeed} disabled={createLoading}>
              {createLoading || isValidating ? <Loader color="white" /> : "Create Feed"}
            </Button>
          </Flex>
        </Card>
      </Modal>
    </>
  );
};

import * as React from "react";
import { useHistory } from "react-router-dom";
import { routes } from "../../../constants";
import { TrustAgencyContext } from "../../../context/TrustAgentProvider";
import { TrustAgencyService } from "../../../services/TrustAgencyService";
import { Box, Button, Card, Field, Flash, Flex, Heading, Input, Text } from "rimble-ui";
import { colors } from "../../elements/themes";
import { CreateOrgErrorMsg } from "../../elements/text";

export const CreateOrganizationPage: React.FunctionComponent = (props) => {
  const history = useHistory();
  const TrustAgent = React.useContext<TrustAgencyService>(TrustAgencyContext);
  const [tenantName, setTenantName] = React.useState("");
  const [error, setError] = React.useState<any | undefined>();

  async function createTenant() {
    try {
      await TrustAgent.createTenant(tenantName, "organization");
      history.push(routes.HOMEPAGE);
    } catch (err) {
      console.error("failed to create tenant:", err);
      setError(CreateOrgErrorMsg);
      return;
    }
  }

  return (
    <Flex justifyContent="center" mt="10%">
      <Card borderRadius={2} width="480px">
        <Heading as="h2">Create Your Organization</Heading>
        <Text.p>Complete this step to issue and receive credentials through your organization</Text.p>
        <Text.span color={colors.silver} display="block" fontSize={1} mb={3}>
          * Indicates a required field
        </Text.span>
        <Box mb={2}>
          <Field label="Organization Name *" width="100%">
            <Input
              value={tenantName}
              onChange={(event: any) => setTenantName(event.target.value)}
              name="organization name"
              type="text"
              required={true}
              width="100%"
            />
          </Field>
        </Box>

        <Button onClick={createTenant} width="100%">
          Create organization
        </Button>

        {error && (
          <Box p={1} mb={1}>
            <Flash my={3} variant="danger">
              {error}
            </Flash>
          </Box>
        )}
      </Card>
    </Flex>
  );
};

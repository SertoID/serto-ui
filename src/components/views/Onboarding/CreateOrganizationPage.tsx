import * as React from "react";
import { useHistory } from "react-router-dom";
import { routes } from "../../../constants";
import { TrustAgencyContext } from "../../../context/TrustAgentProvider";
import { TrustAgencyService } from "../../../services/TrustAgencyService";
import { Box, Button, Card, Field, Flash, Flex, Input, Text } from "rimble-ui";
import { H2 } from "../../elements/layouts";
import { ErrorTenantNameUnique, ErrorValueTooLong, RequiredField } from "../../elements/text";

export const CreateOrganizationPage: React.FunctionComponent = (props) => {
  const history = useHistory();
  const TrustAgent = React.useContext<TrustAgencyService>(TrustAgencyContext);
  const [tenantName, setTenantName] = React.useState("");
  const [error, setError] = React.useState<any | undefined>();
  const [disableBtn, setDisableBtn] = React.useState(false);

  function onChange(value: string) {
    setTenantName(value);
    if (value.length > 50) {
      setError(
        <>
          <ErrorValueTooLong /> <>Maximum length is 50 characters.</>
        </>,
      );
      setDisableBtn(true);
    } else {
      setError(undefined);
      setDisableBtn(false);
    }
  }

  async function createTenant() {
    try {
      await TrustAgent.createTenant(tenantName, "organization");
      const user = await TrustAgent.getUser();
      history.push(routes.HOMEPAGE);
      const tenantCreated = user.tenants.find((tenant: any) => tenant.Tenant_name === tenantName);
      TrustAgent.switchTenant(tenantCreated.Tenant_id);
    } catch (err) {
      console.error("failed to create tenant:", err);
      if (err.toString().includes("111")) {
        setError(ErrorTenantNameUnique);
      } else if (err.toString().includes("453")) {
        setError(ErrorValueTooLong);
      } else {
        setError(err);
      }
      return;
    }
  }

  return (
    <Flex justifyContent="center" mt="10%">
      <Card borderRadius={2} width="480px">
        <H2>Create Your Organization</H2>
        <Text.p>Complete this step to issue and receive credentials through your organization</Text.p>
        <RequiredField />
        <Box mb={2}>
          <Field label="Organization Name *" width="100%">
            <Input
              value={tenantName}
              onChange={(event: any) => onChange(event.target.value)}
              name="organization name"
              type="text"
              required={true}
              width="100%"
            />
          </Field>
        </Box>

        <Button onClick={createTenant} disabled={disableBtn} width="100%">
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

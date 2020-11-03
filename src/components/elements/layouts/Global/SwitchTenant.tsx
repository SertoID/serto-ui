import * as React from "react";
import { TrustAgencyContext } from "../../../../context/TrustAgentProvider";
import { TrustAgencyService } from "../../../../services/TrustAgencyService";
import { useHistory } from "react-router-dom";
import { routes } from "../../../../constants";
import { Box, Button } from "rimble-ui";
import { DropDown } from "../../";

export interface SwitchTenantProps {
  user: any;
}

export const SwitchTenant: React.FunctionComponent<SwitchTenantProps> = (props) => {
  const { user } = props;
  const TrustAgent = React.useContext<TrustAgencyService>(TrustAgencyContext);
  const activeTenantID = TrustAgent.getAuth()?.tenantid;
  const history = useHistory();

  function onChange(value: string) {
    TrustAgent.switchTenant(value);
  }

  function createOrg() {
    history.push(routes.CREATE_ORGANIZATION);
  }

  if (user) {
    let activeTenantName;
    const tenants: any[] = [];
    user.tenants.forEach((tenant: any) => {
      if (activeTenantID === tenant.Tenant_id) {
        activeTenantName = tenant.Tenant_name;
      }
      if (tenant.Tenant_type === "organization") {
        tenants.push({
          name: tenant.Tenant_name,
          value: tenant.Tenant_id,
        });
      }
    });

    return (
      <Box pb={3}>
        <DropDown
          onChange={onChange}
          options={tenants}
          defaultSelected={activeTenantName}
          style={{ height: 64, border: 0 }}
          optionsTextProps={{ fontWeight: 3 }}
        >
          <Box p={2}>
            <Button onClick={createOrg} size="small" width="100%">
              Create Organization
            </Button>
          </Box>
        </DropDown>
      </Box>
    );
  }

  return (
    <Button.Outline onClick={createOrg} width="100%">
      Create Organization
    </Button.Outline>
  );
};

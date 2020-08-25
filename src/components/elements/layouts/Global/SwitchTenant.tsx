import * as React from "react";
import { TrustAgencyContext } from "../../../../context/TrustAgentProvider";
import { TrustAgencyService } from "../../../../services/TrustAgencyService";
import { useHistory } from "react-router-dom";
import { routes } from "../../../../constants";
import { Flex } from "rimble-ui";
import { baseColors } from "../../";

export interface SwitchTenantProps {
  user: any;
}

export const SwitchTenant: React.FunctionComponent<SwitchTenantProps> = (props) => {
  const { user } = props;
  const TrustAgent = React.useContext<TrustAgencyService>(TrustAgencyContext);
  const activeTenantID = TrustAgent.getAuth()?.tenantid;
  const history = useHistory();

  const [tenantName, setTenantName] = React.useState(activeTenantID);

  function onChange(value: string) {
    if (value === "new") {
      history.push(routes.CREATE_ORGANIZATION);
    } else {
      setTenantName(value);
      TrustAgent.switchTenant(value);
    }
  }

  return (
    <Flex alignItems="center" bg={baseColors.white} borderRadius={1} mb={3} p={3} height="4rem">
      <select
        name="tenant"
        value={tenantName}
        onChange={(event: any) => onChange(event.target.value)}
        style={{ border: "none", cursor: "pointer", fontSize: "16px", fontWeight: 600, width: "100%" }}
      >
        {user ? (
          user.tenants.map((tenant: any, key: number) => {
            return (
              <option key={key} value={tenant.tenantId}>
                {tenant.tenantId}
              </option>
            );
          })
        ) : (
          <option value={tenantName}>{tenantName}</option>
        )}
        <option value="new">Add Organization</option>
      </select>
    </Flex>
  );
};

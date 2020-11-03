import * as React from "react";
import useSWR from "swr";
import { Redirect } from "react-router-dom";
import { routes } from "../../../../constants";
import { TrustAgencyContext } from "../../../../context/TrustAgentProvider";
import { TrustAgencyService } from "../../../../services/TrustAgencyService";
import { Box, Flex } from "rimble-ui";
import { LogOut } from "../../../views/Auth/LogOut";
import { Nav } from "./Nav";
import { SwitchTenant } from "./SwitchTenant";

export interface GlobalLayoutProps {
  activeTenantID?: string;
  url: string;
}

export const GlobalLayout: React.FunctionComponent<GlobalLayoutProps> = (props) => {
  const TrustAgent = React.useContext<TrustAgencyService>(TrustAgencyContext);
  const { data: user } = useSWR("/v1/tenant/users/currentUser", () => TrustAgent.getUser());

  if (user && user.tenants.length === 1) {
    return <Redirect to={routes.CREATE_ORGANIZATION} />;
  }

  return (
    <Flex p={4} height="100vh">
      <Flex flexDirection="column" justifyContent="space-between" width={8} p={2} mr={2} minWidth={8}>
        <Box>
          <SwitchTenant user={user} />
          <Nav url={props.url} />
        </Box>
        <LogOut />
      </Flex>
      <Flex flexDirection="column" height="98vh" flexGrow="1" p={2}>
        {props.children}
      </Flex>
    </Flex>
  );
};

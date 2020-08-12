import * as React from "react";
import useSWR from "swr";
import { TrustAgencyContext } from "../../../../context/TrustAgentProvider";
import { TrustAgencyService } from "../../../../services/TrustAgencyService";
import { Box, Flex } from "rimble-ui";
import { LogOut } from "../../../auth/LogOut";
import { Nav, SwitchTenant } from "../../";

export interface GlobalLayoutProps {
  activeTenantID?: string;
  url: string;
}

export const GlobalLayout: React.FunctionComponent<GlobalLayoutProps> = (props) => {
  const TrustAgent = React.useContext<TrustAgencyService>(TrustAgencyContext);
  const { data: user } = useSWR("/v1/tenant/users/currentUser", () => TrustAgent.getUser());

  return (
    <Flex p={2}>
      <Box width={8} p={2}>
        <SwitchTenant user={user} />
        <Nav url={props.url} />
        <LogOut />
      </Box>
      <Box flexGrow="1" p={2}>
        {props.children}
      </Box>
    </Flex>
  );
};

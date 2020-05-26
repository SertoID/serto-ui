import * as React from "react";
import { TrustAgencyContext } from "../../context/TrustAgentProvider";
import { TrustAgencyService } from "../../services/TrustAgencyService";

export const LoginPage = () => {
  const TrustAgent = React.useContext<TrustAgencyService>(TrustAgencyContext);

  const [error, setError] = React.useState<string | undefined>();
  const [tenants, setTenants] = React.useState<any[] | undefined>();

  async function doLogin() {
    const tenantID = "admin";
    const token = "CHANGE ME";
    try {
      await TrustAgent.login(tenantID, token);
      setTenants([]);
    } catch (err) {
      console.error();
      setError(err.message);
    }
  }

  async function getTenants() {
    try {
      const data = await TrustAgent.getTenants();
      setTenants(data);
    } catch (err) {
      console.error();
      setError(err.message);
    }
  }

  return (
    <div>
      <div>test page</div>
      <div>
        {TrustAgent.isAuthenticated() ? (
          <button onClick={getTenants}>Get Tenants</button>
        ) : (
          <button onClick={doLogin}>Login</button>
        )}
      </div>
      <div>{error ? `error: ${error}` : undefined}</div>
      <div>{tenants ? `tenants: ${JSON.stringify(tenants)}` : undefined}</div>
    </div>
  );
};

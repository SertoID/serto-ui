const defaultConfig = {
  ENVIRONMENT: process.env.NODE_ENV || "development",
  API_URL: "https://alpha.consensysidentity.com",
  NATS_WS_URL: "wss://alpha-nats.consensysidentity.com:9222",
  // API_URL: "http://localhost:8000",
  // NATS_WS_URL: "wss://0.0.0.0:9222",
  AUTH0_CLIENT_ID: "sAnzetlNs0HbyokOncaTUZmLRijPazBc",
  AUTH0_DOMAIN: "dev-mdazdke4.us.auth0.com",
};

const serverConfigString = (window as any).SERVER_CONFIG;
let serverConfig;
if (serverConfigString !== "$ENVIRONMENT") {
  try {
    serverConfig = JSON.parse(serverConfigString);
  } catch (e) {
    console.error("error parsing server config: ", { serverConfigString, defaultConfig, e });
  }
}

const config = { ...defaultConfig, ...serverConfig };
console.log("configuration loaded", { config, defaultConfig, serverConfig });

export { config };

export interface ConfigType {
  ENVIRONMENT: string;
  API_URL: string;
  NATS_WS_URL: string;
  UI_URL: string;
  AUTH0_CLIENT_ID: string;
  AUTH0_DOMAIN: string;
  GLOBAL_FEED_SLUG: string;
}

const defaultConfig: ConfigType = {
  ENVIRONMENT: process.env.NODE_ENV || "development",
  API_URL: "https://alpha.consensysidentity.com",
  NATS_WS_URL: "wss://alpha-nats.consensysidentity.com:9222",
  UI_URL: "https://alpha-ui.consensysidentity.com/",
  // API_URL: "http://localhost:8000",
  // NATS_WS_URL: "wss://0.0.0.0:9222",
  AUTH0_CLIENT_ID: "sAnzetlNs0HbyokOncaTUZmLRijPazBc",
  AUTH0_DOMAIN: "auth.consensys.id",
  GLOBAL_FEED_SLUG: "global",
};

const serverConfigString = (window as any).SERVER_CONFIG;
let serverConfig: ConfigType | undefined;
if (serverConfigString !== "$ENVIRONMENT") {
  try {
    serverConfig = JSON.parse(serverConfigString);
  } catch (e) {
    console.error("error parsing server config: ", { serverConfigString, defaultConfig, e });
  }
}

const config: ConfigType = { ...defaultConfig, ...serverConfig };
console.log("configuration loaded", { config, defaultConfig, serverConfig });

export { config };

// @TODO/tobek This config value needs to be abstracted out and passed in when creating schema instances, and then this file can be deleted.
export interface ConfigType {
  SCHEMA_HOST_URL: string;
}
const defaultConfig: ConfigType = {
  SCHEMA_HOST_URL: "https://alpha.consensysidentity.com",
};

const serverConfigString = (window as any).SERVER_CONFIG;
let serverConfig: ConfigType | undefined;
if (serverConfigString && serverConfigString !== "$ENVIRONMENT") {
  try {
    serverConfig = JSON.parse(serverConfigString);
  } catch (e) {
    console.error("error parsing server config: ", { serverConfigString, defaultConfig, e });
  }
}

const config: ConfigType = { ...defaultConfig, ...serverConfig };
console.log("configuration loaded", { config, defaultConfig, serverConfig });

export { config };

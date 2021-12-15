export interface SertoUiConfig {
  ENVIRONMENT: string;
  IS_DEV: boolean;
  FEATURE_FLAGS?: string;
  SEARCH_API_URL: string;
  SEARCH_UI_URL: string;
  SCHEMAS_API_URL: string;
  SCHEMAS_UI_URL: string;
}

export const DEV_ENV = "development";
const ENVIRONMENT = process.env.NODE_ENV || DEV_ENV;
const domain = window.location.hostname;

export let config: SertoUiConfig = {
  ENVIRONMENT,
  IS_DEV: ENVIRONMENT === DEV_ENV,
  FEATURE_FLAGS: process.env.REACT_APP_FEATURE_FLAGS,
  SEARCH_API_URL: "http://staging.api.search.serto.id",
  SEARCH_UI_URL: "http://staging.search.serto.id",
  SCHEMAS_API_URL: "https://staging.api.schemas.serto.id",
  SCHEMAS_UI_URL: "https://staging.schemas.serto.id",
};

if (window.location.protocol.includes("https")) {
  // staging search doesn't have https, so we gotta use beta or else requests will fail
  config = {
    ...config,
    SEARCH_API_URL: "https://beta.api.search.serto.id",
    SEARCH_UI_URL: "https://beta.search.serto.id",
  };
}

if (ENVIRONMENT !== "development") {
  if (domain.includes("serto.id") && domain.includes("staging")) {
    // config above is right
  } else if (domain.includes("serto.id") && domain.includes("beta")) {
    config = {
      ...config,
      SEARCH_API_URL: "https://beta.api.search.serto.id",
      SEARCH_UI_URL: "https://beta.search.serto.id",
      SCHEMAS_API_URL: "https://beta.api.schemas.serto.id",
      SCHEMAS_UI_URL: "https://beta.schemas.serto.id",
    };
  } else {
    // prod
    config = {
      ...config,
      SEARCH_API_URL: "https://beta.api.search.serto.id",
      SEARCH_UI_URL: "https://search.serto.id",
      SCHEMAS_API_URL: "https://beta.api.schemas.serto.id",
      SCHEMAS_UI_URL: "https://schemas.serto.id",
    };
  }
}

export const links = {
  CONTACT: "https://www.serto.id/about#contact-section",
  SCHEMAS_PLAYGROUND: `${config.SCHEMAS_UI_URL}/playground`,
  CREATE_SCHEMA_PATH: "/schemas/",
};

export function mergeServerConfig<T extends { [key: string]: any }>(defaultConfig: T): T {
  const serverConfigString = (window as any).SERVER_CONFIG;
  let serverConfig: T | undefined;
  if (serverConfigString && serverConfigString !== "$ENVIRONMENT") {
    try {
      serverConfig = JSON.parse(serverConfigString);
    } catch (e) {
      console.error("error parsing server config: ", { serverConfigString, defaultConfig, e });
    }
  }

  const config = { ...defaultConfig, ...serverConfig };
  console.log("config loaded", { config, defaultConfig, serverConfig });
  return config;
}

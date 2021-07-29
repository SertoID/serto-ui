const config = {
  ENVIRONMENT: process.env.NODE_ENV || "development",
  DEFAULT_SCHEMA_API_URL: "https://beta.api.schemas.serto.id",
  DEFAULT_CREATE_SCHEMA_PATH: "/schemas/",
  DEFAULT_SEARCH_API_URL: "https://beta.api.search.serto.id",
  SCHEMA_PLAYGROUND: "https://beta.schemas.serto.id/playground",
};

export { config };

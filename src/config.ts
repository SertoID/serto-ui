const config = {
  ENVIRONMENT: process.env.NODE_ENV || "development",
  DEFAULT_SCHEMA_API_URL: "https://staging.api.schemas.serto.id",
  DEFAULT_CREATE_SCHEMA_PATH: "/schemas/",
  SCHEMA_PLAYGROUND: "https://staging.schemas.serto.id/playground",
};

export { config };

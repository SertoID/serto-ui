const config = {
  ENVIRONMENT: process.env.NODE_ENV || "development",
  DEFAULT_SCHEMA_API_URL: "https://staging.api.schema.serto.id",
  DEFAULT_CREATE_SCHEMA_PATH: "/schemas/",
};

export { config };

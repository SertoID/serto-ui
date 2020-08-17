export enum routes {
  HOMEPAGE = "/",
  ADMIN = "/admin",
  LOGIN = "/login",
  TENANT = "/tenant",
  FEEDS = "/tenant/feeds",
  SCHEMAS = "/tenant/schemas",
  ISSUED_CREDENTIAL = "/tenant/issued-credentials",
  RECEIVED_CREDENTIAL = "/tenant/received-credentials",
  DEVELOPER = "/tenant/developer",
  ACCOUNT = "/tenant/account",
  ONBOARDING = "/onboarding",
  CREATE_ORGANIZATION = "/create-organization",
  ORGANIZATION_MANAGEMENT = "/tenant/management",
}

export enum freeAccount {
  USERS = "2",
  VC_ISSUED = "500",
  VC_PUB_FEED = "500",
  FEEDS_CREATED = "5",
  FEED_SUBSCRIPTIONS = "5",
}

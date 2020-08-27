export enum routes {
  HOMEPAGE = "/",
  ADMIN = "/admin",
  LOGIN = "/login",
  ACCEPT_INVITE = "/acceptInvite/:jwt",
  ONBOARDING = "/onboarding",
  CREATE_ORGANIZATION = "/create-organization",
  FEEDS = "/feeds",
  CREDENTIALS = "/credentials/:tabName?",
  SCHEMAS = "/schemas/:tabName?",
  SETTINGS = "/settings/:tabName?",
  DEVELOPER = "/developer/:tabName?",
}

export enum freeAccount {
  USERS = "2",
  VC_ISSUED = "500",
  VC_PUB_FEED = "500",
  FEEDS_CREATED = "5",
  FEED_SUBSCRIPTIONS = "5",
}

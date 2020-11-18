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
  IDENTITIES = "/identities",
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

export const links = {
  EMAIL_SUPPORT: "help@consensys.id",
  DOCUMENTATION: "https://docs.consensys.id/docs/",
};

export const featureFlags = {
  FEEDS: "feeds",
  VC_WIP: "vc-wip", // WIP VC features like publish to feed, revocable, received VCs tab
};

export interface DidService {
  id: string;
  serviceEndpoint: string;
  type: string;
  description?: string;
}

/** Used internally to represent DIDs returned from Agent. */
export interface Identifier {
  did: string;
  provider: string;
  alias?: string;
  services?: DidService[];
  /** From TrustAgent - deprecated */
  userName?: string;
  /** From TrustAgent - deprecated */
  userType?: string;
}

export interface VeramoIssueVcOptions {
  revocable?: boolean;
  keepCopy?: boolean;
  save?: string;
  proofFormat?: string;
}

export interface SelectedDid {
  did: string;
  messagingSupported?: boolean;
}

export interface DidSearchResult {
  domain: string;
  didDocs: any;
  /** @TODO Multiple DIDs, if present, are comma-separated, but this whole API may change */
  dids: string;
  numBaselineEndpoints?: number;
  numVeramoEndpoints?: number;
}

export interface DidListing {
  did: string;
  domains: string[];
}

export interface JwtUserData {
  name?: string;
  email?: string;
  nickname?: string;
  picture?: string;
  /** JWT subject identifier */
  sub?: string;
}

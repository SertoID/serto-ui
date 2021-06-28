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

export interface SelectedDid {
  did: string;
  messagingSupported?: boolean;
}

export interface DidSearchResult {
  domain: string;
  /** @TODO Multiple DIDs, if present, are comma-separated, but this whole API may change */
  dids: string;
  numBaselineEndpoints?: number;
  numVeramoEndpoints?: number;
}

export interface DidListing {
  did: string;
  domains: string[];
}

export interface AdditionalVCData {
  didListings: DidListing[];
  schemaVerified: boolean;
}

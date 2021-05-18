export interface Identifier {
  did: string;
  provider: string;
  alias?: string;
  userName?: string;
  userType?: string;
}

export interface DidListing {
  did: string;
  domains: string[];
}

export interface AdditionalVCData {
  didListings: DidListing[];
  schemaVerified: boolean;
}

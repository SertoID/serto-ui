export interface Identifier {
  did: string;
  provider: string;
  alias?: string;
  userName?: string;
  userType?: string;
}

/** Quick n dirty VC type with properties we need, the full W3C VC spec has much much more. */
export interface VC {
  "@context": string | string[];
  type: string[];
  issuer: string | { id: string };
  issuanceDate: string;
  credentialSubject: { [key: string]: any };
  proof: { jwt: string };
}

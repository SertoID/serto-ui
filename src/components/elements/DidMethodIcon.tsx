import { Eth } from "@rimble/icons";
import { DidKeyIcon, DidSovIcon, DidWebIcon } from "./Icons";

export interface DidMethodIconProps {
  did: string;
  size: string;
}

export const DidMethodIcon: React.FunctionComponent<DidMethodIconProps> = (props) => {
  const { did, size } = props;
  return (
    <>
      {did.includes("did:ethr:rinkeby") ? (
        <Eth color="#F6C343" size={size} />
      ) : did.includes("did:ethr") ? (
        <Eth color="#637EEA" size={size} />
      ) : did.includes("did:key") ? (
        <DidKeyIcon size={size} />
      ) : did.includes("did:sov") ? (
        <DidSovIcon size={size} />
      ) : did.includes("did:web") ? (
        <DidWebIcon size={size} />
      ) : (
        <></>
      )}
    </>
  );
};

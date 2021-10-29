import { Facebook, LinkedIn, Medium, TwitterBird, YouTube } from "./Icons";

export interface SocialIconsProps {
  platform: string;
  size: number;
}

export const SocialIcons: React.FunctionComponent<SocialIconsProps> = (props) => {
  const { platform, size } = props;
  return (
    <>
      {platform.includes("Facebook") ? (
        <Facebook size={size} />
      ) : platform.includes("LinkedIn") ? (
        <LinkedIn size={size} />
      ) : platform.includes("Medium") ? (
        <Medium size={size} />
      ) : platform.includes("Twitter") ? (
        <TwitterBird size={size} />
      ) : platform.includes("Youtube") ? (
        <YouTube size={size} />
      ) : (
        <></>
      )}
    </>
  );
};

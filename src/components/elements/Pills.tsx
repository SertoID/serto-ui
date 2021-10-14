import styled from "styled-components";
import { Flex, Pill, Text } from "rimble-ui";
import { Facebook, LinkedIn, Medium, TwitterBird, YouTube } from "./Icons";
import { baseColors, colors, fonts } from "../../themes";

export const ExpiredPill: React.FunctionComponent = () => {
  return (
    <Pill color="danger" cursor="pointer" fontFamily={fonts.sansSerif} height={4} px={5}>
      <Text.span fontSize={0} color={colors.danger.base}>
        Expired
      </Text.span>
    </Pill>
  );
};

const PillImg = styled.div`
  align-items: center;
  background-color: ${baseColors.white};
  border: 1px solid ${colors.nearWhite};
  border-radius: 50%;
  display: flex;
  height: 22px;
  justify-content: center;
  overflow: hidden;
  width: 22px;
`;

export interface PillWithImgProps {
  icon?: JSX.Element;
  text: string;
}

export const PillWithImg: React.FunctionComponent<PillWithImgProps> = (props) => {
  return (
    <Flex
      alignItems="center"
      bg={colors.nearWhite}
      borderRadius={4}
      fontFamily={fonts.sansSerif}
      height={4}
      justifyContent={props.icon ? "flex-start" : "center"}
      width="100px"
    >
      {props.icon && <PillImg>{props.icon}</PillImg>}
      <Text fontSize={0} px={2}>
        {props.text}
      </Text>
    </Flex>
  );
};

export interface SocialPillsProps {
  platform: string;
}

export const SocialPills: React.FunctionComponent<SocialPillsProps> = (props) => {
  const { platform } = props;
  return (
    <>
      {platform === "facebook" ? (
        <PillWithImg icon={<Facebook size="22" />} text="Facebook" />
      ) : platform === "linkedin" ? (
        <PillWithImg icon={<LinkedIn size="22" />} text="LinkedIn" />
      ) : platform === "medium" ? (
        <PillWithImg icon={<Medium size="22" />} text="Medium" />
      ) : platform === "twitter" ? (
        <PillWithImg icon={<TwitterBird size={18} />} text="Twitter" />
      ) : platform === "youtube" ? (
        <PillWithImg icon={<YouTube size={20} />} text="YouTube" />
      ) : (
        <PillWithImg text={platform} />
      )}
    </>
  );
};

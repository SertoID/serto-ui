import styled from "styled-components";
import { Flex, Pill, Text } from "rimble-ui";
import { LinkedIn, Medium, Youtube } from "./Icons";
import { colors, fonts } from "../../themes";

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
  border-radius: 50%;
  display: flex;
  height: 24px;
  justify-content: center;
  overflow: hidden;
  width: 24px;
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
      width="94px"
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
      {platform === "linkedin" ? (
        <PillWithImg icon={<LinkedIn size="24px" />} text="LinkedIn" />
      ) : platform === "medium" ? (
        <PillWithImg icon={<Medium size="24px" />} text="Medium" />
      ) : platform === "twitter" ? (
        <PillWithImg icon={<LinkedIn size="24px" />} text="Twitter" />
      ) : platform === "youtube" ? (
        <PillWithImg icon={<Youtube height="18px" width="24px" />} text="YouTube" />
      ) : (
        <PillWithImg text={platform} />
      )}
    </>
  );
};

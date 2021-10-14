import styled from "styled-components";
import { Flex, Pill, Text } from "rimble-ui";
import { Facebook, LinkedIn, Medium, TwitterBird, YouTube } from "./Icons";
import { baseColors, colors, fonts } from "../../themes";
import { LinkedId } from "../../types";

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
  [key: string]: any;
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
    >
      {props.icon ? (
        <>
          <PillImg>{props.icon}</PillImg>
          <Text color={baseColors.black} fontSize={0} pl={2} pr={3}>
            {props.text}
          </Text>
        </>
      ) : (
        <Text color={baseColors.black} fontSize={0} px={3}>
          {props.text}
        </Text>
      )}
    </Flex>
  );
};

const StyledLink = styled.a`
  margin-right: 16px;
  text-decoration: none;
`;

export interface SocialPillsProps {
  linkedId: LinkedId;
}

export const SocialPills: React.FunctionComponent<SocialPillsProps> = (props) => {
  const { linkedId } = props;
  return (
    <>
      {linkedId.platform === "Facebook" ? (
        <StyledLink href={linkedId.proofUrl} target="_blank">
          <PillWithImg icon={<Facebook size="22" />} text={linkedId.linkedId} />
        </StyledLink>
      ) : linkedId.platform === "LinkedIn" ? (
        <StyledLink href={linkedId.proofUrl} target="_blank">
          <PillWithImg icon={<LinkedIn size="22" />} text={linkedId.linkedId} />
        </StyledLink>
      ) : linkedId.platform === "Medium" ? (
        <StyledLink href={linkedId.proofUrl} target="_blank">
          <PillWithImg icon={<Medium size="22" />} text={linkedId.linkedId} />
        </StyledLink>
      ) : linkedId.platform === "Twitter" ? (
        <StyledLink href={linkedId.proofUrl} target="_blank">
          <PillWithImg icon={<TwitterBird size={18} />} text={linkedId.linkedId} />
        </StyledLink>
      ) : linkedId.platform === "Youtube" ? (
        <StyledLink href={linkedId.proofUrl} target="_blank">
          <PillWithImg icon={<YouTube size={20} />} text={linkedId.linkedId} />
        </StyledLink>
      ) : (
        <StyledLink href={linkedId.proofUrl} target="_blank">
          <PillWithImg text={linkedId.linkedId} />
        </StyledLink>
      )}
    </>
  );
};

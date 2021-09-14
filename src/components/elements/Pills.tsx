import { Pill, Text } from "rimble-ui";
import { fonts, colors } from "../../themes";

export const ExpiredPill: React.FunctionComponent = () => {
  return (
    <Pill color="danger" cursor="pointer" fontFamily={fonts.sansSerif} height={4} px={5}>
      <Text.span fontSize={0} color={colors.danger.base}>
        Expired
      </Text.span>
    </Pill>
  );
};

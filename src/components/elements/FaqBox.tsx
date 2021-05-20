import { Box } from "rimble-ui";
import { H4 } from "../layouts";
import { colors } from "../../themes";

export interface FaqBoxProps {
  heading: string;
}

export const FaqBox: React.FunctionComponent<FaqBoxProps> = (props) => (
  <Box border={1} mb={4} p={4}>
    <H4 borderBottom={1} color={colors.primary.base} my={0} pb={4}>
      {props.heading}
    </H4>
    <Box maxWidth="850px">{props.children}</Box>
  </Box>
);

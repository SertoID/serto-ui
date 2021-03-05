import * as React from "react";
import { Box, Pill, Text } from "rimble-ui";
import { baseColors } from "../../../themes";

export interface ExpandProps {
  expandButtonText?: string;
  contractButtonText?: string;
}
export const Expand: React.FunctionComponent<ExpandProps> = (props) => {
  const [isOpen, setOpen] = React.useState(false);

  return (
    <Box my={2}>
      {isOpen && <>{props.children}</>}
      <button
        onClick={() => setOpen(!isOpen)}
        style={{
          backgroundColor: baseColors.white,
          border: "none",
          cursor: "pointer",
          padding: "0",
          position: "relative",
          outline: "none",
          width: "100%",
        }}
      >
        <Box borderTop={1} position="absolute" top="50%" width="100%" />
        <Pill color="primary" cursor="pointer" height={3} px={2}>
          <Text.span
            fontSize={0}
            fontWeight={3}
            letterSpacing={1}
            style={{
              textTransform: "uppercase",
            }}
          >
            {isOpen ? props.contractButtonText || "Less" : props.expandButtonText || "More"}
          </Text.span>
        </Pill>
      </button>
    </Box>
  );
};

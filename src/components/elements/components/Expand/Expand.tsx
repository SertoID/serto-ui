import * as React from "react";
import { Box, Pill, Text } from "rimble-ui";

export const Expand: React.FunctionComponent = (props) => {
  const [isOpen, setOpen] = React.useState(false);

  return (
    <Box my={"10px"}>
      {isOpen && <>{props.children}</>}
      <button
        onClick={() => setOpen(!isOpen)}
        style={{
          backgroundColor: "#FFFFFF",
          border: "none",
          cursor: "pointer",
          padding: "0",
          position: "relative",
          outline: "none",
          width: "100%",
        }}
      >
        <Box borderTop={"1px solid #EDECFA"} position={"absolute"} top={"50%"} width={1} />
        <Pill color="primary" cursor={"pointer"} fontSize={"12px"} height={"1.5rem"} px={"12px"} m={"0 auto"}>
          <Text.span
            fontSize={"12px"}
            fontWeight={"bold"}
            style={{
              textTransform: "uppercase",
            }}
          >
            {isOpen ? "Less" : "More"}
          </Text.span>
        </Pill>
      </button>
    </Box>
  );
};

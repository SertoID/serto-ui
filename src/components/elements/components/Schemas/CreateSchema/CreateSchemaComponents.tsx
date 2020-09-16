import * as React from "react";
import { Heading } from "rimble-ui";
import styled from "styled-components";
import { baseColors, fonts } from "../../../themes";

export const StepHeading: React.FunctionComponent = (props) => (
  <Heading px={4} mt="20px" mb={3} color={baseColors.black} fontFamily={fonts.sansSerif} fontSize={4} fontWeight={3}>
    {props.children}
  </Heading>
);

export const StepWrapper = styled.div`
  flex-grow: 1;
  min-height: 0;
  overflow: auto;
  padding: 0 24px;
`;

export const StepWrapperFullWidth = styled(StepWrapper)`
  padding: 0;
`;

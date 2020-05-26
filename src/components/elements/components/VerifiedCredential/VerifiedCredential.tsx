import * as React from "react";
import styled from "styled-components";
import { baseColors, fonts } from "../../themes";

const Container = styled.table`
  background-color: ${baseColors.white};
  padding: 10px;
  width: 100%;
`;

const Label = styled.label`
  color: #838393;
  font-family: ${fonts.sansSerif};
  font-size: 14px;
  line-height: 225%;
  letter-spacing: -0.02em;
`;

const Score = styled.span`
  color: #5758f6;
  display: block;
  font-family: ${fonts.sansSerif};
  font-weight: 600;
  font-size: 16px;
  letter-spacing: 0.02em;
  line-height: 24px;
`;

const Detail = styled.span`
  color: #838393;
  font-family: ${fonts.sansSerif};
  font-size: 14px;
  line-height: 225%;
  letter-spacing: -0.02em;
  text-align: right;
`;

const DetailItem = styled.div`
  border-bottom: 1px solid #F6F6FF;
  display: flex;
  justify-content: space-between;
  padding: 10px 0;
`;

export const VerifiedCredential: React.FunctionComponent = props => {
  return (
    <Container>
      <Label>Issuer A</Label>
      <Score>Positive</Score>
      <DetailItem>
        <Label>Time to Verify</Label>
        <Detail>32 mins</Detail>
      </DetailItem>
      <DetailItem>
        <Label>Time to Verify</Label>
        <Detail>32 mins</Detail>
      </DetailItem>
    </Container>
  );
};

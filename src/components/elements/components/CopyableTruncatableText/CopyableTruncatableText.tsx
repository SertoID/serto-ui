import * as React from "react";
// import { Text } from "rimble-ui";
import { CopyToClipboard } from "../CopyToClipboard";
import styled from "styled-components";

const ContainerContainer = styled.div``;

const Container = styled.div`
  display: flex;
  align-items: center;
  height: 48px;
  padding: 2px 2px 2px 2px;
  line-height: 26px;
  background-color: white;
  border: 1px solid;
  border-color: #cccccc;
  border-radius: 4px;
  max-width: 400px;
  min-width: 400px;
  justify-content: space-between;
`;

const TruncatableText = styled.input`
  text-overflow: ellipsis;
  overflow: hidden;
  border: none;
  outline: none;
  width: 100%;
  font-size: 16px;
  line-height: 26px;
  readonly: true;
`;

const CopyButtonContainer = styled.div`
  position: relative;
  right: 2px;
`;

export interface CopyableTruncatableTextProps {
  text: string;
  size?: string;
  textButton?: boolean;
}

export const CopyableTruncatableText: React.FunctionComponent<CopyableTruncatableTextProps> = (props) => {
  return (
    <ContainerContainer>
      <Container>
        <TruncatableText type="text" value={props.text} />
        <CopyButtonContainer>
          <CopyToClipboard {...props} />
        </CopyButtonContainer>
      </Container>
    </ContainerContainer>
  );
};

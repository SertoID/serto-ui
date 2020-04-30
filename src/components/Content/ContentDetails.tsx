import * as React from "react";
import styled from "styled-components";
import { Metadata } from "../types";
import { fonts } from "../elements";

const ContentDetailHeader = styled.div`
  display: flex;
  flex-direction: column;
  margin: 50px auto 20px;
  width: 750px;
`;

const Label = styled.label`
  color: #afafaf;
  font-family: ${fonts.SANS_SERIF};
  font-weight: 600;
  font-size: 12px;
  line-height: 18px;
  text-transform: uppercase;
`;

const Value = styled.span`
  color: #5758f6;
  font-family: ${fonts.SANS_SERIF};
  font-size: 18px;
  line-height: 27px;
`;

export interface ContentDetailProps {
  metadata: Metadata;
}

export const ContentDetails: React.FunctionComponent<
  ContentDetailProps
> = props => {
  const { metadata } = props;
  return (
    <ContentDetailHeader>
      <>
        <Label>Article</Label>
        <Value>{metadata.slug}</Value>
      </>
      <>
        <Label>Last Published</Label>
        <Value>{metadata.originalPublishDate}</Value>
      </>
      <>
        <Label>Original Published</Label>
        <Value>{metadata.originalPublishDate}</Value>
      </>
      <>
        <Label>Version History</Label>
        <Value>{metadata.version}</Value>
      </>
      <>
        <Label>Content ID</Label>
        <Value>{metadata.contentId}</Value>
      </>
      <>
        <Label>Publisher</Label>
        <Value>{metadata.publisher}</Value>
      </>
    </ContentDetailHeader>
  );
};

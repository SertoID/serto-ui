import * as React from "react";
import { Card } from "rimble-ui";
import styled from "styled-components";
import Prism from "prismjs";
import "prismjs/components/prism-json";
import { fonts, colors } from "../../../themes/";

export const PrismHighlightedCodeWrap = styled(Card)`
  background: ${colors.nearWhite};
  flex-grow: 1;
  overflow: auto;
  padding: 16px;
  margin: 0 8px 8px 0;
  font-size: 12px;
  font-family: ${fonts.monospace};
  border-radius: 4px;

  pre {
    margin: 0;
  }

  .token.property {
    color: #905;
  }
  .token.string {
    color: #07a;
  }
  .token.punctuation {
    color: #999;
  }
  .token.boolean,
  .token.number {
    color: #690;
  }
  .token.operator {
    color: #9a6e3a;
  }
  .token.comment {
    color: slategray;
  }
`;

export interface HighlightedJsonProps {
  json: string;
  style?: any;
}

export const HighlightedJson: React.FunctionComponent<HighlightedJsonProps> = (props) => {
  const jsonHtml = Prism.highlight(props.json, Prism.languages.json, "json");
  return (
    <PrismHighlightedCodeWrap style={props.style}>
      <pre>
        <code dangerouslySetInnerHTML={{ __html: jsonHtml }}></code>
      </pre>
    </PrismHighlightedCodeWrap>
  );
};

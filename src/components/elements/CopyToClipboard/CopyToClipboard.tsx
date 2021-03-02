import * as React from "react";
import styled from "styled-components";
import { Button } from "rimble-ui";
import { colors } from "../../../themes";
import { copyToClipboard } from "../../../utils";
import { ContentCopy, Check } from "../Icons";

export const ContentCopyStyled = styled.span`
  cursor: pointer;
  &:hover svg {
    transition: 250ms ease;
    fill: #5952ff;
  }
`;

export interface CopyToClipboardProps {
  text: string;
  color?: string;
  hoverTitle?: string;
  size?: string;
  textButton?: boolean;
  textButtonTitle?: string;
}

export const CopyToClipboard: React.FunctionComponent<CopyToClipboardProps> = (props) => {
  const [copied, setCopied] = React.useState(false);

  React.useEffect(() => {
    if (copied) {
      setTimeout(() => {
        setCopied(false);
      }, 1000);
    }
  }, [copied]);

  if (copied) {
    if (props.textButton) {
      return <Button.Outline size="small">Copied</Button.Outline>;
    }
    return <Check color={colors.success.base} size={props.size} />;
  }

  if (props.textButton) {
    return (
      <Button.Outline color={props.color} onClick={() => setCopied(copyToClipboard(props.text))} size="small">
        {props.textButtonTitle || "Copy"}
      </Button.Outline>
    );
  }
  return (
    <ContentCopyStyled title={props.hoverTitle}>
      <ContentCopy
        color={props.color}
        onClick={() => setCopied(copyToClipboard(props.text))}
        size={props.size}
        style={{ cursor: "pointer" }}
      />
    </ContentCopyStyled>
  );
};

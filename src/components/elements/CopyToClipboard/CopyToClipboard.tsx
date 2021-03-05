import * as React from "react";
import styled from "styled-components";
import { Button, Flex } from "rimble-ui";
import { colors } from "../../../themes";
import { copyToClipboard } from "../../../utils";
import { ContentCopy, Check } from "../Icons";

interface ContentCopyStyledProps {
  hoverColor?: string;
}

const ContentCopyStyled = styled.span`
  cursor: pointer;
  &:hover svg {
    fill: ${(props: ContentCopyStyledProps) => (props.hoverColor ? props.hoverColor : colors.primary.base)};
    transition: 250ms ease;
  }
`;

export interface CopyToClipboardProps {
  text: string;
  color?: string;
  hoverColor?: string;
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
        <Flex alignItems="center" justifyCOntent="center">
          <ContentCopy size="16px" style={{ marginRight: "4px" }} />
          {props.textButtonTitle || "Copy"}
        </Flex>
      </Button.Outline>
    );
  }
  return (
    <ContentCopyStyled
      hoverColor={props.hoverColor}
      onClick={() => setCopied(copyToClipboard(props.text))}
      title={props.hoverTitle}
    >
      <ContentCopy color={props.color} size={props.size} />
    </ContentCopyStyled>
  );
};

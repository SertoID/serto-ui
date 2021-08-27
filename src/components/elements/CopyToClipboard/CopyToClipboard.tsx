import * as React from "react";
import styled from "styled-components";
import { ContentCopy, Check } from "@rimble/icons";
import { Button, Flex } from "rimble-ui";
import { baseColors, colors } from "../../../themes";
import { copyToClipboard } from "../../../utils";

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
  buttonOverride?(copied: boolean): JSX.Element;
}

export const CopyToClipboard: React.FunctionComponent<CopyToClipboardProps> = (props) => {
  const [copied, setCopied] = React.useState(false);

  React.useEffect(() => {
    if (copied) {
      setTimeout(() => {
        setCopied(false);
      }, 2500);
    }
  }, [copied]);

  if (props.buttonOverride) {
    return <span onClick={() => setCopied(copyToClipboard(props.text))}>{props.buttonOverride(copied)}</span>;
  }

  if (copied) {
    if (props.textButton) {
      return <Button.Outline size="small">Copied</Button.Outline>;
    }
    return <Check color={colors.success.base} size={props.size} />;
  }

  if (props.textButton) {
    return (
      <Button.Outline
        color={props.color}
        onClick={() => setCopied(copyToClipboard(props.text))}
        size="small"
        style={{ backgroundColor: baseColors.white }}
      >
        <Flex alignItems="center" justifyContent="center">
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

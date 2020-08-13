import * as React from "react";
import { ContentCopy, Check } from "@rimble/icons";
import { Button } from "rimble-ui";
import { copyToClipboard, colors } from "../../";

export interface CopyToClipboardProps {
  text: string;
  size?: string;
  textButton?: boolean;
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
      return <Button.Outline size="small">{"Copied"}</Button.Outline>;
    }
    return <Check color={colors.success.base} size={props.size} />;
  }

  if (props.textButton) {
    return (
      <Button size="small" onClick={() => setCopied(copyToClipboard(props.text))}>
        {"Copy"}
      </Button>
    );
  }
  return (
    <ContentCopy
      onClick={() => setCopied(copyToClipboard(props.text))}
      size={props.size}
      style={{ cursor: "pointer" }}
    />
  );
};

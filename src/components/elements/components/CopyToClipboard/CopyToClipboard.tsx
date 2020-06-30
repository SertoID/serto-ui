import * as React from "react";
import { ContentCopy, Check } from "@rimble/icons";
import { copyToClipboard, colors } from "../../";

export interface CopyToClipboardProps {
  text: string;
  size?: string;
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
    return <Check color={colors.success.base} size={props.size} />;
  }

  return (
    <ContentCopy
      onClick={() => setCopied(copyToClipboard(props.text))}
      size={props.size}
      style={{ cursor: "pointer" }}
    />
  );
};

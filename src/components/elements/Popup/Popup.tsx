import * as React from "react";
import styled from "styled-components";
import { Box } from "rimble-ui";
import { baseColors, colors } from "../../../themes";

const PopupBox = styled(Box)`
  display: none;
  position: absolute;
  right: ${(props) => props.popupRightPos}px;
  top: ${(props) => props.popupTopPos};
  background: ${baseColors.white};
  border: 1px solid ${colors.lightGray};
  border-radius: 4px;
  min-width: 180px;
  font-size: 14px;

  &:before {
    content: "";
    position: absolute;
    right: ${(props) => props.arrowOffset - 1}px;
    top: -10px;
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-bottom: 10px solid ${colors.lightGray};
  }
  &:after {
    content: "";
    position: absolute;
    right: ${(props) => props.arrowOffset}px;
    top: -9px;
    border-left: 9px solid transparent;
    border-right: 9px solid transparent;
    border-bottom: 9px solid ${baseColors.white};
  }
`;
const PopupWrap = styled(Box)`
  position: relative;
  z-index: 1;
  &:hover ${PopupBox}.hoverable, ${PopupBox}.open {
    display: block;
  }
`;
export const PopupGroup = styled.div`
  padding: 12px 16px;
  border-bottom: 1px solid ${colors.lightGray};
  &:last-child {
    border-bottom: 0;
  }

  & > a {
    display: block;
    margin-bottom: 12px;
    text-decoration: none;
    cursor: pointer;
    color: ${baseColors.black};

    &:hover {
      color: ${baseColors.blurple};
    }
    &.selected {
      cursor: default;
      font-weight: bold;
      color: ${baseColors.black};
    }
  }
  & > a:last-child {
    margin-bottom: 0;
  }
`;

export interface PopupProps {
  popupContents: JSX.Element;
  /** Default is trigger on hover. */
  triggerOnClick?: boolean;
  remainOpenOnClick?: boolean;
  rimbleProps?: { [prop: string]: any };
  popupRimbleProps?: { [prop: string]: any };
  /** CSS "top" property of popup, default "calc(100% + 10px)". **/
  popupTopPos?: string;
  /** CSS "right" property of popup in px, default 0. **/
  popupRightPos?: number;
  /** Offset of arrow from right edge of popup, in px. **/
  arrowOffset?: number;
}

export const Popup: React.FunctionComponent<PopupProps> = (props) => {
  const node = React.useRef() as React.MutableRefObject<HTMLDivElement>;
  const [isOpen, setIsOpen] = React.useState(false);

  const onClickOutside = React.useMemo(
    () => (e: any) => {
      if (!isOpen || node.current.contains(e.target)) {
        return;
      }
      setIsOpen(false);
    },
    [node, isOpen],
  );
  React.useEffect(() => {
    if (props.triggerOnClick) {
      document.addEventListener("mousedown", onClickOutside);
      return () => {
        document.removeEventListener("mousedown", onClickOutside);
      };
    }
  }, [onClickOutside, props.triggerOnClick]);

  return (
    <PopupWrap ref={node} {...props.rimbleProps} onClick={() => setIsOpen(!isOpen)}>
      {props.children}
      <PopupBox
        className={!props.triggerOnClick ? "hoverable" : isOpen ? "open" : undefined}
        arrowOffset={props.arrowOffset || 10}
        popupTopPos={props.popupTopPos || "calc(100% + 10px)"}
        popupRightPos={props.popupRightPos || 0}
        onClick={props.remainOpenOnClick && ((e: Event) => e.stopPropagation())}
        {...props.popupRimbleProps}
      >
        {props.popupContents}
      </PopupBox>
    </PopupWrap>
  );
};

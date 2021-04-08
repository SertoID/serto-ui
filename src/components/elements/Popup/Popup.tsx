import * as React from "react";
import styled from "styled-components";
import { Box } from "rimble-ui";
import { baseColors, colors } from "../../../themes";

// @TODO/tobek Fix spacing and triangle position so that they can be changed via props or automatically fits to parent, or use a library for this.

const PopupBox = styled(Box)`
  display: none;
  position: absolute;
  right: -12px;
  background: ${baseColors.white};
  border: 1px solid ${colors.lightGray};
  border-radius: 4px;
  min-width: 180px;
  font-size: 14px;

  a {
    display: block;
    text-decoration: none;
    cursor: pointer;
    color: ${baseColors.black};
  }
  a:hover {
    color: ${baseColors.blurple};
  }

  &:before {
    content: "";
    position: absolute;
    right: 11px;
    top: -10px;
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-bottom: 10px solid ${colors.lightGray};
  }
  &:after {
    content: "";
    position: absolute;
    right: 12px;
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
  }
  & > a:last-child {
    margin-bottom: 0;
  }
`;

export interface PopupProps {
  popupContents: JSX.Element;
  /** Default is trigger on hover. */
  triggerOnClick?: boolean;
  /** Extra props to pass to Rimble Box that wraps this component*/
  [prop: string]: any;
}

export const Popup: React.FunctionComponent<PopupProps> = (props) => {
  const [isOpen, setIsOpen] = React.useState(false);
  // @TODO/tobek If triggerOnClick and isOpen, add listener on document to close when clicked elsewhere.
  return (
    <PopupWrap {...props} onClick={() => setIsOpen(!isOpen)}>
      {props.children}
      <PopupBox className={!props.triggerOnClick ? "hoverable" : isOpen ? "open" : undefined}>
        {props.popupContents}
      </PopupBox>
    </PopupWrap>
  );
};

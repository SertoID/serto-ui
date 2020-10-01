import * as React from "react";
import { Box, Button, Card, Flex, Heading, Modal } from "rimble-ui";
import styled from "styled-components";
import { baseColors, fonts } from "../themes";

export interface ModalWithXProps {
  isOpen?: boolean;
  close(): any;
  /** Props that will be passed to Rimble `Card` component around the modal: */
  [key: string]: any;
}
export const ModalWithX: React.FunctionComponent<ModalWithXProps> = (props) => {
  return (
    <Modal isOpen={props.isOpen}>
      <Card p={0} pb={3} pt="48px" {...props}>
        <Button.Text icononly icon="Close" position="absolute" top={1} right={2} onClick={props.close} />
        <Flex flexDirection="column" minHeight="0" maxHeight="calc(95vh - 48px)">
          {props.children}
        </Flex>
      </Card>
    </Modal>
  );
};

export interface ModalBackProps {
  onClick(e: MouseEvent): any;
}
export const ModalBack: React.FunctionComponent<ModalBackProps> = (props) => {
  return <Button.Text icononly icon="ArrowBack" position="absolute" top={2} left={2} onClick={props.onClick} />;
};

export const ModalHeader: React.FunctionComponent = (props) => (
  <Heading.h3 px={4} mt={1} mb={3} color={baseColors.black} fontFamily={fonts.sansSerif} letterSpacing=".3px">
    {props.children}
  </Heading.h3>
);

export const ModalContent = styled(Box)`
  flex-grow: 1;
  min-height: 0;
  overflow: auto;
  padding: 0 24px 16px;
`;

export const ModalContentFullWidth = styled(ModalContent)`
  padding-left: 0;
  padding-right: 0;
`;

export const ModalFooter = styled(Box)`
  padding: 0 24px;
`;

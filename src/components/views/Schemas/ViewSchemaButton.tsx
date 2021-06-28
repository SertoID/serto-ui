import * as React from "react";
import styled from "styled-components";
import { SchemaDataResponse } from "./types";
import { Button } from "rimble-ui";
import { ModalContent, ModalFooter, ModalWithX } from "../../elements/Modals";
import { SchemaDetail } from "./SchemaDetail";

const Wrapper = styled.span`
  cursor: pointer;
  &:hover {
    opacity: 0.75;
  }
`;

export interface ViewSchemaButtonProps {
  schema?: SchemaDataResponse;
  hideIssueVcInDetail?: boolean;
}

export const ViewSchemaButton: React.FunctionComponent<ViewSchemaButtonProps> = (props) => {
  const { schema, hideIssueVcInDetail } = props;
  const [modalOpen, setModalOpen] = React.useState(false);

  if (!schema) {
    return <>{props.children}</>;
  }

  return (
    <>
      <Wrapper onClick={() => setModalOpen(true)}>
        {props.children || <Button.Outline size="small">View</Button.Outline>}
      </Wrapper>
      <ModalWithX isOpen={modalOpen} close={() => setModalOpen(false)} minWidth={9} maxWidth={10}>
        <ModalContent>{modalOpen && <SchemaDetail schema={schema} hideIssueVc={hideIssueVcInDetail} />}</ModalContent>
        <ModalFooter mt={3}>
          <Button width="100%" onClick={() => setModalOpen(false)}>
            Close
          </Button>
        </ModalFooter>
      </ModalWithX>
    </>
  );
};

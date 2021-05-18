import * as React from "react";
import { SchemaDataResponse } from "./types";
import { Button } from "rimble-ui";
import { ModalContent, ModalFooter, ModalWithX } from "../../elements/Modals";
import { SchemaDetail } from "./SchemaDetail";

export interface ViewSchemaButtonProps {
  schema: SchemaDataResponse;
  hideIssueVcInDetail?: boolean;
}

export const ViewSchemaButton: React.FunctionComponent<ViewSchemaButtonProps> = (props) => {
  const [modalOpen, setModalOpen] = React.useState(false);

  return (
    <>
      <span onClick={() => setModalOpen(true)}>
        {props.children || <Button.Outline size="small">View</Button.Outline>}
      </span>
      <ModalWithX isOpen={modalOpen} close={() => setModalOpen(false)} minWidth={9}>
        <ModalContent>
          {modalOpen && <SchemaDetail schema={props.schema} hideIssueVc={props.hideIssueVcInDetail} />}
        </ModalContent>
        <ModalFooter mt={3}>
          <Button width="100%" onClick={() => setModalOpen(false)}>
            Close
          </Button>
        </ModalFooter>
      </ModalWithX>
    </>
  );
};

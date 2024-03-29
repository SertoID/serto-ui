import * as React from "react";
import { Button } from "rimble-ui";
import { ModalWithX } from "../../elements/Modals";
import { IssueVcFlow } from "./IssueVc/IssueVcFlow";
import { Identifier } from "../../../types";

export interface IssueCredentialButtonProps {
  issuerIdentifiers: Identifier[];
  subjectIdentifier?: Identifier;
  onComplete?(): void;
}

export const IssueCredentialButton: React.FunctionComponent<IssueCredentialButtonProps> = (props) => {
  const [isIssueModalOpen, setIsIssueModalOpen] = React.useState(false);

  return (
    <>
      <Button.Outline size="small" onClick={() => setIsIssueModalOpen(true)}>
        Issue Credential
      </Button.Outline>
      <ModalWithX isOpen={isIssueModalOpen} close={() => setIsIssueModalOpen(false)} minWidth={9} maxWidth={11}>
        <IssueVcFlow
          subjectIdentifier={props.subjectIdentifier}
          identifiers={props.issuerIdentifiers}
          onComplete={() => {
            setIsIssueModalOpen(false);
            props.onComplete && props.onComplete();
          }}
        />
      </ModalWithX>
    </>
  );
};

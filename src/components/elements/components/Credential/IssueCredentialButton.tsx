import * as React from "react";
import { Button } from "rimble-ui";
import { ModalWithX } from "../Modals";
import { IssueVc } from "../../../views/Credentials/IssueVc";
import { Identifier } from "../../../../types";

export interface IssueCredentialButtonProps {
  issuerIdentifiers: Identifier[];
  subjectIdentifier?: Identifier;
}

export const IssueCredentialButton: React.FunctionComponent<IssueCredentialButtonProps> = (props) => {
  const [isIssueModalOpen, setIsIssueModalOpen] = React.useState(false);

  return (
    <>
      <Button.Outline size="small" onClick={() => setIsIssueModalOpen(true)}>
        Issue Credential
      </Button.Outline>
      <ModalWithX isOpen={isIssueModalOpen} close={() => setIsIssueModalOpen(false)} minWidth={9} maxWidth={11}>
        <IssueVc
          subjectIdentifier={props.subjectIdentifier}
          identifiers={props.issuerIdentifiers}
          onComplete={() => setIsIssueModalOpen(false)}
        />
      </ModalWithX>
    </>
  );
};

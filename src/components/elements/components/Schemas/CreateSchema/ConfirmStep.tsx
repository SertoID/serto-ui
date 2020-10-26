import * as React from "react";
import { Button, Loader } from "rimble-ui";
import { SchemaDetail } from "../SchemaDetail";
import { CompletedSchema, WorkingSchema } from "../types";
import { createSchemaInput } from "../utils";
import { ModalContent, ModalHeader, ModalFooter } from "../../Modals";

export interface ConfirmStepProps {
  schema: WorkingSchema;
  loading?: boolean;
  onComplete(): void;
}

export const ConfirmStep: React.FunctionComponent<ConfirmStepProps> = (props) => {
  const { schema } = props;

  return (
    <>
      <ModalHeader>Confirm and Publish</ModalHeader>
      <ModalContent>
        <SchemaDetail schema={createSchemaInput(schema as CompletedSchema)} />
      </ModalContent>
      <ModalFooter my={3}>
        <Button width="100%" onClick={props.onComplete} disabled={props.loading}>
          {props.loading ? <Loader color="white" /> : "Publish"}
        </Button>
      </ModalFooter>
    </>
  );
};
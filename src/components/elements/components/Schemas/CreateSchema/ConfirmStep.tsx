import * as React from "react";
import { Button, Loader } from "rimble-ui";
import { SchemaDetail } from "../SchemaDetail";
import { CompletedSchema, WorkingSchema } from "../types";
import { createSchemaInput } from "../utils";
import { ModalContent, ModalHeader } from "../../Modals";

export interface ConfirmStepProps {
  schema: WorkingSchema;
  loading?: boolean;
  onComplete(): void;
}

export const ConfirmStep: React.FunctionComponent<ConfirmStepProps> = (props) => {
  const { schema } = props;

  return (
    <>
      <ModalHeader>Review Schema</ModalHeader>
      <ModalContent>
        <SchemaDetail schema={createSchemaInput(schema as CompletedSchema)} />
        <Button mt={3} width="100%" onClick={props.onComplete} disabled={props.loading}>
          {props.loading ? <Loader color="white" /> : "Publish"}
        </Button>
      </ModalContent>
    </>
  );
};

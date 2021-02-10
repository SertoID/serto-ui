import * as React from "react";
import { Button, Loader } from "rimble-ui";
import { SchemaDetail } from "../SchemaDetail";
import { CompletedSchema, WorkingSchema } from "../types";
import { createSchemaInput } from "../utils";
import { ModalContent, ModalHeader } from "../../../elements/Modals";
import { SertoUiContext, SertoUiContextInterface } from "../../../../context/SertoUiContext";

export interface ConfirmStepProps {
  schema: WorkingSchema;
  isUpdate?: boolean;
  loading?: boolean;
  onComplete(): void;
}

export const ConfirmStep: React.FunctionComponent<ConfirmStepProps> = (props) => {
  const { schema } = props;
  const context = React.useContext<SertoUiContextInterface>(SertoUiContext);

  return (
    <>
      <ModalHeader>Review Schema</ModalHeader>
      <ModalContent>
        <SchemaDetail schema={createSchemaInput(schema as CompletedSchema, context.buildSchemaUrl)} />
        <Button mt={3} width="100%" onClick={props.onComplete} disabled={props.loading}>
          {props.loading ? <Loader color="white" /> : props.isUpdate ? "Update" : "Publish"}
        </Button>
      </ModalContent>
    </>
  );
};

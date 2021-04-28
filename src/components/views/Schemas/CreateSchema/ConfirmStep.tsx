import * as React from "react";
import { Flash, Button, Loader } from "rimble-ui";
import { SchemaDetail } from "../SchemaDetail";
import { SchemaDataInput } from "../types";

export interface ConfirmStepProps {
  builtSchema: SchemaDataInput;
  error?: string;
  isUpdate?: boolean;
  loading?: boolean;
  onComplete(): void;
}

export const ConfirmStep: React.FunctionComponent<ConfirmStepProps> = (props) => {
  const { builtSchema, error } = props;

  return (
    <>
      <SchemaDetail schema={builtSchema} noTools={true} noSwitcher={true} />
      {error && (
        <Flash mt={3} variant="danger">
          {error}
        </Flash>
      )}
      <Button mt={3} width="100%" onClick={props.onComplete} disabled={props.loading}>
        {props.loading ? <Loader color="white" /> : props.isUpdate ? "Update" : "Publish"}
      </Button>
    </>
  );
};

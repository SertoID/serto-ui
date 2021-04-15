import * as React from "react";
import { Button, Loader } from "rimble-ui";
import { SchemaDetail } from "../SchemaDetail";
import { SchemaDataInput } from "../types";

export interface ConfirmStepProps {
  builtSchema: SchemaDataInput;
  isUpdate?: boolean;
  loading?: boolean;
  onComplete(): void;
}

export const ConfirmStep: React.FunctionComponent<ConfirmStepProps> = (props) => {
  const { builtSchema } = props;

  return (
    <>
      <SchemaDetail schema={builtSchema} noTools={true} noSwitcher={true} />
      <Button mt={3} width="100%" onClick={props.onComplete} disabled={props.loading}>
        {props.loading ? <Loader color="white" /> : props.isUpdate ? "Update" : "Publish"}
      </Button>
    </>
  );
};

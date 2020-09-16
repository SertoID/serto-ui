import * as React from "react";
import { Box, Button, Loader } from "rimble-ui";
import { SchemaDetail } from "../SchemaDetail";
import { CompletedSchema, WorkingSchema } from "../types";
import { createSchemaInput } from "../utils";
import { StepHeading, StepWrapper } from "./CreateSchemaComponents";

export interface ConfirmStepProps {
  schema: WorkingSchema;
  loading?: boolean;
  onComplete(): void;
}

export const ConfirmStep: React.FunctionComponent<ConfirmStepProps> = (props) => {
  const { schema } = props;

  return (
    <>
      <StepHeading>Confirm and Publish</StepHeading>
      <StepWrapper>
        <SchemaDetail schema={createSchemaInput(schema as CompletedSchema)} />
      </StepWrapper>
      <Box px={4}>
        <Button my={3} width="100%" onClick={props.onComplete} disabled={props.loading}>
          {props.loading ? <Loader color="white" /> : "Publish"}
        </Button>
      </Box>
    </>
  );
};

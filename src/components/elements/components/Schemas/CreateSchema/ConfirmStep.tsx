import * as React from "react";
import { Button, Heading, Loader } from "rimble-ui";
import { baseColors, fonts } from "../../../";
import { SchemaDetail } from "../SchemaDetail";
import { CompletedSchema, WorkingSchema } from "../types";
import { createSchemaInput } from "../utils";

export interface ConfirmStepProps {
  schema: WorkingSchema;
  loading?: boolean;
  onComplete(): void;
}

export const ConfirmStep: React.FunctionComponent<ConfirmStepProps> = (props) => {
  const { schema } = props;

  return (
    <>
      <Heading mt={4} mb={3} color={baseColors.black} fontFamily={fonts.sansSerif} fontSize={4} fontWeight={3}>
        Confirm and Publish
      </Heading>
      <SchemaDetail schema={createSchemaInput(schema as CompletedSchema)} />
      <Button width="100%" onClick={props.onComplete} disabled={props.loading}>
        {props.loading ? <Loader color="white" /> : "Publish"}
      </Button>
    </>
  );
};

import * as React from "react";
import { Flash, Button, Loader, Tooltip } from "rimble-ui";
import { SchemaDetail } from "../SchemaDetail";
import { SchemaDataInput } from "../types";

export interface ConfirmStepProps {
  builtSchema: SchemaDataInput;
  error?: string;
  isUpdate?: boolean;
  userOwnsSchema?: boolean;
  isAuthenticated?: boolean;
  loading?: boolean;
  onComplete(): void;
}

export const ConfirmStep: React.FunctionComponent<ConfirmStepProps> = (props) => {
  const { builtSchema, error, isUpdate, userOwnsSchema, isAuthenticated } = props;

  return (
    <>
      <SchemaDetail schema={builtSchema} hideTools={true} noSwitcher={true} />
      {error && (
        <Flash mt={3} variant="danger">
          {error}
        </Flash>
      )}
      {isAuthenticated ? (
        <Button mt={3} width="100%" onClick={props.onComplete} disabled={props.loading}>
          {props.loading ? (
            <Loader color="white" />
          ) : isUpdate ? (
            userOwnsSchema ? (
              "Save Changes"
            ) : (
              "Fork Schema"
            )
          ) : (
            "Publish"
          )}
        </Button>
      ) : (
        <Tooltip message="You must log in to make changes">
          {/*Have to use opacity instead of disabled otherwise tooltip doesn't work.*/}
          <Button mt={3} width="100%" style={{ opacity: 0.5 }}>
            {isUpdate ? "Save Changes" : "Publish"}
          </Button>
        </Tooltip>
      )}
    </>
  );
};

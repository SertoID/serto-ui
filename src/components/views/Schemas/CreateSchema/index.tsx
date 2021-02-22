import * as React from "react";
import { Box, Button, Flash, Text } from "rimble-ui";
import { mutate } from "swr";
import { LdContextPlus } from "vc-schema-tools";
import { CompletedSchema, baseWorkingSchema, SchemaMetadata, WorkingSchema } from "../types";
import { createSchemaInput } from "../utils";
import { Check } from "../../../elements/Icons";
import { AttributesStep } from "./AttributesStep";
import { ConfirmStep } from "./ConfirmStep";
import { InfoStep } from "./InfoStep";
import { ModalBack } from "../../../elements/Modals";
import { H3 } from "../../../layouts";
import { colors } from "../../../../themes";
import { SertoUiContext, SertoUiContextInterface } from "../../../../context/SertoUiContext";

const STEPS = ["INFO", "ATTRIBUTES", "CONFIRM", "DONE"];

export interface CreateSchemaProps {
  isUpdate?: boolean;
  initialSchemaState?: WorkingSchema;
  onFinalStep?(): void;
  onComplete?(): void;
  onSchemaUpdate?(schema: WorkingSchema): void;
  onSchemaCreated?(schema: LdContextPlus<SchemaMetadata> | string): void;
}

export const CreateSchema: React.FunctionComponent<CreateSchemaProps> = (props) => {
  const { isUpdate, initialSchemaState, onFinalStep, onComplete, onSchemaUpdate, onSchemaCreated } = props;
  const [currentStep, setCurrentStep] = React.useState(STEPS[0]);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");
  const [schema, setSchema] = React.useState<WorkingSchema>(baseWorkingSchema);

  const context = React.useContext<SertoUiContextInterface>(SertoUiContext);

  React.useEffect(() => {
    if (initialSchemaState) {
      setSchema(initialSchemaState);
    } else {
      setSchema(baseWorkingSchema);
    }
  }, [initialSchemaState]);

  React.useEffect(() => {
    onSchemaUpdate?.(schema);
  }, [schema, onSchemaUpdate]);

  function updateSchema(updates: Partial<WorkingSchema>) {
    setSchema({
      ...schema,
      ...updates,
    });
  }

  function goBack() {
    setError("");
    setCurrentStep(STEPS[STEPS.indexOf(currentStep) - 1]);
  }
  async function goForward() {
    setError("");
    const nextStep = STEPS[STEPS.indexOf(currentStep) + 1];
    if (nextStep === "DONE") {
      setLoading(true);
      try {
        await publishSchema();
        setCurrentStep(nextStep);
        onFinalStep?.();
      } catch (err) {
        console.error(`Failed to ${isUpdate ? "create" : "update"} schema:`, err);
        setError(err.toString());
      }
      setLoading(false);
    } else {
      setCurrentStep(nextStep);
    }
  }

  async function publishSchema() {
    const schemaInput = createSchemaInput(schema as CompletedSchema, context.buildSchemaUrl);
    onSchemaCreated?.(schemaInput.ldContextPlus);
    if (isUpdate) {
      await context.updateSchema(schemaInput);
    } else {
      await context.createSchema(schemaInput);
    }
    mutate(["/v1/schemas", false]);
    if (schema.discoverable) {
      mutate(["/v1/schemas", true]);
    }
  }

  if (currentStep === "DONE") {
    return (
      <Box px={4} py={0}>
        <Text mt={3} mb={6} textAlign="center" color={colors.success.base}>
          <Text
            bg={colors.success.light}
            borderRadius="50%"
            p={2}
            width="50px"
            height="50px"
            fontSize={4}
            style={{ display: "inline-block" }}
          >
            <Check size="36px" />
          </Text>
          <H3>Schema {isUpdate ? "Updated" : "Published"}</H3>
        </Text>
        <Box mt={5}>
          <Button width="100%" onClick={() => onComplete?.()}>
            Done
          </Button>
        </Box>
      </Box>
    );
  }

  return (
    <>
      {currentStep !== STEPS[0] && <ModalBack onClick={goBack} />}
      {currentStep === "INFO" ? (
        <InfoStep
          isUpdate={isUpdate}
          initialSchemaState={initialSchemaState}
          schema={schema}
          updateSchema={updateSchema}
          onComplete={goForward}
        />
      ) : currentStep === "ATTRIBUTES" ? (
        <AttributesStep schema={schema} updateSchema={updateSchema} onComplete={goForward} />
      ) : (
        <ConfirmStep isUpdate={isUpdate} schema={schema} onComplete={goForward} loading={loading} />
      )}
      {error && (
        <Box px={4}>
          <Flash mt={3} variant="danger">
            {error}
          </Flash>
        </Box>
      )}
    </>
  );
};

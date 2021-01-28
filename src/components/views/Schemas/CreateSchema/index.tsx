import { Check } from "@rimble/icons";
import * as React from "react";
import { Box, Button, Flash, Text } from "rimble-ui";
import { mutate } from "swr";
import { CompletedSchema, initialWorkingSchema, SchemaMetadata, WorkingSchema } from "../types";
import { createSchemaInput } from "../utils";
import { LdContextPlus } from "../VcSchema";
import { AttributesStep } from "./AttributesStep";
import { ConfirmStep } from "./ConfirmStep";
import { InfoStep } from "./InfoStep";
import { ModalBack } from "../../../elements/Modals";
import { H3 } from "../../../layouts";
import { colors } from "../../../../themes";
import { SertoUiContext, SertoUiContextInterface } from "../../../../context/SertoUiContext";

const STEPS = ["INFO", "ATTRIBUTES", "CONFIRM", "DONE"];

export interface CreateSchemaProps {
  onFinalStep?(): void;
  onComplete?(): void;
  onSchemaUpdate?(schema: WorkingSchema): void;
  onSchemaCreated?(schema: LdContextPlus<SchemaMetadata> | string): void;
}

export const CreateSchema: React.FunctionComponent<CreateSchemaProps> = (props) => {
  const [currentStep, setCurrentStep] = React.useState(STEPS[0]);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");
  const [schema, setSchema] = React.useState<WorkingSchema>(initialWorkingSchema);

  const context = React.useContext<SertoUiContextInterface>(SertoUiContext);

  React.useEffect(() => {
    props.onSchemaUpdate?.(schema);
  }, [schema, props.onSchemaUpdate]);

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
        await createSchema();
        setCurrentStep(nextStep);
        props.onFinalStep?.();
      } catch (err) {
        console.error("Failed to create schema:", err);
        setError(err.toString());
      }
      setLoading(false);
    } else {
      setCurrentStep(nextStep);
    }
  }

  async function createSchema() {
    const schemaInput = createSchemaInput(schema as CompletedSchema);
    props.onSchemaCreated?.(schemaInput.ldContextPlus);
    await context.createSchema(schemaInput);
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
          <H3>Schema Published</H3>
        </Text>
        <Box mt={5}>
          <Button width="100%" onClick={() => props.onComplete?.()}>
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
        <InfoStep schema={schema} updateSchema={updateSchema} onComplete={goForward} />
      ) : currentStep === "ATTRIBUTES" ? (
        <AttributesStep schema={schema} updateSchema={updateSchema} onComplete={goForward} />
      ) : (
        <ConfirmStep schema={schema} onComplete={goForward} loading={loading} />
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

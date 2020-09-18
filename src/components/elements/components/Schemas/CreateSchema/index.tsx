import { Check } from "@rimble/icons";
import * as React from "react";
import { Box, Button, Flash, Heading, Text } from "rimble-ui";
import { mutate } from "swr";
import { colors } from "../../../";
import { TrustAgencyContext } from "../../../../../context/TrustAgentProvider";
import { TrustAgencyService } from "../../../../../services/TrustAgencyService";
import { CompletedSchema, initialWorkingSchema, SchemaMetadata, WorkingSchema } from "../types";
import { createSchemaInput } from "../utils";
import { LdContextPlus } from "../VcSchema";
import { AttributesStep } from "./AttributesStep";
import { ConfirmStep } from "./ConfirmStep";
import { InfoStep } from "./InfoStep";

const STEPS = ["INFO", "ATTRIBUTES", "CONFIRM", "DONE"];

export interface CreateSchemaProps {
  onComplete?(): void;
  onSchemaUpdate?(schema: WorkingSchema): void;
  onSchemaCreated?(schema: LdContextPlus<SchemaMetadata> | string): void;
}

export const CreateSchema: React.FunctionComponent<CreateSchemaProps> = (props) => {
  const TrustAgent = React.useContext<TrustAgencyService>(TrustAgencyContext);
  const [currentStep, setCurrentStep] = React.useState(STEPS[0]);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");
  const [schema, setSchema] = React.useState<WorkingSchema>(initialWorkingSchema);

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
    await TrustAgent.createSchema(schemaInput);
    mutate(["/v1/schemas", false]);
    if (schema.discoverable) {
      mutate(["/v1/schemas", true]);
    }
  }

  if (currentStep === "DONE") {
    return (
      <Box p={4} pt={3}>
        <Text my={4} textAlign="center" color={colors.success.base}>
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
          <Heading as="h3">Credential Type Published</Heading>
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
      {currentStep !== STEPS[0] && (
        <Button.Text icononly icon="ArrowBack" position="absolute" top={2} left={2} onClick={goBack} />
      )}
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

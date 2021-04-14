import * as React from "react";
import { Check } from "@rimble/icons";
import { Box, Button, Flex, Flash, Text } from "rimble-ui";
import { mutate } from "swr";
import { SchemaDataInput, CompletedSchema, baseWorkingSchema, WorkingSchema } from "../types";
import { createSchemaInput } from "../utils";
import { AttributesStep } from "./AttributesStep";
import { ConfirmStep } from "./ConfirmStep";
import { InfoStep } from "./InfoStep";
import { ModalBack } from "../../../elements/Modals";
import { H3 } from "../../../layouts";
import { colors } from "../../../../themes";
import { SertoUiContext, SertoUiContextInterface } from "../../../../context/SertoUiContext";
import { SchemaDetail } from "../SchemaDetail";

const STEPS = ["INFO", "ATTRIBUTES", "CONFIRM", "DONE"];

export interface CreateSchemaProps {
  isUpdate?: boolean;
  initialSchemaState?: WorkingSchema;
  className?: string;
  onComplete?(): void;
  onSchemaUpdate?(schema: WorkingSchema): void;
  onSchemaSaved?(schema: SchemaDataInput): void;
}

export const CreateSchema: React.FunctionComponent<CreateSchemaProps> = (props) => {
  const { className, isUpdate, initialSchemaState, onComplete, onSchemaUpdate, onSchemaSaved } = props;
  const [currentStep, setCurrentStep] = React.useState(STEPS[0]);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");
  const [schema, setSchema] = React.useState<WorkingSchema>(baseWorkingSchema);

  const schemasService = React.useContext<SertoUiContextInterface>(SertoUiContext).schemasService;

  React.useEffect(() => {
    if (initialSchemaState) {
      setSchema(initialSchemaState);
    } else {
      setSchema(baseWorkingSchema);
    }
  }, [initialSchemaState]);

  const builtSchema: SchemaDataInput = React.useMemo(() => {
    // @TODO/tobek debounce this
    try {
      return createSchemaInput(schema as CompletedSchema, schemasService.buildSchemaUrl);
    } catch (err) {
      console.warn("Failed to build schema. Schema:", schema, "Error:", err);
      return builtSchema;
    }
  }, [schema, schemasService.buildSchemaUrl]);

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
        onSchemaSaved?.(builtSchema);
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
    onSchemaUpdate?.(schema);
    if (isUpdate) {
      await schemasService.updateSchema(builtSchema);
    } else {
      await schemasService.createSchema(builtSchema);
    }
    mutate(["getSchemas", true]);
    if (schema.discoverable) {
      mutate(["getSchemas", false]);
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
    <Flex className={className}>
      <Box px={5} py={3} width={9} minWidth={9} maxHeight="100%" overflowY="auto">
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
          <ConfirmStep isUpdate={isUpdate} builtSchema={builtSchema} onComplete={goForward} loading={loading} />
        )}
        {error && (
          <Flash mt={3} variant="danger">
            {error}
          </Flash>
        )}
      </Box>
      <Box minWidth={9} backgroundColor={colors.nearWhite} borderLeft={1} px={5} py={3} flexGrow="1">
        <SchemaDetail schema={builtSchema} primaryView="JSON source" noTools={true} paneView={true} />
      </Box>
    </Flex>
  );
};

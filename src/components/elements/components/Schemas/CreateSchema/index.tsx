import { Check } from "@rimble/icons";
import * as React from "react";
import { Box, Button, Card, Heading, Text } from "rimble-ui";
import { colors } from "../../../";
import { LdContextPlus, SchemaMetadata } from "../VcSchema";
import { AttributesStep } from "./AttributesStep";
import { ConfirmStep } from "./ConfirmStep";
import { InfoStep } from "./InfoStep";
import { CompletedSchema, WorkingSchema, initialWorkingSchema } from "../types";
import { createLdContextPlusSchema } from "../utils";

const STEPS = ["INFO", "ATTRIBUTES", "CONFIRM", "DONE"];

const Wrapper: React.FunctionComponent<any> = (props) => (
  <Card width={9} style={{ maxHeight: "95vh", overflowY: "auto", overflowX: "hidden" }} {...props}>
    {props.children}
  </Card>
);

export interface CreateSchemaProps {
  onClose?(): void;
  onSchemaUpdate?(schema: WorkingSchema): void;
  onSchemaCreated?(schema: LdContextPlus<SchemaMetadata>): void;
}

export const CreateSchema: React.FunctionComponent<CreateSchemaProps> = (props) => {
  const [currentStep, setCurrentStep] = React.useState(STEPS[0]);
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
    setCurrentStep(STEPS[STEPS.indexOf(currentStep) - 1]);
  }
  function goForward() {
    const nextStep = STEPS[STEPS.indexOf(currentStep) + 1];
    if (nextStep === "DONE") {
      // @TODO/tobek Integrate with API to create schema, then loading state before moving to "done" step.
      const ldContextPlusSchema = createLdContextPlusSchema(schema as CompletedSchema);
      props.onSchemaCreated?.(ldContextPlusSchema);
    }
    setCurrentStep(nextStep);
  }

  if (currentStep === "DONE") {
    return (
      <Wrapper>
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
        <Box mt={5} mb={3}>
          <Button width="100%" onClick={() => props.onClose?.()}>
            Done
          </Button>
        </Box>
      </Wrapper>
    );
  }

  return (
    <Wrapper p={0}>
      {currentStep !== STEPS[0] && (
        <Button.Text icononly icon="ArrowBack" position="absolute" top={2} left={2} onClick={goBack} />
      )}
      <Button.Text icononly icon="Close" position="absolute" top={2} right={2} onClick={() => props.onClose?.()} />

      <Box px={4} pt={5} pb={4}>
        {currentStep === "INFO" ? (
          <InfoStep schema={schema} updateSchema={updateSchema} onComplete={goForward} />
        ) : currentStep === "ATTRIBUTES" ? (
          <AttributesStep schema={schema} updateSchema={updateSchema} onComplete={goForward} />
        ) : (
          <ConfirmStep schema={schema} onComplete={goForward} />
        )}
      </Box>
    </Wrapper>
  );
};

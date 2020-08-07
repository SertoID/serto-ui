import * as React from "react";
import { Box, Button, Card, Text } from "rimble-ui";
import { baseColors, fonts } from "../../../";
import { InfoStep } from "./InfoStep";

export interface SchemaSchema {
  name: string;
  slug: string;
  version: string;
  icon: string;
  discoverable: boolean;
}

const STEPS = ["INFO", "ATTRIBUTES", "CONFIRM"];

export interface CreateSchemaProps {
  onClose?(): void;
}

export const CreateSchema: React.FunctionComponent<CreateSchemaProps> = (props) => {
  const [currentStep, setCurrentStep] = React.useState(STEPS[0]);
  const [schema, setSchema] = React.useState<SchemaSchema>({
    name: "",
    slug: "",
    version: "",
    icon: "",
    discoverable: false,
  });

  function updateSchema(field: string, value: any) {
    setSchema({
      ...schema,
      [field]: value,
    });
  }

  function goBack() {
    setCurrentStep(STEPS[STEPS.indexOf(currentStep) - 1]);
  }
  function goForward() {
    setCurrentStep(STEPS[STEPS.indexOf(currentStep) + 1]);
  }

  return (
    <Card p={0} width={9}>
      {currentStep !== STEPS[0] && (
        <Button.Text icononly icon="ArrowBack" position="absolute" top={2} left={2} onClick={goBack} />
      )}
      <Button.Text icononly icon="Close" position="absolute" top={2} right={2} onClick={() => props.onClose?.()} />

      <Box px={4} pt={5} pb={4}>
        {currentStep === "INFO" ? (
          <InfoStep schema={schema} updateSchema={updateSchema} onComplete={goForward} />
        ) : (
          <>Define Credential Attributes</>
        )}
      </Box>
    </Card>
  );
};

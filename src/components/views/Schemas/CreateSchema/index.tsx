import * as React from "react";
import slugify from "@sindresorhus/slugify";
import { Check, ArrowBack, KeyboardArrowDown } from "@rimble/icons";
import { Flash, Link, Box, Button, Flex, Text } from "rimble-ui";
import { mutate } from "swr";
import Editor from "react-simple-code-editor";
import Prism from "prismjs";
import { useDebounce } from "use-debounce";
import { links } from "../../../../config";
import { SchemaDataInput, CompletedSchema, baseWorkingSchema, WorkingSchema } from "../types";
import { jsonSchemaToSchemaInput, isFullSchema, ensureFullSchema } from "../utils";
import { AttributesStep } from "./AttributesStep";
import { ConfirmStep } from "./ConfirmStep";
import { InfoStep } from "./InfoStep";
import { H3 } from "../../../layouts";
import { colors } from "../../../../themes";
import { SertoUiContext, SertoUiContextInterface } from "../../../../context/SertoUiContext";
import { SchemaDetail } from "../SchemaDetail";
import { Popup, PopupGroup } from "../../../elements/Popup/Popup";
import { PrismHighlightedCodeWrap } from "../../../elements/HighlightedJson/HighlightedJson";
import { convertToPascalCase } from "../../../../utils/helpers";

const STEPS = ["INFO", "ATTRIBUTES", "CONFIRM", "DONE"];

export interface CreateSchemaProps {
  isUpdate?: boolean;
  userOwnsSchema?: boolean;
  initialSchemaState?: WorkingSchema;
  className?: string;
  onComplete?(): void;
  onSchemaUpdate?(schema: WorkingSchema): void;
  onSchemaSaved?(schema: SchemaDataInput): void;
}

export const CreateSchema: React.FunctionComponent<CreateSchemaProps> = (props) => {
  const { className, isUpdate, userOwnsSchema, initialSchemaState, onComplete, onSchemaUpdate, onSchemaSaved } = props;
  const [currentStep, setCurrentStep] = React.useState(STEPS[0]);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");
  const [schema, setSchema] = React.useState<WorkingSchema>(baseWorkingSchema);
  const [debouncedSchema] = useDebounce(schema, 500);
  const [builtSchema, setBuiltSchema] = React.useState<SchemaDataInput | undefined>();
  const [inputMode, setInputMode] = React.useState<"UI" | "JSON">("UI");
  const [inputJson, setInputJson] = React.useState("");
  const [debouncedInputSchemaJson] = useDebounce(inputJson, 500);
  const [inputJsonError, setInputJsonError] = React.useState("");

  const schemasService = React.useContext<SertoUiContextInterface>(SertoUiContext).schemasService;

  React.useEffect(() => {
    if (initialSchemaState) {
      setSchema(initialSchemaState);
    } else {
      setSchema(baseWorkingSchema);
    }
  }, [initialSchemaState]);

  React.useEffect(() => {
    if (!debouncedSchema?.$metadata?.slug && debouncedSchema?.title) {
      setSchema((oldSchema) => ({
        ...oldSchema,
        $metadata: {
          ...oldSchema.$metadata,
          slug: slugify(debouncedSchema?.title || ""),
        },
      }));
    }

    try {
      setInputJsonError("");
      setBuiltSchema(jsonSchemaToSchemaInput(debouncedSchema as CompletedSchema, schemasService.buildSchemaUrl));
    } catch (err) {
      console.error("Failed to build schema. Schema:", debouncedSchema, "Error:", err);
      setInputJsonError("Failed to build schema from JSON: " + err.toString());
    }
  }, [debouncedSchema, schemasService.buildSchemaUrl]);

  React.useEffect(() => {
    if (inputMode === "JSON" && builtSchema) {
      setInputJson(JSON.stringify(JSON.parse(builtSchema.jsonSchema), null, 2));
      setInputJsonError("");
    }
    // Hook relies on `builtSchema` but would be huge waste to run this hook every time that changes. We only need to run it when input mode changes so we can populate the JSON textarea with the current state of the schema. So:
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputMode]);

  React.useEffect(() => {
    if (!debouncedInputSchemaJson) {
      return;
    }
    try {
      setInputJsonError("");
      const parsedSchema = JSON.parse(debouncedInputSchemaJson);
      const fullSchema = ensureFullSchema(parsedSchema, schemasService.buildSchemaUrl);
      if (!isFullSchema(parsedSchema)) {
        // We've transformed the JSON that they put in the JSON editor, so let's update the JSON editor
        setInputJson(JSON.stringify(fullSchema, null, 2));
      }
      setSchema(fullSchema);
    } catch (err) {
      setInputJsonError(err.toString());
      console.warn("Error creating schema from JSON", err);
    }
  }, [debouncedInputSchemaJson, schemasService.buildSchemaUrl]);

  React.useEffect(() => {
    onSchemaUpdate?.(debouncedSchema);
  }, [debouncedSchema, onSchemaUpdate]);

  function updateSchema(updates: Partial<WorkingSchema>) {
    const newSchema = {
      ...schema,
      ...updates,
    };
    if (updates.title) {
      const subjectLdTerm = convertToPascalCase(updates.title);
      const credLdTerm = subjectLdTerm + "Credential";
      newSchema.$linkedData = { term: credLdTerm, "@id": credLdTerm };
      if (newSchema.properties?.credentialSubject) {
        newSchema.properties.credentialSubject.$linkedData = { term: subjectLdTerm, "@id": subjectLdTerm };
      }
    }
    setSchema(newSchema);
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
        if (!builtSchema) {
          throw Error("Failed to build schema");
        }
        await publishSchema();
        setCurrentStep(nextStep);
        onSchemaSaved?.(builtSchema);
      } catch (err) {
        console.error(`Failed to ${isUpdate && userOwnsSchema ? "update" : "create"} schema:`, err);
        setError(err.toString());
      }
      setLoading(false);
    } else {
      setCurrentStep(nextStep);
    }
  }

  async function publishSchema() {
    onSchemaUpdate?.(schema);
    if (!builtSchema) {
      throw Error("Failed to build schema");
    }
    if (isUpdate && userOwnsSchema) {
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
      <Box px={4} py={0} className={className}>
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
      <Box px={5} pt={3} pb={5} width={9} minWidth={9} maxHeight="100%" overflowY="auto">
        <Box pb={3} mb={4} borderBottom={1}>
          <Flex justifyContent="space-between">
            <Box>
              <Text fontWeight={4} fontSize={3}>
                {currentStep === "INFO"
                  ? (isUpdate ? (userOwnsSchema ? "Update" : "Fork") : "Create New") + " Schema"
                  : currentStep === "ATTRIBUTES"
                  ? (isUpdate ? "Edit" : "Define") + " Schema Attributes"
                  : "Review Schema"}
              </Text>

              {currentStep !== "CONFIRM" && (
                <Text mt={1} fontSize={1}>
                  Edit and preview in the next panel
                </Text>
              )}
            </Box>
            <Popup
              triggerOnClick={true}
              popupContents={
                <PopupGroup>
                  {["UI", "JSON"].map((inputName: any) => (
                    <a
                      key={inputName}
                      onClick={() => setInputMode(inputName)}
                      className={inputMode === inputName ? "selected" : ""}
                    >
                      {inputName} Editor
                    </a>
                  ))}
                </PopupGroup>
              }
            >
              <>
                <Button.Outline size="small">
                  {inputMode} Editor <KeyboardArrowDown ml={3} mr="-5px" size="16px" />
                </Button.Outline>
              </>
            </Popup>
          </Flex>
        </Box>

        {inputMode === "JSON" ? (
          <>
            <Flash variant="warning" mt={-2} mb={3}>
              <Text fontSize={0}>
                Warning: This feature is for advanced users, and it is possible to create an unusable schema. Please
                check the preview on the right to ensure that your schema is as intended. The expected format is JSON
                Schema{" "}
                <Link
                  href="https://github.com/w3c-ccg/traceability-vocab#ontology-structure"
                  target="_blank"
                  fontSize={0}
                >
                  with embedded JSON-LD data
                </Link>
                . View examples at the{" "}
                <Link href={links.SCHEMAS_PLAYGROUND} target="_blank" fontSize={0}>
                  Schema Playground
                </Link>
                , or start with the UI editor and then adjust as needed.
              </Text>
            </Flash>
            <PrismHighlightedCodeWrap
              style={{
                background: "white",
                border: "1px solid transparent",
                borderColor: inputJsonError && colors.danger.base,
              }}
            >
              <Editor
                value={inputJson}
                onValueChange={setInputJson}
                highlight={() => Prism.highlight(inputJson, Prism.languages.json, "json")}
                style={{ minHeight: "100%" }}
              />
            </PrismHighlightedCodeWrap>
            {inputJsonError && (
              <Flash variant="danger" my={2}>
                Error creating schema from JSON:
                <Box mt={1}>
                  <code>{inputJsonError}</code>
                </Box>
              </Flash>
            )}
            <Button
              width="100%"
              disabled={inputJsonError}
              onClick={() => {
                setCurrentStep("INFO");
                setInputMode("UI");
              }}
            >
              Review
            </Button>
          </>
        ) : (
          <>
            {currentStep !== STEPS[0] && (
              <Link display="block" size="small" onClick={goBack} mt={-2} mb={4}>
                <Box display="inline-block" verticalAlign="text-top" mr={2}>
                  <ArrowBack size="16px" />
                </Box>{" "}
                Back
              </Link>
            )}

            {currentStep === "INFO" ? (
              <InfoStep
                isUpdate={isUpdate}
                userOwnsSchema={userOwnsSchema}
                isAuthenticated={schemasService.isAuthenticated}
                initialSchemaState={initialSchemaState}
                schema={schema}
                updateSchema={updateSchema}
                onComplete={goForward}
              />
            ) : currentStep === "ATTRIBUTES" ? (
              <AttributesStep schema={schema} updateSchema={updateSchema} onComplete={goForward} />
            ) : builtSchema ? (
              <Box mt={4}>
                <ConfirmStep
                  builtSchema={builtSchema}
                  onComplete={goForward}
                  loading={loading}
                  isUpdate={isUpdate}
                  userOwnsSchema={userOwnsSchema}
                  isAuthenticated={schemasService.isAuthenticated}
                  error={error}
                />
              </Box>
            ) : (
              <></>
            )}
          </>
        )}
      </Box>
      <Box
        className="right-pane"
        minWidth={9}
        backgroundColor={colors.nearWhite}
        borderLeft={1}
        px={5}
        py={3}
        flexGrow="1"
      >
        {builtSchema && (
          <SchemaDetail
            schema={builtSchema}
            primaryView={inputMode === "JSON" ? "Formatted View" : "JSON Schema"}
            hideTools={true}
            paneView={true}
          />
        )}
      </Box>
    </Flex>
  );
};

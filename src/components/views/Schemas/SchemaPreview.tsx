import * as React from "react";
import { Box, Button, Flex, Text, Flash } from "rimble-ui";
import { Send } from "@rimble/icons";
import { LdContextPlusInnerNode, LdContextPlusNode, LdContextPlusRootNode, VcSchema } from "vc-schema-tools";
import { baseColors, colors, fonts } from "../../../themes";
import { SchemaDataInput, SchemaDataResponse, requiredSchemaProperties } from "./types";
import { typeOptions } from "./utils";
import { HighlightedJson } from "../../elements/HighlightedJson/HighlightedJson";
import { ModalWithX } from "../../elements/Modals";
import { SchemaUsage } from "./SchemaUsage";
import { SertoUiContext, SertoUiContextInterface } from "../../../context/SertoUiContext";
import { IssueVcForm } from "../Credentials/IssueVc/IssueVcForm";
import { Popup, PopupGroup } from "../../elements/Popup/Popup";

const MetadataText: React.FunctionComponent<any> = (props) => (
  <Text color={colors.silver} my={2} {...props}>
    {props.children}
  </Text>
);
const PropertyText: React.FunctionComponent<any> = (props) => (
  <Text color={colors.silver} fontSize={1} my={1} {...props}>
    {props.children}
  </Text>
);
const PropertyRequired: React.FunctionComponent = (props) => (
  <PropertyText fontWeight={3}>{props.children}</PropertyText>
);
const PropertyType: React.FunctionComponent<any> = (props) => (
  <PropertyText color={baseColors.black} fontSize={2} mb={0} {...props}>
    {props.children}
  </PropertyText>
);
const PropertyName: React.FunctionComponent = (props) => <PropertyType fontWeight={3}>{props.children}</PropertyType>;

const renderProperty = (
  key: string,
  prop?: LdContextPlusNode,
  outerContext?: LdContextPlusRootNode,
): React.ReactNode => {
  if (!prop) {
    console.warn("Could not find prop for key:", key);
    return <></>;
  }
  if (outerContext && "@replaceWith" in prop && prop["@replaceWith"]) {
    return renderProperty(key, outerContext[prop["@replaceWith"]] as any, outerContext);
  }
  let propType: string;
  if ("@type" in prop && prop["@type"]) {
    propType = typeOptions[prop["@type"]]?.niceName || prop["@type"];
  } else if ("@context" in prop && prop["@context"]) {
    // Nested object will be displayed underneath
    propType = "";
  } else {
    console.warn("Unrecognized property:", { key, prop, outerContext });
    propType = "[unknown]";
  }

  return (
    <Box key={key} my={3}>
      <Flex justifyContent="space-between">
        <PropertyName>{prop["@title"] || key}</PropertyName>
        <PropertyType>{propType}</PropertyType>
      </Flex>
      {prop["@description"] && <PropertyText>{prop["@description"]}</PropertyText>}
      {prop["@required"] && <PropertyRequired>Required</PropertyRequired>}

      {"@context" in prop && prop["@context"] && (
        <Box pl={3} mt={3}>
          {Object.entries(prop["@context"]).map((entry) => renderProperty(entry[0], entry[1], outerContext))}
        </Box>
      )}
    </Box>
  );
};

export interface SchemaPreviewProps {
  schema: SchemaDataInput | SchemaDataResponse;
  initialView?: "Preview" | "View JSON";
  /** Whether to show "save" and "issue VC" functionality. */
  noTools?: boolean;
  fullPage?: boolean;
  rimbleProps?: { [prop: string]: any };
}

export const SchemaPreview: React.FunctionComponent<SchemaPreviewProps> = (props) => {
  const { schema, initialView, noTools, fullPage, rimbleProps } = props;
  const modes: [string, string] = ["Preview", "View JSON"];
  const [mode, setMode] = React.useState(initialView || modes[0]);
  const [error, setError] = React.useState("");
  const [isUseModalOpen, setIsUseModalOpen] = React.useState(false);

  const context = React.useContext<SertoUiContextInterface>(SertoUiContext);

  const schemaInstance = React.useMemo(() => {
    try {
      setError("");
      return new VcSchema(schema.ldContextPlus);
    } catch (err) {
      console.error("Failed to generate schema instance:", err);
      setError(err.message || JSON.stringify(err));
    }
  }, [schema]);

  const jsons = React.useMemo(() => {
    if (!schemaInstance) {
      return [];
    }
    return [
      {
        name: "source",
        value: schemaInstance?.getLdContextPlusString(true),
      },
      {
        name: "JSON-LD Context",
        value: schemaInstance?.getJsonLdContextString(true),
      },
      {
        name: "JSON Schema",
        value: schemaInstance?.getJsonSchemaString(true),
      },
    ];
  }, [schemaInstance]);
  const [jsonIndex, setJsonIndex] = React.useState(0);

  let outerContext: LdContextPlusRootNode | undefined;
  let innerContext:
    | {
        [key: string]: LdContextPlusNode<any>;
      }
    | undefined;
  let credContains: string[] | undefined;

  if (schemaInstance) {
    outerContext = schemaInstance.schema["@context"];
    const credentialSubject = outerContext?.credentialSubject as LdContextPlusInnerNode;
    innerContext = credentialSubject?.["@context"];
    if (!innerContext) {
      setError("Invalid schema format: could not find `credentialSubject`");
    }
    credContains =
      typeof credentialSubject?.["@contains"] === "string"
        ? [credentialSubject["@contains"]]
        : credentialSubject?.["@contains"];
  }

  return (
    <Box {...rimbleProps}>
      <Flex mb={3} justifyContent="space-between">
        <Box>
          <Popup
            rimbleProps={{ display: "inline-block" }}
            triggerOnClick={true}
            popupContents={
              <PopupGroup>
                <a onClick={() => setMode("Preview")}>Formatted</a>
                <a
                  onClick={() => {
                    setMode("View JSON");
                    setJsonIndex(0);
                  }}
                >
                  JSON source
                </a>
                <a
                  onClick={() => {
                    setMode("View JSON");
                    setJsonIndex(1);
                  }}
                >
                  JSON-LD Context
                </a>
                <a
                  onClick={() => {
                    setMode("View JSON");
                    setJsonIndex(2);
                  }}
                >
                  JSON Schema
                </a>
              </PopupGroup>
            }
          >
            <>
              <Button.Outline icon="RemoveRedEye" size="small">
                Change Preview
              </Button.Outline>
            </>
          </Popup>
          <Button.Outline icon="Edit" size="small" ml={3}>
            View in Schema Editor
          </Button.Outline>
        </Box>
        {!noTools && (
          <Button size="small" ml={3} onClick={() => setIsUseModalOpen(true)}>
            <Send size="15px" mr={2} /> Issue VC
          </Button>
        )}
      </Flex>
      {mode === "Preview" ? (
        <Box px={4} py={3} border={1} borderRadius={1} fontFamily={fonts.sansSerif}>
          {!fullPage && <MetadataText fontFamily={fonts.monospace}>{schema.slug}</MetadataText>}
          <MetadataText>Version {schema.version}</MetadataText>
          <MetadataText>{!schema.discoverable && "Not "}Discoverable</MetadataText>
          {!fullPage && schema.description && <MetadataText>{schema.description}</MetadataText>}

          {requiredSchemaProperties.map((prop) => renderProperty(prop["@id"], prop))}
          {innerContext &&
            Object.entries(innerContext).map((entry) => renderProperty(entry[0], entry[1], outerContext))}
          {credContains?.map(
            (contained) =>
              outerContext?.[contained] && renderProperty(contained, outerContext[contained] as any, outerContext),
          )}

          {error && <Flash variant="danger">Error: {error}</Flash>}
        </Box>
      ) : (
        <>
          {jsonIndex === 1 && (
            <Text mb={3}>
              To be used on top of{" "}
              <a href="https://www.w3.org/2018/credentials/v1" rel="noopener noreferrer" target="_blank">
                the base W3C credential context
              </a>
              .
            </Text>
          )}
          <HighlightedJson json={jsons[jsonIndex]?.value || schema} />
        </>
      )}

      <ModalWithX isOpen={isUseModalOpen} close={() => setIsUseModalOpen(false)} width={9}>
        {context.issueVc ? (
          <IssueVcForm
            schema={schema}
            onSuccessResponse={() => {
              // @TODO/tobek Implement success flow once we have designs.
              alert("VC issued successfully.");
              setIsUseModalOpen(false);
            }}
          />
        ) : (
          <SchemaUsage schema={schema} style={{ overflowY: "auto" }} />
        )}
      </ModalWithX>
    </Box>
  );
};

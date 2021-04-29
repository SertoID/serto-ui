import * as React from "react";
import { Box, Button, Flex, Text, Flash } from "rimble-ui";
import { Send, KeyboardArrowDown } from "@rimble/icons";
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
import { SchemaHeader } from "./SchemaHeader";

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

export const SCHEMA_VIEWS = ["Formatted View", "JSON source", "JSON-LD Context", "JSON Schema"] as const;
export type SchemaViewTypes = typeof SCHEMA_VIEWS[number];

export interface SchemaPreviewProps {
  schema: SchemaDataInput | SchemaDataResponse;
  view: SchemaViewTypes;
  setView(view: SchemaViewTypes): void;
  /** Whether to show "view in editor" and "issue VC" functionality. */
  hideTools?: boolean;
  /** Whether to show "issue VC" functionality. */
  hideIssueVc?: boolean;
  fullPage?: boolean;
  paneView?: boolean;
  noSwitcher?: boolean;
  rimbleProps?: { [prop: string]: any };
}

export const SchemaPreview: React.FunctionComponent<SchemaPreviewProps> = (props) => {
  const { schema, view, setView, hideTools, hideIssueVc, fullPage, paneView, noSwitcher, rimbleProps } = props;
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
      return {};
    }
    return {
      [SCHEMA_VIEWS[1]]: schemaInstance?.getLdContextPlusString(true),
      [SCHEMA_VIEWS[2]]: schemaInstance?.getJsonLdContextString(true),
      [SCHEMA_VIEWS[3]]: schemaInstance?.getJsonSchemaString(true),
    };
  }, [schemaInstance]);

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
      <Flex mb={noSwitcher && hideTools ? 0 : 3} justifyContent="space-between">
        <Box>
          {!noSwitcher && (
            <Popup
              rimbleProps={{ display: "inline-block", verticalAlign: "text-bottom" }}
              triggerOnClick={true}
              popupContents={
                <PopupGroup>
                  {SCHEMA_VIEWS.map((viewName) => (
                    <a key={viewName} onClick={() => setView(viewName)} className={view === viewName ? "selected" : ""}>
                      {viewName}
                    </a>
                  ))}
                </PopupGroup>
              }
            >
              <>
                <Button.Outline size="small">
                  {view} <KeyboardArrowDown ml={3} mr="-5px" size="16px" />
                </Button.Outline>
              </>
            </Popup>
          )}

          {!hideTools && context.schemasUiUrl && (
            <Button.Outline
              as="a"
              href={`${context.schemasUiUrl}/editor/${schema.slug}`}
              target={window.location.origin === context.schemasUiUrl ? undefined : "_blank"}
              icon="Edit"
              size="small"
              ml={3}
            >
              View in Schema Editor
            </Button.Outline>
          )}
        </Box>
        {!hideTools && !hideIssueVc && (
          <Button size="small" onClick={() => setIsUseModalOpen(true)}>
            <Send size="15px" mr={2} /> Issue VC
          </Button>
        )}
      </Flex>
      {view === "Formatted View" ? (
        <Box
          className="schema-formatted-preview"
          width={hideTools || hideIssueVc ? 9 : "640px"}
          maxWidth="100%"
          px={4}
          py={3}
          border={1}
          borderRadius={1}
          fontFamily={fonts.sansSerif}
        >
          {paneView && <SchemaHeader schema={schema} rimbleProps={{ mb: 4 }} />}
          {!fullPage && <MetadataText fontFamily={fonts.monospace}>{schema.slug}</MetadataText>}
          <MetadataText>Version {schema.version}</MetadataText>
          <MetadataText>{!schema.discoverable && "Not "}Searchable</MetadataText>
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
          {view === "JSON-LD Context" && (
            <Text mb={3}>
              To be used on top of{" "}
              <a href="https://www.w3.org/2018/credentials/v1" rel="noopener noreferrer" target="_blank">
                the base W3C credential context
              </a>
              .
            </Text>
          )}
          <HighlightedJson json={jsons[view] || schema} />
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

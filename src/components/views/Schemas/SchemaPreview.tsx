import * as React from "react";
import Linkify from "linkify-react";
import { Box, Button, Flex, Text, Flash } from "rimble-ui";
import { Send, KeyboardArrowDown } from "@rimble/icons";
import { VcSchema, JsonSchemaNode, nodeToTypeName } from "vc-schema-tools";
import { baseColors, colors, fonts } from "../../../themes";
import { SchemaDataInput, SchemaDataResponse, defaultSchemaProperties, defaultSchemaPropertiesRequired } from "./types";
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
  <PropertyText
    color={baseColors.black}
    fontSize={2}
    mb={0}
    maxWidth="75%"
    style={{ wordBreak: "break-all" }}
    {...props}
  >
    {props.children}
  </PropertyText>
);
const PropertyName: React.FunctionComponent = (props) => <PropertyType fontWeight={3}>{props.children}</PropertyType>;

const renderProperty = (key: string, prop: JsonSchemaNode, required?: boolean): React.ReactNode => {
  if (!prop) {
    console.warn("Could not find prop for key:", key);
    return <></>;
  }
  let propType: string | undefined;
  if (prop.type === "object") {
    // Looks nicer with blank type name - nested object will be displayed underneath
    propType = "";
  } else if (prop.$ref) {
    propType = "ref: " + prop.$ref;
  } else if (prop.type === "array" && prop.items?.$ref) {
    propType = `List (ref: ${prop.items.$ref})`;
  } else {
    propType = nodeToTypeName(prop);
    if (!propType) {
      propType = "[unknown]";
      console.warn("Unrecognized property:", { key, prop });
    }
  }

  return (
    <Box key={key} my={3}>
      <Flex justifyContent="space-between">
        <PropertyName>{prop.title || key}</PropertyName>
        <PropertyType>{propType}</PropertyType>
      </Flex>
      {prop.description && <PropertyText>{prop.description}</PropertyText>}
      {required && <PropertyRequired>Required</PropertyRequired>}

      {prop.properties && (
        <Box pl={3} mt={3}>
          {Object.entries(prop.properties).map((entry) =>
            renderProperty(entry[0], entry[1], prop.required?.includes(entry[0])),
          )}
        </Box>
      )}
    </Box>
  );
};

export const SCHEMA_VIEWS = ["Formatted View", "JSON Schema", "JSON-LD Context"] as const;
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
  const userOwnsSchema = "creator" in schema && context.schemasService.userData?.sub === schema.creator?.identifier;

  const schemaInstance = React.useMemo(() => {
    try {
      setError("");
      return new VcSchema(schema.jsonSchema);
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
      [SCHEMA_VIEWS[1]]: schemaInstance?.getJsonSchemaString(true),
      [SCHEMA_VIEWS[2]]: schemaInstance?.getJsonLdContextString(true),
    };
  }, [schemaInstance]);

  const credentialSubject = React.useMemo(() => {
    const credentialSubject = schemaInstance?.jsonSchema?.properties?.credentialSubject as JsonSchemaNode;
    if (!credentialSubject) {
      console.error("Invalid schema format: could not find `credentialSubject`");
    }
    return credentialSubject;
  }, [schemaInstance]);

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
              {userOwnsSchema ? "Edit Schema" : "View in Schema Editor"}
            </Button.Outline>
          )}
        </Box>
        {!hideTools &&
          !hideIssueVc &&
          (context.issueVc ? (
            <Button size="small" onClick={() => setIsUseModalOpen(true)}>
              <Send size="15px" mr={2} /> Issue VC
            </Button>
          ) : (
            <Popup
              triggerOnClick
              remainOpenOnClick
              popupContents={<SchemaUsage schema={schema} />}
              popupRimbleProps={{ width: "350px" }}
              popupRightPos={-2}
            >
              <Button size="small">
                Use this VC Schema
                <KeyboardArrowDown ml={2} mr="-5px" size="16px" />
              </Button>
            </Popup>
          ))}
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
          {!fullPage && schema.description && (
            <MetadataText>
              <Linkify options={{ target: "_blank" }}>{schema.description}</Linkify>
            </MetadataText>
          )}

          {defaultSchemaProperties.map((prop, i) =>
            renderProperty(prop.$linkedData.term, prop, defaultSchemaPropertiesRequired[i]),
          )}
          {credentialSubject?.properties &&
            Object.entries(credentialSubject.properties).map((entry) =>
              renderProperty(entry[0], entry[1], credentialSubject.required?.includes(entry[0])),
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
        <IssueVcForm schema={schema} onComplete={() => setIsUseModalOpen(false)} />
      </ModalWithX>
    </Box>
  );
};

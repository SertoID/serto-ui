import * as React from "react";
import { Box, Flex, Text, Flash } from "rimble-ui";
import { H3 } from "../../layouts";
import { baseColors, colors, fonts } from "../../../themes";
import { SchemaDataInput, SchemaDataResponse, requiredSchemaProperties } from "./types";
import { typeOptions } from "./utils";
import { LdContextPlusInnerNode, LdContextPlusNode, LdContextPlusRootNode, VcSchema } from "./VcSchema";
import { Toggle } from "../../elements/Toggle/Toggle";
import { HighlightedJson } from "../../elements/HighlightedJson/HighlightedJson";
import { DropDown } from "../../elements/DropDown/DropDown";

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
  prop: LdContextPlusNode,
  outerContext?: LdContextPlusRootNode,
): React.ReactNode => {
  if (outerContext && "@replaceWith" in prop && prop["@replaceWith"]) {
    return renderProperty(key, outerContext[prop["@replaceWith"]], outerContext);
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

export interface SchemaDetailProps {
  schema: SchemaDataInput | SchemaDataResponse;
}

export const SchemaDetail: React.FunctionComponent<SchemaDetailProps> = (props) => {
  const { schema } = props;
  const modes: [string, string] = ["Preview", "View JSON"];
  const [mode, setMode] = React.useState(modes[0]);
  const [error, setError] = React.useState("");

  const schemaInstance = React.useMemo(() => {
    try {
      setError("");
      return new VcSchema(schema.ldContextPlus, schema.slug);
    } catch (err) {
      console.error("Failed to generate schema instance:", err);
      setError(err.message || JSON.stringify(err));
    }
  }, [schema]);

  const jsonTypes = React.useMemo(() => {
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
  const [json, setJson] = React.useState(jsonTypes[0]?.value);

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
    <>
      <Box mb={3}>
        <Toggle options={modes} onChange={setMode} width="100%" />
      </Box>
      {mode === "Preview" ? (
        <Box p={4} pb={3} border={3} borderRadius={1} fontFamily={fonts.sansSerif}>
          <H3 mt={0}>
            {schema.icon} {schema.name}
          </H3>
          <MetadataText fontFamily={fonts.monospace}>{schema.slug}</MetadataText>
          <MetadataText>Version {schema.version}</MetadataText>
          <MetadataText>{!schema.discoverable && "Not "}Discoverable</MetadataText>
          {schema.description && <MetadataText>{schema.description}</MetadataText>}

          {requiredSchemaProperties.map((prop) => renderProperty(prop["@id"], prop))}
          {innerContext &&
            Object.entries(innerContext).map((entry) => renderProperty(entry[0], entry[1], outerContext))}
          {credContains?.map(
            (contained) =>
              outerContext?.[contained] && renderProperty(contained, outerContext[contained], outerContext),
          )}

          {error && <Flash variant="danger">Error: {error}</Flash>}
        </Box>
      ) : (
        <>
          View as
          <Box ml={2} width={8} display="inline-block">
            <DropDown onChange={setJson} options={jsonTypes} />
          </Box>
          {json === jsonTypes[1]?.value && (
            <Text mb={3}>
              To be used on top of{" "}
              <a href="https://www.w3.org/2018/credentials/v1" rel="noopener noreferrer" target="_blank">
                the base W3C credential context
              </a>
              .
            </Text>
          )}
          <HighlightedJson json={json || JSON.stringify(schema, undefined, 2)} />
        </>
      )}
    </>
  );
};

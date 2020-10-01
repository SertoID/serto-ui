import * as React from "react";
import { Box, Flex, Heading, Text, Flash } from "rimble-ui";
import { baseColors, colors, fonts } from "../../";
import { SchemaDataInput, SchemaDataResponse, requiredSchemaProperties } from "./types";
import { typeOptions } from "./utils";
import { Toggle } from "../Toggle";
import { LdContextPlusInnerNode, LdContextPlusNode, LdContextPlusRootNode, VcSchema } from "./VcSchema";
import { HighlightedJson } from "../HighlightedJson";
import { DropDown } from "../DropDown/DropDown";

const MetadataText: React.FunctionComponent = (props) => (
  <Text color={colors.midGray} fontFamily={fonts.sansSerif} fontWeight={3} my={2}>
    {props.children}
  </Text>
);
const PropertyText: React.FunctionComponent = (props) => (
  <Text color={baseColors.black} fontSize={1} fontFamily={fonts.sansSerif} fontWeight={3} my={1}>
    {props.children}
  </Text>
);
const PropertyDescription: React.FunctionComponent = (props) => (
  <Text color={baseColors.black} fontSize={1} fontFamily={fonts.sansSerif} my={1}>
    {props.children}
  </Text>
);

const renderProperty = ([key, prop]: [string, LdContextPlusNode]): React.ReactNode => {
  let propType: string;
  if ("@type" in prop && prop["@type"]) {
    if (prop["@type"] === "@id") {
      propType = "URI";
    } else {
      propType = typeOptions[prop["@type"]]?.niceName || prop["@type"];
    }
  } else if ("@context" in prop && prop["@context"]) {
    // @TODO/tobek We should support these fully eventually.
    propType = "[nested object]";
  } else {
    propType = "";
  }

  return (
    <Box key={key} my={5}>
      <Flex justifyContent="space-between">
        <PropertyText>{prop["@title"] || key}</PropertyText>
        <PropertyText>{propType}</PropertyText>
      </Flex>
      {prop["@required"] && <PropertyText>Required</PropertyText>}
      {prop["@description"] && <PropertyDescription>{prop["@description"]}</PropertyDescription>}
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
        <Box p={4} backgroundColor={colors.primary.background}>
          <Heading as="h3" mt={0}>
            {schema.icon} {schema.name}
          </Heading>
          <MetadataText>{schema.slug}</MetadataText>
          <MetadataText>Version: {schema.version}</MetadataText>
          <MetadataText>Discoverable: {(!!schema.discoverable).toString()}</MetadataText>
          {schema.description && <MetadataText>{schema.description}</MetadataText>}

          {requiredSchemaProperties.map((prop) => renderProperty([prop["@id"], prop]))}
          {innerContext && Object.entries(innerContext).map(renderProperty)}
          {credContains?.map(
            (contained) => outerContext?.[contained] && renderProperty([contained, outerContext[contained]]),
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

import { useMemo, useContext } from "react";
import useSWR from "swr";
import { VC, JsonSchema } from "vc-schema-tools";
import { SertoUiContext, SertoUiContextInterface } from "../context/SertoUiContext";
import { SchemaDataResponse } from "../components/views/Schemas/types";

/** Same as SchemaDataResponse but the `jsonSchema` string property has been parsed into the actual JSON Schema object. */
export type SchemaDataResponseWithJsonSchema = SchemaDataResponse & {
  jsonSchema: JsonSchema;
};

/** To improve lookup times and save computation on parsing JSON */
const schemaCache: {
  [contextUrl: string]: {
    [type: string]: SchemaDataResponseWithJsonSchema;
  };
} = {};

/**
 * Given a VC, returns the Serto Schemas representation of its schema.
 *
 * This should probably be implemented with some API that finds schema by VC, but for now we can do it just by just getting all schemas (getSchemas request is probably cached anyway) and searching through it for the right schema.
 *
 * @NOTE This only handles VCs issued using Serto Schemas schemas. Some of this functionality could be implemented by fetching @context and/or JSON Schema from the URLs in the VC and transforming those.
 */
export function useVcSchema(
  vc: VC,
): {
  loading?: boolean;
  error?: any;
  vcSchema?: SchemaDataResponseWithJsonSchema;
} {
  const schemasService = useContext<SertoUiContextInterface>(SertoUiContext).schemasService;

  const { data, error, isValidating: loading } = useSWR("getSchemas", () => schemasService.getSchemas(), {
    revalidateOnFocus: false,
  });

  const vcSchema = useMemo(() => {
    const contextUrls = typeof vc["@context"] === "string" ? [vc["@context"]] : vc["@context"];
    const types = typeof vc.type === "string" ? [vc.type] : vc.type;

    if (!data || !contextUrls?.length || !types?.length) {
      return;
    }

    const cachedSchema = schemaCache[contextUrls[contextUrls.length - 1]]?.[types[types.length - 1]];
    if (cachedSchema) {
      return cachedSchema;
    }

    for (let i = 0; i < data.length; ++i) {
      for (let j = 0; j < contextUrls.length; ++j) {
        if (data[i].ldContextPlus.includes(`"jsonLdContext":"${contextUrls[j]}"`)) {
          for (let k = 0; k < types.length; ++k) {
            if (data[i].ldContextPlus.includes(`"@rootType":"${types[k]}"`)) {
              try {
                const withJsonSchema = {
                  ...data[i],
                  jsonSchema: JSON.parse(data[i].jsonSchema),
                };
                schemaCache[contextUrls[j]] = schemaCache[contextUrls[j]] || {};
                schemaCache[contextUrls[j]][types[k]] = withJsonSchema;
                return withJsonSchema;
              } catch (err) {
                console.error("Failed to parse JSON Schema:", err);
                continue;
              }
            }
          }
        }
      }
    }
  }, [data, vc]);

  return {
    loading,
    error,
    vcSchema,
  };
}

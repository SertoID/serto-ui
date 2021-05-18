import { useMemo, useContext } from "react";
import useSWR from "swr";
import { VC } from "vc-schema-tools";
import { SertoUiContext, SertoUiContextInterface } from "../context/SertoUiContext";
import { SchemaDataResponse } from "../components/views/Schemas/types";

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
  vcSchema?: SchemaDataResponse;
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

    for (let i = 0; i < data.length; ++i) {
      for (let j = 0; j < contextUrls.length; ++j) {
        if (data[i].ldContextPlus.includes(`"jsonLdContext":"${contextUrls[j]}"`)) {
          for (let k = 0; k < types.length; ++k) {
            if (data[i].ldContextPlus.includes(`"@rootType":"${types[k]}"`)) {
              return data[i];
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

import * as React from "react";
import { Button, Loader } from "rimble-ui";
import { SertoUiContext, SertoUiContextInterface } from "../../../context/SertoUiContext";
import { SchemaDataInput, SchemaDataResponse } from "./types";

export interface SchemaSavesProps {
  schema: SchemaDataInput | SchemaDataResponse;
}

export const SchemaSaves: React.FunctionComponent<SchemaSavesProps> = (props) => {
  const { schema } = props;
  const [isSaved, setIsSaved] = React.useState(!!("saved" in schema && schema.saved));
  const [isLoading, setIsLoading] = React.useState(false);
  const context = React.useContext<SertoUiContextInterface>(SertoUiContext);
  const saveable = !!(context.saveSchema && context.unsaveSchema);

  if (!saveable) {
    return <></>;
  }

  async function onClick() {
    setIsLoading(true);
    try {
      await (isSaved ? context.unsaveSchema?.(schema.slug) : context.saveSchema?.(schema.slug));
      setIsSaved(!isSaved);
    } catch (err) {
      console.error("Failed to (un)save schema:", err);
    }
    setIsLoading(false);
  }

  return (
    <Button.Outline size="small" width="100px" onClick={onClick}>
      {isLoading ? <Loader /> : isSaved ? "Unsave" : "Save"}
    </Button.Outline>
  );
};

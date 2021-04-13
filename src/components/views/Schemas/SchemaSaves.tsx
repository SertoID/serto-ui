import * as React from "react";
import { Button, Loader } from "rimble-ui";
import { SertoUiContext, SertoUiContextInterface } from "../../../context/SertoUiContext";
import { SchemaDataInput, SchemaDataResponse } from "./types";

export interface SchemaSavesProps {
  schema: SchemaDataInput | SchemaDataResponse;
}

export const SchemaSaves: React.FunctionComponent<SchemaSavesProps> = (props) => {
  const { schema } = props;
  const [isSaved, setIsSaved] = React.useState(!!("favorite" in schema && schema.favorite));
  const [isLoading, setIsLoading] = React.useState(false);
  const schemasService = React.useContext<SertoUiContextInterface>(SertoUiContext).schemasService;

  if (!schemasService.isAuthenticated) {
    return <></>;
  }

  async function onClick() {
    setIsLoading(true);
    try {
      await schemasService.toggleSaveSchema?.(schema.slug);
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

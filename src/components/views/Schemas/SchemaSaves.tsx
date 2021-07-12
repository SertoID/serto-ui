import * as React from "react";
import { SertoUiContext, SertoUiContextInterface } from "../../../context/SertoUiContext";
import { SchemaDataInput, SchemaDataResponse } from "./types";
import { SplitButton } from "../../elements/SplitButton";

export interface SchemaSavesProps {
  schema: SchemaDataInput | SchemaDataResponse;
}

export const SchemaSaves: React.FunctionComponent<SchemaSavesProps> = (props) => {
  const { schema } = props;
  const [isSaved, setIsSaved] = React.useState(!!("favorite" in schema && schema.favorite));
  const [saveCount, setSaveCount] = React.useState(("favoriteCount" in schema && schema.favoriteCount) || 0);
  const [isLoading, setIsLoading] = React.useState(false);
  const schemasService = React.useContext<SertoUiContextInterface>(SertoUiContext).schemasService;

  async function onClick() {
    setIsLoading(true);
    try {
      await schemasService.toggleSaveSchema?.(schema.slug);
      setIsSaved(!isSaved);
      // kinda dumb, but mutate isn't working for some reason. maybe toggle save endpoint should return new count. this is good enough.
      setSaveCount(saveCount + (isSaved ? -1 : 1));
    } catch (err) {
      console.error("Failed to (un)save schema:", err);
    }
    setIsLoading(false);
  }

  return (
    <SplitButton
      onClick={onClick}
      icon={isSaved ? "Star" : "StarBorder"}
      isLoading={isLoading}
      rightContent={saveCount}
      leftWidth={45}
      disabled={!schemasService.isAuthenticated}
    >
      {!schemasService.isAuthenticated ? "Saves" : isSaved ? "Saved" : "Save"}
    </SplitButton>
  );
};

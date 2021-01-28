import { Check } from "@rimble/icons";
import React, { useState } from "react";
import { Box, Button, Text } from "rimble-ui";
import { Credential, CredentialViewTypes } from "../../elements/components";
import { ModalBack, ModalContent, ModalHeader } from "../../elements/components/Modals";
import { SchemaDataResponse } from "../../elements/components/Schemas";
import { SchemasTable } from "../../elements/components/Schemas/SchemasTable";
import { H3, Tabs } from "../../elements/layouts";
import { colors } from "../../elements/themes";
import { IssueVcForm } from "./IssueVcForm";
import { Identifier } from "../../../types";
import { hexEllipsis } from "../../elements/utils/helpers";

export interface IssueVcProps {
  identifiers: Identifier[];
  subjectIdentifier?: Identifier;
  onComplete(): void;
}

export const IssueVc: React.FunctionComponent<IssueVcProps> = (props) => {
  const [response, setResponse] = useState<any>();
  const [schema, setSchema] = useState<SchemaDataResponse | null | undefined>();
  const [schemaTab, setSchemaTab] = useState("created");

  function goBack() {
    setSchema(undefined);
  }

  if (response && typeof schema !== "undefined") {
    return (
      <ModalContent>
        <Text textAlign="center" color={colors.success.base}>
          <Text
            bg={colors.success.light}
            borderRadius="50%"
            p={2}
            width="50px"
            height="50px"
            fontSize={4}
            style={{ display: "inline-block" }}
          >
            <Check />
          </Text>
          <H3>Credential Issued</H3>
        </Text>
        <Credential vc={response} viewType={CredentialViewTypes.COLLAPSIBLE} />
        <Box my={2}>
          <Button width="100%" onClick={props.onComplete}>
            Done
          </Button>
        </Box>
      </ModalContent>
    );
  }

  if (typeof schema === "undefined") {
    let subjectName = "";
    if (props.subjectIdentifier) {
      const identifier = props.subjectIdentifier;
      if (identifier.alias && identifier.userName) {
        subjectName = `${identifier.alias} (${identifier.userName} - ${hexEllipsis(identifier.did)})`;
      } else if (identifier.alias || identifier.userName) {
        subjectName = `${identifier.alias || identifier.userName} (${hexEllipsis(identifier.did)})`;
      } else {
        subjectName = identifier.did;
      }
    }
    return (
      <>
        <ModalHeader>Issue Credential</ModalHeader>
        <ModalContent width={11}>
          {subjectName && (
            <Text>
              Issuing credential about <b title={props.subjectIdentifier?.did}>{subjectName}</b>.
            </Text>
          )}
          <Text>
            Please select a credential schema, or{" "}
            <Button.Text p={0} onClick={() => setSchema(null)}>
              enter credential as JSON
            </Button.Text>
            .
          </Text>
          <Tabs
            activeTabName={schemaTab}
            tabs={[
              {
                tabName: "created",
                title: "Created",
                content: <SchemasTable discover={false} onSchemaSelect={setSchema} />,
              },
              {
                tabName: "discover",
                title: "Discover",
                content: <SchemasTable discover={true} onSchemaSelect={setSchema} />,
              },
            ]}
            onTabClicked={setSchemaTab}
          />
        </ModalContent>
      </>
    );
  }

  return (
    <>
      <ModalBack onClick={goBack} />
      <IssueVcForm
        identifiers={props.identifiers}
        subjectIdentifier={props.subjectIdentifier}
        schema={schema}
        onSuccessResponse={setResponse}
      />
    </>
  );
};

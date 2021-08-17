import React, { useState } from "react";
import { Check } from "@rimble/icons";
import { Box, Button, Text } from "rimble-ui";
import { Credential, CredentialViewTypes } from "../Credential";
import { ModalBack, ModalContent, ModalHeader } from "../../../elements/Modals";
import { SchemaDataResponse } from "../../Schemas";
import { SchemasTable } from "../../Schemas/SchemasTable";
import { H3 } from "../../../layouts";
import { colors } from "../../../../themes";
import { IssueVcForm } from "./IssueVcForm";
import { Identifier } from "../../../../types";
import { hexEllipsis } from "../../../../utils";

export interface IssueVcProps {
  identifiers: Identifier[];
  subjectIdentifier?: Identifier;
  onComplete(): void;
}

export const IssueVc: React.FunctionComponent<IssueVcProps> = (props) => {
  const [response, setResponse] = useState<any>();
  const [schema, setSchema] = useState<SchemaDataResponse | null | undefined>();

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
        <Credential vc={response.issueResponse} viewType={CredentialViewTypes.COLLAPSIBLE} />
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

          <SchemasTable discover={true} onSchemaSelect={setSchema} hideIssueVcInDetail />
          {/* we'll use something like these tabs again when we have e.g. MRU schemas from agent
          <Tabs
            activeTabName={schemaTab}
            tabs={[
              {
                tabName: "created",
                title: "Created",
                content: <SchemasTable discover={false} onSchemaSelect={setSchema} hideIssueVcInDetail />,
              },
              {
                tabName: "discover",
                title: "Discover",
                content: <SchemasTable discover={true} onSchemaSelect={setSchema} hideIssueVcInDetail />,
              },
            ]}
            onTabClicked={setSchemaTab}
          />
          */}
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

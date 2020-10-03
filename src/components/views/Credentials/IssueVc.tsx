import { Check } from "@rimble/icons";
import React, { useState } from "react";
import { Box, Button, Heading, Text } from "rimble-ui";
import { Credential, CredentialViewTypes } from "../../elements/components";
import { ModalBack, ModalContent, ModalHeader } from "../../elements/components/Modals";
import { SchemaDataResponse } from "../../elements/components/Schemas";
import { SchemasTable } from "../../elements/components/Schemas/SchemasTable";
import { Tabs } from "../../elements/layouts/Tabs/Tabs";
import { colors } from "../../elements/themes";
import { IssueVcForm } from "./IssueVcForm";

export interface IssueVcProps {
  identifiers: string[];
  onComplete(): void;
}

export const IssueVc: React.FunctionComponent<IssueVcProps> = (props) => {
  const [publishedToFeed, setPublishedToFeed] = useState<string | undefined>();
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
          <Heading as="h3">Credential Issued{publishedToFeed && " & Published"}</Heading>
        </Text>
        <Credential
          attributes={response.credentialSubject}
          credentialType={response.type[response.type.length - 1]}
          issuanceDate={response.issuanceDate}
          issuer={response.issuer.id}
          jwt={response.jwt}
          title={response.credentialSubject.title || response.type[response.type.length - 1]}
          viewType={CredentialViewTypes.COLLAPSIBLE}
        />
        <Box my={2}>
          <Button width="100%" onClick={props.onComplete}>
            Done
          </Button>
        </Box>
      </ModalContent>
    );
  }

  if (typeof schema === "undefined") {
    return (
      <>
        <ModalHeader>Issue Credential</ModalHeader>
        <ModalContent>
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
        schema={schema}
        onSuccessResponse={(response, feed) => {
          setResponse(response);
          setPublishedToFeed(feed);
        }}
      />
    </>
  );
};

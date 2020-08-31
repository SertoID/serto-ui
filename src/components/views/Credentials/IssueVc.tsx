import { Check } from "@rimble/icons";
import React, { useContext, useState } from "react";
import { Box, Button, Checkbox, Field, Flash, Heading, Input, Text } from "rimble-ui";
import { mutate } from "swr";
import { TrustAgencyContext } from "../../../context/TrustAgentProvider";
import { TrustAgencyService } from "../../../services/TrustAgencyService";
import { Credential, CredentialViewTypes } from "../../elements/components";
import { SchemasTable } from "../../elements/components/Schemas/SchemasTable";
import { colors } from "../../elements/themes";
import { Tabs } from "../../elements/layouts/Tabs/Tabs";
import { IssueVcForm } from "./IssueVcForm";
import { SchemaDataResponse } from "../../elements/components/Schemas";

export interface IssueVcProps {
  defaultIssuer: string;
  onComplete(): void;
}

export const IssueVc: React.FunctionComponent<IssueVcProps> = (props) => {
  const TrustAgent = useContext<TrustAgencyService>(TrustAgencyContext);

  const [publishedToFeed, setPublishedToFeed] = React.useState<string | undefined>();
  const [response, setResponse] = React.useState<any>();
  const [schema, setSchema] = useState<SchemaDataResponse | null | undefined>();
  const [schemaTab, setSchemaTab] = useState("created");

  function goBack() {
    setSchema(undefined);
  }

  if (response && typeof schema !== "undefined") {
    return (
      <>
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
          title={response.credentialSubject.title || "Generic Credential"}
          viewType={CredentialViewTypes.COLLAPSIBLE}
        />
        <Box my={2}>
          <Button width="100%" onClick={props.onComplete}>
            Done
          </Button>
        </Box>
      </>
    );
  }

  if (typeof schema === "undefined") {
    return (
      <>
        <Heading as="h3">Issue Credential</Heading>
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
      </>
    );
  }

  return (
    <>
      <Button.Text
        icononly
        icon="ArrowBack"
        position="absolute"
        top={0}
        left={0}
        mt={3}
        ml={3}
        onClick={() => goBack()}
      />

      <IssueVcForm
        defaultIssuer={props.defaultIssuer}
        schema={schema}
        onSuccessResponse={(response, feed) => {
          setResponse(response);
          setPublishedToFeed(feed);
        }}
      />
    </>
  );
};

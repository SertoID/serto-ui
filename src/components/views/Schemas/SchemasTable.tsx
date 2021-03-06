import * as React from "react";
import { Link } from "react-router-dom";
import { Button, Flash, Flex, Loader, Table, Text } from "rimble-ui";
import useSWR from "swr";
import { SchemaDataResponse } from "..";
import { colors } from "../../../themes";
import { TBody, TH, TR } from "../../layouts/LayoutComponents";
import { SertoUiContext, SertoUiContextInterface } from "../../../context/SertoUiContext";
import { ViewSchemaButton } from "./ViewSchemaButton";

export interface SchemasTableProps {
  discover?: boolean;
  noSchemasElement?: JSX.Element;
  hideIssueVcInDetail?: boolean;
  onSchemaSelect?(schema: SchemaDataResponse): void;
}

export const SchemasTable: React.FunctionComponent<SchemasTableProps> = (props) => {
  const context = React.useContext<SertoUiContextInterface>(SertoUiContext);

  const { data, error, isValidating } = useSWR(["getSchemas", !props.discover], () =>
    context.schemasService.getSchemas(!props.discover),
  );

  const sortedData = React.useMemo(
    () => data?.sort((schema1, schema2) => (schema1.updated < schema2.updated ? 1 : -1)),
    [data],
  );

  if (sortedData?.length) {
    return (
      <>
        <Table border={0} boxShadow={0} width="100%">
          <thead>
            <TR>
              <TH></TH>
              <TH>Name</TH>
              <TH>Slug</TH>
              <TH>Version</TH>
              {!props.discover && <TH>Discoverable</TH>}
              <TH>Created</TH>
              <TH></TH>
              {props.onSchemaSelect && <TH></TH>}
            </TR>
          </thead>
          <TBody>
            {sortedData.map((schema, i) => {
              return (
                <TR key={i}>
                  <td style={{ maxWidth: 32 }}>{schema.icon}</td>
                  <td style={{ fontWeight: 600 }}>{schema.name}</td>
                  <td>{schema.slug}</td>
                  <td>{schema.version}</td>
                  {!props.discover && <td>{(!!schema.discoverable).toString()}</td>}
                  <td>
                    {schema.created && (
                      <time title={schema.created} dateTime={schema.created}>
                        {new Date(schema.created).toDateString()}
                      </time>
                    )}
                  </td>
                  <td style={{ whiteSpace: "nowrap" }}>
                    <ViewSchemaButton schema={schema} hideIssueVcInDetail={props.hideIssueVcInDetail} />
                    {!props.discover && !props.onSchemaSelect && (
                      <Button.Outline
                        as="a"
                        href={`${context.schemasUiUrl}/editor/${schema.slug}`}
                        target={window.location.origin === context.schemasUiUrl ? undefined : "_blank"}
                        ml={3}
                        size="small"
                      >
                        Update
                      </Button.Outline>
                    )}
                  </td>
                  {props.onSchemaSelect && (
                    <td>
                      <Button.Outline size="small" onClick={() => props.onSchemaSelect?.(schema)}>
                        Select
                      </Button.Outline>
                    </td>
                  )}
                </TR>
              );
            })}
          </TBody>
        </Table>
      </>
    );
  } else if (error) {
    return (
      <Flash my={3} variant="danger">
        Error loading schemas: {error.toString()}
      </Flash>
    );
  } else if (isValidating) {
    return (
      <Flex minHeight={8} alignItems="center" justifyContent="center">
        <Loader color={colors.primary.base} size={5} />
      </Flex>
    );
  } else {
    return (
      props.noSchemasElement || (
        <Text.p display="block" fontSize={1} py={2} lineHeight="copy">
          <b style={{ display: "block", fontWeight: 600 }}>
            {props.discover ? "There are" : "You have"} no credential schemas yet.
          </b>
          Please first <Link to={context.schemasService.createSchemaPath}>create a credential schema</Link> in order to
          coordinate around verified data with your customers and partners.
        </Text.p>
      )
    );
  }
};

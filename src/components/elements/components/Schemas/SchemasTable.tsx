import * as React from "react";
import { generatePath, Link } from "react-router-dom";
import { Button, Card, Flash, Flex, Loader, Modal, Table, Text } from "rimble-ui";
import useSWR from "swr";
import { SchemaDataResponse } from "..";
import { colors } from "../../";
import { routes } from "../../../../constants";
import { TrustAgencyContext } from "../../../../context/TrustAgentProvider";
import { TrustAgencyService } from "../../../../services/TrustAgencyService";
import { TBody, TH, TR } from "../../layouts/LayoutComponents";
import { SchemaDetail } from "./SchemaDetail";

export interface SchemasTableProps {
  discover?: boolean;
  noSchemasElement?: JSX.Element;
  onSchemaSelect?(schema: SchemaDataResponse): void;
}

export const SchemasTable: React.FunctionComponent<SchemasTableProps> = (props) => {
  const [viewedSchema, setViewedSchema] = React.useState<SchemaDataResponse | undefined>();

  const TrustAgent = React.useContext<TrustAgencyService>(TrustAgencyContext);
  const { data, error, isValidating } = useSWR(["/v1/schemas", props.discover], () =>
    TrustAgent.getSchemas(props.discover),
  );

  if (data?.length) {
    return (
      <>
        <Table border={0} boxShadow={0} width="100%">
          <thead>
            <TR>
              <TH></TH>
              <TH>Name</TH>
              <TH>Slug</TH>
              <TH>Version</TH>
              <TH>Discoverable</TH>
              <TH>Created</TH>
              <TH></TH>
              {props.onSchemaSelect && <TH></TH>}
            </TR>
          </thead>
          <TBody>
            {data.map((schema, i) => {
              return (
                <TR key={i}>
                  <td style={{ maxWidth: 32 }}>{schema.icon}</td>
                  <td>{schema.name}</td>
                  <td>{schema.slug}</td>
                  <td>{schema.version}</td>
                  <td>{(!!schema.discoverable).toString()}</td>
                  <td>
                    {schema.created && (
                      <time title={schema.created} dateTime={schema.created}>
                        {new Date(schema.created).toDateString()}
                      </time>
                    )}
                  </td>
                  <td>
                    <Button.Outline size="small" onClick={() => setViewedSchema(schema)}>
                      View
                    </Button.Outline>
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
        <Modal isOpen={!!viewedSchema}>
          <Card p={4} minWidth={9} maxHeight="95vh" overflowY="auto">
            {viewedSchema && <SchemaDetail schema={viewedSchema} />}
            <Button mt={3} width="100%" onClick={() => setViewedSchema(undefined)}>
              Close
            </Button>
          </Card>
        </Modal>
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
        <Loader color={colors.primary.base} size={4} />
      </Flex>
    );
  } else {
    return (
      props.noSchemasElement || (
        <Text.p display="block" fontSize={1} py={2} lineHeight="copy">
          <b style={{ display: "block", fontWeight: 600 }}>There are no credential schemas yet.</b>
          Please navigate to the <Link to={generatePath(routes.SCHEMAS)}>Schemas page</Link> in order to create a
          credential schema to coordinate around verified data with your customers and partners.
        </Text.p>
      )
    );
  }
};

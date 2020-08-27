import * as React from "react";
import { generatePath, Link } from "react-router-dom";
import { Box, Button, Card, Flash, Flex, Loader, Modal, Table, Text } from "rimble-ui";
import useSWR from "swr";
import { SchemaDataResponse } from "..";
import { baseColors, colors } from "../../";
import { routes } from "../../../../constants";
import { TrustAgencyContext } from "../../../../context/TrustAgentProvider";
import { TrustAgencyService } from "../../../../services/TrustAgencyService";
import { TBody, TH, TR } from "../../layouts/LayoutComponents";
import { SchemaDetail } from "./SchemaDetail";

export interface SchemasTableProps {
  discover?: boolean;
  noSchemasElement?: JSX.Element;
}

export const SchemasTable: React.FunctionComponent<SchemasTableProps> = (props) => {
  const [selectedSchema, setSelectedSchema] = React.useState<SchemaDataResponse | undefined>();

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
                    <Button.Outline size="small" onClick={() => setSelectedSchema(schema)}>
                      View
                    </Button.Outline>
                  </td>
                </TR>
              );
            })}
          </TBody>
        </Table>
        <Modal isOpen={!!selectedSchema}>
          <Card p={4}>
            {selectedSchema && <SchemaDetail schema={selectedSchema} />}
            <Button width="100%" onClick={() => setSelectedSchema(undefined)}>
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
        <Flex alignItems="center" justifyContent="center" minHeight={8}>
          <Box bg={baseColors.white} borderRadius={1} py={3} maxWidth={9}>
            <Text.span display="block" fontSize={1} lineHeight="copy" textAlign="center">
              <b style={{ display: "block", fontWeight: 600 }}>There are no credential schemas yet.</b>
              Please navigate to the <Link to={generatePath(routes.SCHEMAS)}>Schemas page</Link> in order to create a
              credential schema to coordinate around verified data with your customers and partners.
            </Text.span>
          </Box>
        </Flex>
      )
    );
  }
};

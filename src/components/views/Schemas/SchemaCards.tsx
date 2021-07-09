import * as React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Box, Flash, Flex, Loader, Text } from "rimble-ui";
import useSWR from "swr";
import { SertoUiContext, SertoUiContextInterface } from "../../../context/SertoUiContext";
import { SchemaCard } from "./SchemaCard";
import { SchemaDataResponse } from "./types";

const StyledFlex = styled(Flex)`
  // Fix for two alone on last row being spaced at beginning and end, instead of beginning and middle.
  &:after {
    content: "";
    flex-basis: 32%;
  }
`;

export interface SchemaCardsProps {
  filter?: "ALL" | "CREATED" | "SAVED";
  noSchemasElement?: JSX.Element;
  firstCard?: JSX.Element;
  maxLength?: number;
  onSchemaClick?(schema: SchemaDataResponse): void;
}

export const SchemaCards: React.FunctionComponent<SchemaCardsProps> = (props) => {
  const schemasService = React.useContext<SertoUiContextInterface>(SertoUiContext).schemasService;

  const { data, error, isValidating } = useSWR(
    ["getSchemas", props.filter === "CREATED"],
    () => schemasService.getSchemas(props.filter === "CREATED"),
    {
      revalidateOnFocus: false,
    },
  );

  const schemas = React.useMemo(
    () =>
      data
        ?.sort((schema1, schema2) => {
          const favDifference = (schema2.favoriteCount || 0) - (schema1.favoriteCount || 0);
          return favDifference || (schema1.updated < schema2.updated ? 1 : -1);
        })
        .slice(0, props.maxLength || undefined),
    [data, props.maxLength],
  );

  if (!error && !isValidating && !schemas?.length) {
    return (
      props.noSchemasElement || (
        <Text.p display="block" fontSize={1} py={2} lineHeight="copy">
          <b style={{ display: "block", fontWeight: 600 }}>
            {props.filter === "CREATED" ? "You have" : "There are"} no credential schemas yet.
          </b>
          Please first <Link to={schemasService.createSchemaPath}>create a credential schema</Link> in order to
          coordinate around verified data with your customers and partners.
        </Text.p>
      )
    );
  }

  const loaderPlaceholders = props.firstCard ? [1, 2, 3, 4, 5] : [1, 2, 3, 4, 5, 6];

  return (
    <StyledFlex justifyContent="space-between" flexWrap="wrap">
      {props.firstCard && <Box width="32%">{props.firstCard}</Box>}
      {isValidating && !schemas?.length ? (
        loaderPlaceholders.map((i) => (
          <Box key={i} py={6} width="32%">
            <Loader size="32px" m="auto" />
          </Box>
        ))
      ) : error ? (
        <Flash variant="danger" width="33%">
          Error loading schemas: {error.message}
        </Flash>
      ) : (
        schemas?.map((schema, i) => (
          <SchemaCard
            schema={schema}
            key={i}
            style={{ width: "32%", minHeight: 300, marginBottom: "16px" }}
            onClick={props.onSchemaClick && (() => props.onSchemaClick?.(schema))}
          />
        ))
      )}
    </StyledFlex>
  );
};

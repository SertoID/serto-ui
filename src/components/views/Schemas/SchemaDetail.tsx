import * as React from "react";
import Linkify from "linkify-react";
import styled from "styled-components";
import { Box, Flex, Text } from "rimble-ui";
import { OpenInNew } from "@rimble/icons";
import { H5 } from "../../layouts";
import { baseColors, colors } from "../../../themes";
import { SchemaDataInput, SchemaDataResponse } from "./types";
import { SchemaSaves } from "./SchemaSaves";
import { SchemaHeader } from "./SchemaHeader";
import { SchemaPreview, SchemaViewTypes, SCHEMA_VIEWS } from "./SchemaPreview";
import { GitHub } from "../../elements/Icons/GitHub";
import { SertoUiContext, SertoUiContextInterface } from "../../../context/SertoUiContext";

const SidebarHeading = styled(H5)`
  margin-bottom: 12px;
  &:first-child {
    margin-top: 0;
  }
`;

const UserLink = styled.a`
  color: ${baseColors.blurple};
  text-decoration: none;
  &:hover {
    color: ${colors.primary.light};
  }

  &,
  svg {
    vertical-align: middle;
  }
  svg {
    margin: 0 8px;
  }
  svg:first-child {
    margin-left: 0;
  }
`;

export interface SchemaDetailProps {
  schema: SchemaDataInput | SchemaDataResponse;
  primaryView?: SchemaViewTypes;
  /** Whether to show various tools including "save" and "issue VC" functionality. */
  hideTools?: boolean;
  /** Whether to show "issue VC" functionality. */
  hideIssueVc?: boolean;
  /** Some layout changes in pane view: the header is pushed inside <SchemaPreview> and below the view switcher dropdown, and only shown in non-JSON view. */
  paneView?: boolean;
  noSwitcher?: boolean;
  fullPage?: boolean;
}

export const SchemaDetail: React.FunctionComponent<SchemaDetailProps> = (props) => {
  const { schema, primaryView, hideTools, hideIssueVc, fullPage, paneView, noSwitcher } = props;
  const schemasService = React.useContext<SertoUiContextInterface>(SertoUiContext).schemasService;
  const [view, setView] = React.useState<SchemaViewTypes>(primaryView || SCHEMA_VIEWS[0]);

  const userOwnsSchema = "creator" in schema && schemasService.userData?.sub === schema.creator?.identifier;

  // If `primaryView` prop changes, set the view to that - but future calls to `setView` will still take effect.
  React.useEffect(() => {
    if (primaryView) {
      setView(primaryView);
    }
  }, [primaryView]);

  return (
    <>
      {!paneView && (
        <Flex mb={4} justifyContent="space-between">
          <SchemaHeader schema={schema} />
          {!hideTools && <SchemaSaves schema={schema} />}
        </Flex>
      )}

      <Flex justifyContent="space-between">
        <SchemaPreview
          schema={schema}
          view={view}
          setView={setView}
          hideTools={hideTools}
          hideIssueVc={hideIssueVc}
          fullPage={fullPage}
          paneView={paneView}
          noSwitcher={noSwitcher}
          rimbleProps={fullPage ? { flexGrow: 1, pr: 4, maxWidth: "665px" } : { maxWidth: "100%" }}
        />
        {fullPage && (
          <Box maxWidth="340px">
            <SidebarHeading>Description</SidebarHeading>
            <Text>
              <Linkify options={{ target: "_blank" }}>{schema.description}</Linkify>
            </Text>

            <SidebarHeading>Schema Author</SidebarHeading>
            <Text>
              {"creator" in schema && schema.creator ? (
                <>
                  {schema.creator.name && (
                    <Text>
                      {schema.creator.name}
                      {userOwnsSchema && " (you)"}
                    </Text>
                  )}
                  <UserLink href={`https://github.com/${schema.creator.nickName}`} target="_blank">
                    <GitHub style={{ width: 16, height: "auto" }} />
                    {schema.creator.nickName}
                    <OpenInNew size="16px" />
                  </UserLink>
                </>
              ) : (
                <i>Author details coming soon</i>
              )}
            </Text>

            {"updated" in schema && (
              <>
                <SidebarHeading>Releases</SidebarHeading>
                <Text>
                  Version {schema.version} on {new Date(schema.updated).toLocaleDateString()}
                </Text>
                <Text mt={2}>
                  <i>Full version history coming soon</i>
                </Text>
              </>
            )}
          </Box>
        )}
      </Flex>
    </>
  );
};

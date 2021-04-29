import * as React from "react";
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
  const [view, setView] = React.useState<SchemaViewTypes>(primaryView || SCHEMA_VIEWS[0]);

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
          rimbleProps={fullPage ? { flexGrow: 1, pr: 4, maxWidth: "640px" } : { maxWidth: "100%" }}
        />
        {fullPage && (
          <Box maxWidth="340px">
            <SidebarHeading>Description</SidebarHeading>
            <Text>{schema.description}</Text>

            <SidebarHeading>Schema Author</SidebarHeading>
            <Text>
              {/*@TODO/tobek Update when users implemented in API*/}
              {"user" in schema ? (
                <UserLink href="https://github.com/@TODO" target="_blank">
                  <GitHub style={{ width: 16, height: "auto" }} />
                  github_user
                  <OpenInNew size="16px" />
                </UserLink>
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

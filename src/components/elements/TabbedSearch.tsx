import { useState } from "react";
import styled from "styled-components";
import { Box, Button, Input } from "rimble-ui";
import { colors } from "../../themes";
import { Tabs } from "../layouts";
import { SearchIcon } from "./Icons";

export const StyledTabbedInput = styled(Input)`
  border-radius: 0 0 4px 4px !important;
  border: 0 !important;
  padding: 34px 50px 34px 24px !important;
  width: 100%;
`;

export interface TabbedSearchBoxProps {
  placeholderText?: string;
  onSearch(value: string): void;
}

export const TabbedSearchBox: React.FunctionComponent<TabbedSearchBoxProps> = (props) => {
  const urlParams = new URLSearchParams(window.location.search);
  const filter = urlParams.get("filter");
  const [search, setSearch] = useState(filter || "");

  function onKeyDown(event: any) {
    if (event.code === "Enter") {
      props.onSearch(search);
    }
  }

  return (
    <Box position="relative" width="100%">
      <StyledTabbedInput
        onChange={(event: any) => setSearch(event.target.value)}
        onKeyDown={(event: any) => onKeyDown(event)}
        placeholder={props.placeholderText || "Search"}
        required
        type="text"
        value={search}
      />
      <Button.Text
        onClick={() => props.onSearch(search)}
        style={{ position: "absolute", top: 10, right: 5, zIndex: 9 }}
      >
        <SearchIcon />
      </Button.Text>
    </Box>
  );
};

export interface TabbedSearchProps {
  activeTab: string;
  tabs: any;
}

export const TabbedSearch: React.FunctionComponent<TabbedSearchProps> = (props) => {
  const [activeTabName, setActiveTabName] = useState(props.activeTab);

  return (
    <Box border={2} borderRadius={1}>
      <Tabs
        bg={colors.primary.background}
        tabs={props.tabs}
        activeTabName={activeTabName}
        onTabClicked={(tabName) => setActiveTabName(tabName)}
      />
    </Box>
  );
};

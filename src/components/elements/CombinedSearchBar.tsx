import React, { useState } from "react";
import { Box, Button, Input } from "rimble-ui";
import styled from "styled-components";

const DropDown = styled.select`

`;

export interface CombinedSearchBarProps {
  onSearch(value: string): void;
  onNftVerify(contractAddress: string, tokenID: string): void;
  onVcVerify(vc: string): void;
}

export const CombinedSearchBar: React.FunctionComponent<CombinedSearchBarProps> = (props) => {
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
      <DropDown>
        
      </DropDown>
      <Input
        onChange={(event: any) => setSearch(event.target.value)}
        onKeyDown={(event: any) => onKeyDown(event)}
        required
        type="text"
        value={search}
        width="100%"
      />
      <Button.Text
        icononly
        icon="Search"
        onClick={() => props.onSearch(search)}
        style={{ position: "absolute", top: 0, right: 0, zIndex: 9 }}
      />
    </Box>
  );
};

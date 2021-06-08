import { useState } from "react";
import styled from "styled-components";
import { Box, Button, Input, Flex } from "rimble-ui";
import { getNftIdentifiersFromUrl } from "../../utils";
import { colors } from "../../themes";
import { DropDown } from "./DropDown/DropDown";

const StyledWrap = styled(Flex)`
  &:focus-within {
    border-color: ${colors.primary.base};
  }
`;

const StyledInput = styled(Input)`
  border-radius: 0 4px 4px 0;
  border: none !important;
  box-shadow: none !important;
  padding-right: 40px;
  width: 100%;
`;

export interface CombinedSearchBarProps {
  placeholderText?: string;
  onSearch(value: string): void;
  onNftVerify(contractAddress: string, tokenID: string): void;
  onVcVerify(vc: string): void;
}

const options = [
  { name: "Search", value: "1" },
  { name: "NFTs", value: "2" },
  { name: "VCs", value: "3" },
];

export const CombinedSearchBar: React.FunctionComponent<CombinedSearchBarProps> = (props) => {
  const urlParams = new URLSearchParams(window.location.search);
  const contract = urlParams.get("contract");
  const vc = urlParams.get("vc");
  let startingState;
  if (contract) {
    startingState = "2";
  } else if (vc) {
    startingState = "3";
  } else {
    startingState = "1";
  }

  const [dropDownState, setDropDownState] = useState<string>(startingState);
  const [search, setSearch] = useState<string>("");

  function onKeyDown(event: any) {
    if (event.code === "Enter") {
      doSearch();
    }
  }

  function doSearch() {
    if (dropDownState === "1") {
      props.onSearch(search);
    } else if (dropDownState === "2") {
      const nftIdentifiers = getNftIdentifiersFromUrl(search);
      props.onNftVerify(nftIdentifiers.contractAddress, nftIdentifiers.tokenId);
    } else {
      props.onVcVerify(search);
    }
  }

  return (
    <StyledWrap border={4} borderRadius={1} boxShadow={1} position="relative" width="100%">
      <Box width="182px">
        <DropDown
          onChange={(value) => {
            setDropDownState(value);
            setSearch("");
          }}
          options={options}
          defaultSelectedValue={startingState}
          combinedSearch
          arrowColor={colors.primary.base}
        />
      </Box>
      <Box bg={colors.lightGray} my={2} width="1px" />
      <Flex flexGrow="1">
        <StyledInput
          boxShadow={0}
          onChange={(event: any) => setSearch(event.target.value)}
          onKeyDown={(event: any) => onKeyDown(event)}
          placeholder={
            props.placeholderText ||
            (dropDownState === "1"
              ? "Search by Domain or DID"
              : dropDownState === "2"
              ? "Search by NFT URL"
              : "Enter Verifiable Credential as JWT or JSON")
          }
          required
          type="text"
          value={search}
        />
        <Button.Text
          mainColor={colors.primary.base}
          icononly
          icon="Search"
          onClick={() => doSearch()}
          style={{ position: "absolute", top: 0, right: 0, zIndex: 9 }}
        />
      </Flex>
    </StyledWrap>
  );
};

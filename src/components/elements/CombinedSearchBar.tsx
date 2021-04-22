import React, { useState } from "react";
import { Box, Button, Input, Flex } from "rimble-ui";
import { getNftIdentifiersFromUrl } from "../../utils";
import { DropDown } from "./DropDown/DropDown";

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

  const [dropDownState, setDropDownState] = useState(startingState);

  const [search, setSearch] = useState("");
  const [error, setError] = useState("");

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
      if (nftIdentifiers.error) {
        setError(nftIdentifiers.error);
      } else {
        props.onNftVerify(nftIdentifiers.contractAddress, nftIdentifiers.tokenId);
      }
    } else {
      props.onVcVerify(search);
    }
  }

  return (
    <Box position="relative" width="100%">
      <Flex flexDirection="row">
        <Box width="182px">
          <DropDown
            onChange={(value) => {
              setDropDownState(value);
              setSearch("");
            }}
            options={options}
            defaultSelectedValue={startingState}
          />
        </Box>
        <Flex flexGrow="1">
          <Input
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
            width="100%"
          />
          <Button.Text
            icononly
            icon="Search"
            onClick={() => doSearch()}
            style={{ position: "absolute", top: 0, right: 0, zIndex: 9 }}
          />
        </Flex>
      </Flex>
    </Box>
  );
};
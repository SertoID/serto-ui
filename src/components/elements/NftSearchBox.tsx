import React, { useState } from "react";
import { Box, Button, Input, Flex, Tooltip } from "rimble-ui";
import { H6 } from "../layouts/LayoutComponents";
import { Info } from "@rimble/icons";
export interface NftSearchBoxProps {
  placeholderText?: string;
  onSearch(value: string, id: string): void;
}

export const NftSearchBox: React.FunctionComponent<NftSearchBoxProps> = (props) => {
  const urlParams = new URLSearchParams(window.location.search);
  const contract = urlParams.get("contract");
  const tokenId = urlParams.get("tokenId");
  const [contractAddress, setContractAddress] = useState(contract || "");
  const [token, setToken] = useState(tokenId || "");

  function onKeyDown(event: any) {
    if (event.code === "Enter") {
      props.onSearch(contractAddress, token);
    }
  }

  return (
    <Box position="relative" width="100%">
      <Flex flexDirection="column" px={4} py={1}>
        <Flex>
          <H6 my={2}>Ethereum NFT Contract Address</H6>
          <Tooltip placement="top" message="The Ethereum ERC721 or ERC1155 Contract Address associated with the token">
            <Info size="16px"/>
          </Tooltip>
        </Flex>
        <Input
          onChange={(event: any) => setContractAddress(event.target.value)}
          onKeyDown={(event: any) => onKeyDown(event)}
          placeholder={props.placeholderText || "Enter Ethereum NFT Contract Address"}
          required
          type="text"
          value={contractAddress}
          width="100%"
        />
        <Flex>
          <H6 my={2}>Token ID</H6>
          <Tooltip placement="top" message="The Token ID associated with the NFT">
            <Info size="16px"/>
          </Tooltip>
        </Flex>
        <Flex>
          <Input
            onChange={(event: any) => setToken(event.target.value)}
            onKeyDown={(event: any) => onKeyDown(event)}
            placeholder={props.placeholderText || "Enter Token ID"}
            required
            type="text"
            value={token}
            width="100%"
            mr={4}
          />
          <Button
            onClick={() => props.onSearch(contractAddress, token)}
          >Search</Button>
        </Flex>
      </Flex>
    </Box>
  );
};

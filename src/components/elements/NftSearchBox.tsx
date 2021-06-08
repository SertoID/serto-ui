import { useState } from "react";
import { Info, Search } from "@rimble/icons";
import { Box, Button, Input, Flash, Flex, Tooltip } from "rimble-ui";
import { H5, H6 } from "../layouts/LayoutComponents";
import { getNftIdentifiersFromUrl } from "../../utils";
import { colors } from "../../themes";
import { StyledTabbedInput } from "./";

export interface NftSearchBoxProps {
  onSearch(value: string, id: string): void;
}

export const NftSearchBox: React.FunctionComponent<NftSearchBoxProps> = (props) => {
  const urlParams = new URLSearchParams(window.location.search);
  const contract = urlParams.get("contract");
  const tokenId = urlParams.get("tokenId");
  const [contractAddress, setContractAddress] = useState<string>(contract || "");
  const [token, setToken] = useState<string>(tokenId || "");
  const [search, setSearch] = useState<string>("");
  const [error, setError] = useState<string>("");

  function onKeyDown(event: any) {
    if (event.code === "Enter") {
      props.onSearch(contractAddress, token);
    }
  }

  function onSearchChanged(val: string) {
    setError("");
    setSearch(val);
    const nftIdentifiers = getNftIdentifiersFromUrl(val);
    setContractAddress(nftIdentifiers.contractAddress);
    setToken(nftIdentifiers.tokenId);
    setError(nftIdentifiers.error);
  }

  function onTrySearch() {
    if (!error) {
      props.onSearch(contractAddress, token);
    }
  }

  return (
    <>
      <Box position="relative" mb="2" width="100%">
        <StyledTabbedInput
          onChange={(event: any) => onSearchChanged(event.target.value)}
          onKeyDown={(event: any) => onKeyDown(event)}
          placeholder="Search NFT by URL"
          required
          type="text"
          value={search}
        />
        <Button.Text onClick={() => onTrySearch()} style={{ position: "absolute", top: 10, right: 5, zIndex: 9 }}>
          <Search color={colors.primary.base} size="32px" />
        </Button.Text>
      </Box>
      <Box border={2} borderRadius={1} pb={5} pt={3} px={4} width="100%">
        {error ? (
          <Flash variant="danger">{error}</Flash>
        ) : (
          <Flash variant="warning">We are not supporting NFT ERC-1155 token at this time.</Flash>
        )}
        <H5 color="silver" mb={2}>
          Or search by
        </H5>
        <Box mb={3}>
          <Flex alignItems="center" mb={2}>
            <H6 mr={1} my={0}>
              NFT Contract Address
            </H6>
            <Tooltip
              placement="top"
              message="The Ethereum ERC721 or ERC1155 Contract Address associated with the token"
            >
              <Info color={colors.silver} size="16px" />
            </Tooltip>
          </Flex>
          <Input
            onChange={(event: any) => setContractAddress(event.target.value)}
            onKeyDown={(event: any) => onKeyDown(event)}
            placeholder="Enter NFT contract address"
            required
            type="text"
            value={contractAddress}
            width="100%"
          />
        </Box>
        <Box>
          <Flex alignItems="center" mb={2}>
            <H6 mr={1} my={0}>
              NFT Token ID
            </H6>
            <Tooltip placement="top" message="The Token ID associated with the NFT">
              <Info color={colors.silver} size="16px" />
            </Tooltip>
          </Flex>
          <Flex>
            <Input
              onChange={(event: any) => setToken(event.target.value)}
              onKeyDown={(event: any) => onKeyDown(event)}
              placeholder="Enter NFT token ID"
              required
              type="text"
              value={token}
              width="100%"
              mr={3}
            />
            <Button onClick={() => props.onSearch(contractAddress, token)} width="125px">
              Search
            </Button>
          </Flex>
        </Box>
      </Box>
    </>
  );
};

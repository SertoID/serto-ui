import { useEffect, useRef, useState } from "react";
import { Identifier } from "../../types";
import { Search } from "@rimble/icons";
import { Box, Input } from "rimble-ui";
import { H6 } from "../layouts";
import { baseColors, colors } from "../../themes";
import { DidSearchOption, DidSearchOptionDid } from "./DidSearchOption";

export interface DidSearchResultTypes {
  domain: string;
  dids: any;
}

export interface DidSearchProps {
  identifiers?: Identifier[];
  placeholderText?: string;
  results?: DidSearchResultTypes[];
  onSearch(value: string): void;
  onSelect(value: string): void;
}

export const DidSearch: React.FunctionComponent<DidSearchProps> = (props) => {
  const node = useRef() as React.MutableRefObject<HTMLInputElement>;
  const { identifiers, onSearch, placeholderText, results } = props;
  const [search, setSearch] = useState<string>("");
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [internalIdentifiers, setInternalIdentifiers] = useState<any>();

  const filterInternalDids = () => {
    const res = identifiers?.filter((obj) => Object.values(obj).some((val) => val.includes(search)));
    console.log(res);
    setInternalIdentifiers(res);
  };

  const onClickOutside = (e: any) => {
    if (node.current.contains(e.target)) {
      return;
    }
    setIsOpen(false);
  };

  useEffect(() => {
    document.addEventListener("mousedown", onClickOutside);
    return () => {
      document.removeEventListener("mousedown", onClickOutside);
    };
  });

  return (
    <Box position="relative" ref={node} width="100%">
      <Search color={colors.primary.base} size="24" style={{ position: "absolute", left: "10px", top: "12px" }} />
      <Input
        borderRadius={isOpen ? "4px 4px 0 0" : 1}
        onChange={(event: any) => {
          setSearch(event.target.value);
          onSearch(event.target.value);
          filterInternalDids();
          !isOpen && setIsOpen(true);
        }}
        borderBottomColor={isOpen && colors.midGray}
        p="16px 16px 16px 40px"
        placeholder={placeholderText || "Search"}
        required
        type="text"
        value={search}
        width="100%"
      />
      {((results && results.length > 0) || (internalIdentifiers && internalIdentifiers.length > 0)) && isOpen && (
        <Box
          bg={baseColors.white}
          border={3}
          borderTop={0}
          borderRadius={"0 0 4px 4px"}
          boxShadow={1}
          maxHeight="500px"
          position="absolute"
          width="100%"
          style={{ overflow: "scroll", zIndex: 9 }}
        >
          {internalIdentifiers && internalIdentifiers.length > 0 && (
            <Box mb={4}>
              <H6 color={colors.midGray} my={3} px={3}>
                Your Identifiers
              </H6>
              {internalIdentifiers.map((did: any, i: number) => {
                return (
                  <DidSearchOptionDid
                    key={i}
                    onSelect={(did: string) => {
                      setSearch(did);
                      setIsOpen(false);
                    }}
                    did={did.did}
                    alias={did.alias}
                  />
                );
              })}
            </Box>
          )}
          {results && results.length > 0 && (
            <Box>
              <H6 color={colors.midGray} my={3} px={3}>
                Public Identifiers
              </H6>
              {results.map((result: DidSearchResultTypes, i: number) => {
                return (
                  <DidSearchOption
                    key={i}
                    onSelect={(did: string) => {
                      setSearch(did);
                      setIsOpen(false);
                    }}
                    did={result.dids}
                    domain={result.domain}
                  />
                );
              })}
            </Box>
          )}
        </Box>
      )}
    </Box>
  );
};

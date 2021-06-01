import { useContext, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { SertoSearchService } from "../../services/SertoSearchService";
import { SertoSearchContext, SertoSearchProvider } from "../../context/SertoSearchProvider";
import { Identifier } from "../../types";
import { Launch, Search } from "@rimble/icons";
import { Box, Flex, Input } from "rimble-ui";
import { baseColors, colors } from "../../themes";
import { DidSearchOption, DidSearchOptionDid } from "./DidSearchOption";

const StyledLink = styled.a`
  color: ${colors.primary.base};
  font-size: 14px;
  font-weight: 600;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

export interface DidSearchResultTypes {
  domain: string;
  dids: any;
}

export interface DidSearchProps {
  defaultSelectedDid?: string;
  identifiers?: Identifier[];
  placeholderText?: string;
  required?: boolean;
  onChange(value: string): void;
}

export const DidSearchComponent: React.FunctionComponent<DidSearchProps> = (props) => {
  const { defaultSelectedDid, identifiers, onChange, placeholderText, required } = props;
  const node = useRef() as React.MutableRefObject<HTMLInputElement>;
  const SertoSearch = useContext<SertoSearchService>(SertoSearchContext);

  const [value, setValue] = useState<string>(defaultSelectedDid || "");
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [internalResults, setInternalResults] = useState<any>();
  const [externalResults, setExternalResults] = useState<DidSearchResultTypes[] | undefined>();

  async function searchExternalIdentifiers(search: string) {
    try {
      const results = await SertoSearch.getEntries(search);
      setExternalResults(results);
    } catch (err) {
      console.error("failed to create identifier:", err);
      return;
    }
  }

  const searchInternalIdentifiers = (search: string) => {
    const res = identifiers?.filter((obj) => Object.values(obj).some((val) => val.includes(search)));
    setInternalResults(res);
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
          onChange(event.target.value);
          setValue(event.target.value);
          searchInternalIdentifiers(event.target.value);
          searchExternalIdentifiers(event.target.value);
          !isOpen && setIsOpen(true);
        }}
        borderColor={isOpen && colors.primary.base}
        borderBottomColor={isOpen && colors.midGray}
        p="16px 16px 16px 40px"
        placeholder={placeholderText || "Search by domain or DID"}
        required={required}
        type="text"
        value={value}
        width="100%"
      />
      {((externalResults && externalResults.length > 0) || (internalResults && internalResults.length > 0)) && isOpen && (
        <Box
          bg={baseColors.white}
          border={3}
          borderTop={0}
          borderRadius={"0 0 4px 4px"}
          boxShadow={1}
          position="absolute"
          width="100%"
          style={{ zIndex: 9 }}
        >
          <Box maxHeight="450px" style={{ overflow: "scroll" }}>
            {internalResults && internalResults.length > 0 && (
              <Box>
                {internalResults.map((did: any, i: number) => {
                  return (
                    <DidSearchOptionDid
                      key={i}
                      onSelect={(did: string) => {
                        setValue(did);
                        setIsOpen(false);
                      }}
                      did={did.did}
                      alias={did.alias}
                    />
                  );
                })}
              </Box>
            )}
            {externalResults && externalResults.length > 0 && (
              <Box>
                {externalResults.map((result: DidSearchResultTypes, i: number) => {
                  return (
                    <DidSearchOption
                      key={i}
                      onSelect={(did: string) => {
                        setValue(did);
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
          <Flex justifyContent="flex-end" p={3}>
            <StyledLink href="" target="_blank">
              <Launch color={colors.primary.base} mr={1} size="16px" style={{ verticalAlign: "text-bottom" }} />
              Go to Serto Search
            </StyledLink>
          </Flex>
        </Box>
      )}
    </Box>
  );
};

export const DidSearch: React.FunctionComponent<DidSearchProps> = (props) => {
  return (
    <SertoSearchProvider>
      <DidSearchComponent
        defaultSelectedDid={props.defaultSelectedDid}
        identifiers={props.identifiers}
        placeholderText={props.placeholderText}
        required={props.required}
        onChange={props.onChange}
      />
    </SertoSearchProvider>
  );
};

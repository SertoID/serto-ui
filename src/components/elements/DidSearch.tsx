import { useContext, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { config } from "../../config";
import { SertoUiContext, SertoUiContextInterface } from "../../context/SertoUiContext";
import { Identifier, DidSearchResult, SelectedDid } from "../../types";
import { Launch } from "@rimble/icons";
import { Box, Flex, Input } from "rimble-ui";
import { baseColors, colors, fonts } from "../../themes";
import { DidSearchOption, DidSearchOptionDid } from "./DidSearchOption";
import { SearchIcon } from "./Icons/SearchIcon";

const StyledLink = styled.a`
  color: ${colors.primary.base};
  font-family: ${fonts.sansSerif};
  font-size: 14px;
  font-weight: 600;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

export interface DidSearchProps {
  defaultSelectedDid?: string;
  identifiers?: Identifier[];
  required?: boolean;
  onChange(value: SelectedDid): void;
  onBlur?(): void;
}

export const DidSearch: React.FunctionComponent<DidSearchProps> = (props) => {
  const { defaultSelectedDid, identifiers, onChange, required, onBlur } = props;
  const node = useRef() as React.MutableRefObject<HTMLInputElement>;
  const context = useContext<SertoUiContextInterface>(SertoUiContext);
  const searchService = context.searchService;

  const [value, setValue] = useState<string>(defaultSelectedDid || "");
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [internalResults, setInternalResults] = useState<Identifier[] | undefined>();
  const [externalResults, setExternalResults] = useState<DidSearchResult[] | undefined>();

  async function searchExternalIdentifiers(search: string) {
    try {
      const results = await searchService.getEntries(search);
      setExternalResults(results);
    } catch (err) {
      console.error("failed to get identifiers:", err);
      return;
    }
  }

  const searchInternalIdentifiers = (search: string) => {
    const res = (identifiers || context.userDids)?.filter((obj) =>
      Object.values(obj).some((val) => val.includes(search)),
    );
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
      <SearchIcon size="20" style={{ position: "absolute", left: "12px", top: "14px" }} />
      <Input
        borderRadius={isOpen ? "4px 4px 0 0" : 1}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          onChange({ did: event.target.value });
          setValue(event.target.value);
          searchInternalIdentifiers(event.target.value);
          searchExternalIdentifiers(event.target.value);
          !isOpen && setIsOpen(true);
        }}
        borderColor={isOpen && colors.primary.base}
        borderBottomColor={isOpen && colors.midGray}
        p="16px 16px 16px 40px"
        placeholder="Search by domain or DID"
        required={required}
        type="url"
        value={value}
        width="100%"
        onBlur={
          onBlur &&
          (() => {
            // Dumb, but since blur happens on mousedown, and onclick selection of DID from dropdown happens on mouseup, blur can get called before the DID is selected. In IssueVcForm input, blur may cause "messaging unsupported" warning to show which changes position of DidSelect and so the selection from DID dropdown doesn't line up with mouse cursor any more. And anyway, conceptually, DidSearch shouldn't fire onBlur right before selection - should fire after.
            setTimeout(onBlur, 500);
          })
        }
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
          <Box maxHeight="250px" style={{ overflow: "scroll" }}>
            {internalResults && internalResults.length > 0 && (
              <Box>
                {internalResults.map((did, i: number) => {
                  return (
                    <DidSearchOptionDid
                      key={i}
                      onSelect={(selectedDid) => {
                        onChange(selectedDid);
                        setValue(selectedDid.did);
                        setIsOpen(false);
                      }}
                      did={{
                        did: did.did,
                        // @TODO/tobek Is this how we'll detect messaging support for now?
                        messagingSupported: !!did.services?.length,
                      }}
                      alias={did.alias}
                    />
                  );
                })}
              </Box>
            )}
            {externalResults && externalResults.length > 0 && (
              <Box>
                {externalResults.map((result: DidSearchResult, i: number) => {
                  return (
                    <DidSearchOption
                      key={i}
                      onSelect={(selectedDid) => {
                        onChange(selectedDid);
                        setValue(selectedDid.did);
                        setIsOpen(false);
                      }}
                      didDocs={result.didDocs}
                      domain={result.domain}
                    />
                  );
                })}
              </Box>
            )}
          </Box>
          <Flex justifyContent="flex-end" p={3}>
            <StyledLink href={config.SEARCH_UI_URL} target="_blank">
              <Launch color={colors.primary.base} mr={1} size="16px" style={{ verticalAlign: "text-bottom" }} />
              Go to Serto Search
            </StyledLink>
          </Flex>
        </Box>
      )}
    </Box>
  );
};

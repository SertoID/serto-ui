import * as React from "react";
import styled from "styled-components";
import { KeyboardArrowDown, KeyboardArrowUp } from "@rimble/icons";
import { Box, Flex, Text } from "rimble-ui";
import { baseColors, colors } from "../../themes";
import { fonts } from "../..";

export const Option = styled(Box)`
  &:hover span {
    color: ${colors.primary.base};
  }
`;

interface DropDownOptions {
  name: string;
  value: string;
}

export interface DropDownProps {
  options: DropDownOptions[];
  defaultSelected?: string;
  optionsTextProps?: { [key: string]: any };
  disabled?: boolean;
  style?: { [key: string]: any };
  onChange(value: string): void;
}

export const DropDown: React.FunctionComponent<DropDownProps> = (props) => {
  const node = React.useRef() as React.MutableRefObject<HTMLInputElement>;
  const [selectedOption, setSelectedOption] = React.useState(props.defaultSelected || props.options[0].name);
  const [isOpen, setIsOpen] = React.useState(false);
  const toggle = () => !props.disabled && setIsOpen(!isOpen);

  const onOptionClicked = (value: string, name: string) => () => {
    setSelectedOption(name);
    setIsOpen(false);
    props.onChange(value);
  };

  const onClickOutside = (e: any) => {
    if (node.current.contains(e.target)) {
      return;
    }
    setIsOpen(false);
  };

  React.useEffect(() => {
    document.addEventListener("mousedown", onClickOutside);
    return () => {
      document.removeEventListener("mousedown", onClickOutside);
    };
  });

  const optionsTextProps = {
    fontSize: 2,
    fontFamily: fonts.sansSerif,
    ...props.optionsTextProps,
  };

  return (
    <Box
      ref={node}
      bg={baseColors.white}
      borderRadius={1}
      boxShadow={1}
      width="100%"
      mb={3}
      style={{
        position: "relative",
        zIndex: isOpen ? 2 : 1,
        opacity: props.disabled ? 0.4 : 1,
      }}
    >
      <Flex
        onClick={toggle}
        alignItems="center"
        height="48px"
        p={3}
        pr={4}
        width="100%"
        style={{
          cursor: props.disabled ? "default" : "pointer",
          position: "relative",
          border: `1px solid ${colors.moonGray}`,
          borderRadius: 4,
          ...props.style,
        }}
      >
        <Text.span {...optionsTextProps}>{selectedOption}</Text.span>
        {isOpen ? (
          <KeyboardArrowUp
            color={colors.moonGray}
            style={{ position: "absolute", right: "8px", top: "calc(50% - 12px)" }}
          />
        ) : (
          <KeyboardArrowDown
            color={colors.moonGray}
            style={{ position: "absolute", right: "8px", top: "calc(50% - 12px)" }}
          />
        )}
      </Flex>
      {isOpen && (
        <Box
          bg={baseColors.white}
          borderBottomLeftRadius={1}
          borderBottomRightRadius={1}
          borderTop={1}
          boxShadow={1}
          width="100%"
          style={{ position: "absolute", left: "0" }}
        >
          <Box>
            {props.options.map((option: any, key: number) => {
              if (option.name !== selectedOption) {
                return (
                  <Option
                    onClick={onOptionClicked(option.value, option.name)}
                    key={key}
                    borderBottom={1}
                    p={3}
                    style={{ cursor: "pointer" }}
                  >
                    <Text.span {...optionsTextProps}>{option.name}</Text.span>
                  </Option>
                );
              }
              return null;
            })}
          </Box>
          {props.children}
        </Box>
      )}
    </Box>
  );
};

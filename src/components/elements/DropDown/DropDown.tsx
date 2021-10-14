import * as React from "react";
import styled from "styled-components";
import { KeyboardArrowDown, KeyboardArrowUp } from "@rimble/icons";
import { Box, Flex, Text } from "rimble-ui";
import { baseColors, colors, fonts } from "../../../themes";

export const Option = styled(Box)`
  &:hover {
    background-color: ${colors.primary.background};
  }
  &:hover span {
    color: ${colors.primary.base};
  }
`;

interface DropDownOption {
  name: string;
  value: string;
}

export interface DropDownProps {
  options: DropDownOption[];
  arrowColor?: string;
  combinedSearch?: boolean;
  defaultSelectedValue?: string;
  optionsTextProps?: { [key: string]: any };
  disabled?: boolean;
  style?: { [key: string]: any };
  onChange(value: string, index: number): void;
}

export const DropDown: React.FunctionComponent<DropDownProps> = (props) => {
  const { combinedSearch } = props;
  const node = React.useRef() as React.MutableRefObject<HTMLInputElement>;
  const [selectedOption, setSelectedOption] = React.useState(
    props.defaultSelectedValue
      ? props.options.filter((option) => option.value === props.defaultSelectedValue)[0] || props.options[0]
      : props.options[0],
  );
  const [isOpen, setIsOpen] = React.useState(false);
  const toggle = () => !props.disabled && setIsOpen(!isOpen);

  const onOptionClicked = (option: DropDownOption) => () => {
    setSelectedOption(option);
    setIsOpen(false);
    props.onChange(option.value, props.options.indexOf(option));
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
    color: colors.silver,
    fontSize: 2,
    fontFamily: fonts.sansSerif,
    ...props.optionsTextProps,
  };
  const selectedOptionTextProps = {
    ...optionsTextProps,
    style: {
      color: baseColors.black,
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis",
      ...props.optionsTextProps?.style,
    },
  };

  return (
    <Box
      ref={node}
      bg={baseColors.white}
      borderRadius={1}
      borderBottomRightRadius={combinedSearch && 0}
      borderTopRightRadius={combinedSearch && 0}
      boxShadow={combinedSearch ? 0 : 1}
      width="100%"
      style={{
        position: "relative",
        zIndex: isOpen ? 2 : 1,
        opacity: props.disabled ? 0.4 : 1,
      }}
    >
      <Flex
        onClick={toggle}
        alignItems="center"
        border={combinedSearch ? 0 : 1}
        borderRight={combinedSearch && 0}
        borderRadius={1}
        borderBottomRightRadius={combinedSearch && 0}
        borderTopRightRadius={combinedSearch && 0}
        height="48px"
        p={3}
        pr={4}
        width="100%"
        style={{
          cursor: props.disabled ? "default" : "pointer",
          position: "relative",
          ...props.style,
        }}
      >
        <Text.span {...selectedOptionTextProps} title={selectedOption.name}>
          {selectedOption.name}
        </Text.span>
        {isOpen ? (
          <KeyboardArrowUp
            color={props.arrowColor || colors.moonGray}
            style={{ position: "absolute", right: "8px", top: "calc(50% - 12px)" }}
          />
        ) : (
          <KeyboardArrowDown
            color={props.arrowColor || colors.moonGray}
            style={{ position: "absolute", right: "8px", top: "calc(50% - 12px)" }}
          />
        )}
      </Flex>
      {isOpen && (
        <Box
          bg={baseColors.white}
          borderRadius={1}
          border={4}
          boxShadow={combinedSearch ? 0 : 1}
          width="100%"
          style={{ position: "absolute", left: "0" }}
        >
          <Box>
            {props.options.map((option: any, key: number) => {
              if (option !== selectedOption) {
                return (
                  <Option
                    onClick={onOptionClicked(option)}
                    key={key}
                    borderBottom={combinedSearch ? 0 : 1}
                    px={3}
                    py={2}
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

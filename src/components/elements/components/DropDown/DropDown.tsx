import * as React from "react";
import { KeyboardArrowDown, KeyboardArrowUp } from "@rimble/icons";
import { Box, Flex, Text } from "rimble-ui";
import { baseColors, colors } from "../../themes";

interface DropDownOptions {
  name: string;
  value: string;
}

export interface DropDownProps {
  options: DropDownOptions[];
  defaultSelected?: string;
  onChange(value: string): void;
}

export const DropDown: React.FunctionComponent<DropDownProps> = (props) => {
  const node = React.useRef() as React.MutableRefObject<HTMLInputElement>;
  const [selectedOption, setSelectedOption] = React.useState(props.defaultSelected || null);
  const [isOpen, setIsOpen] = React.useState(false);
  const toggle = () => setIsOpen(!isOpen);

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

  return (
    <Box
      ref={node}
      bg={baseColors.white}
      borderRadius={1}
      boxShadow={1}
      width="100%"
      style={{ position: "relative", zIndex: 1 }}
    >
      <Flex
        onClick={toggle}
        alignItems="center"
        height={6}
        mb={3}
        p={3}
        pr={4}
        width="100%"
        style={{ cursor: "pointer", position: "relative" }}
      >
        <Text.span fontSize={2} fontWeight={3}>
          {selectedOption || props.options[0].name}
        </Text.span>
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
          style={{ position: "absolute", left: "0", top: "62px" }}
        >
          <Box>
            {props.options.map((option: any, key: number) => {
              if (option.name !== selectedOption) {
                return (
                  <Box
                    onClick={onOptionClicked(option.value, option.name)}
                    key={key}
                    borderBottom={1}
                    p={3}
                    style={{ cursor: "pointer" }}
                  >
                    <Text.span fontSize={2} fontWeight={3}>
                      {option.name}
                    </Text.span>
                  </Box>
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

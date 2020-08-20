import * as React from "react";
import { Flex, Button } from "rimble-ui";
import { colors } from "../..";

const SelectedToggle: React.FunctionComponent<any> = (props) => (
  <Button {...props} style={{ ...props.style, pointerEvents: "none" }} fontWeight="normal" size="small" />
);
const UnselectedToggle: React.FunctionComponent<any> = (props) => (
  <Button.Outline
    {...props}
    style={{ ...props.style, borderColor: colors.primary.base }}
    fontWeight="normal"
    size="small"
  />
);

export interface ToggleProps {
  options: [string, string];
  onChange(selected: string): void;
  style?: any;
  width?: string;
}
export const Toggle: React.FunctionComponent<ToggleProps> = (props) => {
  const [selected, setSelected] = React.useState(props.options[0]);
  function onChange(selected: string) {
    props.onChange(selected);
    setSelected(selected);
  }

  const LeftToggle = selected === props.options[0] ? SelectedToggle : UnselectedToggle;
  const RightToggle = selected === props.options[1] ? SelectedToggle : UnselectedToggle;
  return (
    <Flex width={props.width} style={props.style}>
      <LeftToggle
        borderRadius="4px 0 0 4px"
        style={{ borderRight: 0, width: props.width && "50%" }}
        onClick={() => onChange(props.options[0])}
      >
        {props.options[0]}
      </LeftToggle>
      <RightToggle
        borderRadius="0 4px 4px 0"
        style={{ borderLeft: 0, width: props.width && "50%" }}
        onClick={() => onChange(props.options[1])}
      >
        {props.options[1]}
      </RightToggle>
    </Flex>
  );
};

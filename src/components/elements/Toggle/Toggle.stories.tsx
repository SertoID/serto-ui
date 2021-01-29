import React from "react";
import { storiesOf } from "@storybook/react";
import { Toggle } from "./Toggle";

const options: [string, string] = ["Option One", "Option Two"];

storiesOf("Toggle", module)
  .add("Auto width", () => {
    const [option, setOption] = React.useState(options[0]);
    return (
      <>
        <Toggle options={options} onChange={setOption} />
        selected: {option}
      </>
    );
  })
  .add("Full width", () => {
    const [option, setOption] = React.useState(options[0]);
    return (
      <>
        <Toggle options={options} onChange={setOption} width="100%" />
        selected: {option}
      </>
    );
  })
  .add("Fixed width", () => {
    const [option, setOption] = React.useState(options[0]);
    return (
      <>
        <Toggle options={options} onChange={setOption} width="400px" />
        selected: {option}
      </>
    );
  });

import React from "react";
import { storiesOf } from "@storybook/react";
import { Button } from "rimble-ui";
import { DropDown } from "./DropDown";

const options = [
  { name: "Red", value: "1" },
  { name: "Blue", value: "2" },
  { name: "Green", value: "3" },
];

storiesOf("DropDown", module)
  .add("Option List", () => {
    return <DropDown onChange={() => console.log("change")} options={options} selected="Green" />;
  })
  .add("Option List with Button", () => {
    return (
      <DropDown onChange={() => console.log("change")} options={options}>
        <Button onClick={() => console.log("click")} width="100%">
          Add Color
        </Button>
      </DropDown>
    );
  });

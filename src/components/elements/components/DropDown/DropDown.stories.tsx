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
    return (
      <DropDown onChange={(value) => console.log("changed to", value)} options={options} defaultSelectedValue="3" />
    );
  })
  .add("Option List with Button", () => {
    return (
      <DropDown onChange={(value) => console.log("changed to", value)} options={options}>
        <Button onClick={() => console.log("click")} width="100%">
          Add Color
        </Button>
      </DropDown>
    );
  });

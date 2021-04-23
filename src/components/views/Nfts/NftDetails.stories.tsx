import React from "react";
import { storiesOf } from "@storybook/react";
import { IdentityThemeProvider } from "../../../themes/IdentityTheme";
import { NftDetails } from "./NftDetails";

const details = `
Head: Brushed Titanium
Eyes: Two, Unique 
Nose: Moon Rock, Radioactive Speckle Mouth: Missing Bust: Brushed Titanium Backdrop: Black Series: Second Coming (02) #: 08 Contract Address: 0xe03e4721c75188de6dd9ccf4fc0eb7c81399e305 Token ID: 11
`;

storiesOf("Nfts", module)
  .addDecorator((story) => <IdentityThemeProvider>{story()}</IdentityThemeProvider>)
  .add("List view", () => (
    <NftDetails
      name={"cosmic#boy"}
      imgUrl={
        "https://lh3.googleusercontent.com/jSLi5Y2BlATTysi3-21H6cNni1hzGWjihP1ZcN6NNyurud2JCGzKWooZioagDTdCvD1uekR8NRAT9_0YOa0kWQQP4zNbglgphPgW=s992"
      }
      details={details}
      domains={["supercool.com"]}
    />
  ));

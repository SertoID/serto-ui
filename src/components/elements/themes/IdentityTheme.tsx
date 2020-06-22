import * as React from "react";
import { ThemeProvider } from "styled-components";
import { tint, shade } from "polished";
import { fonts } from "./fonts";
import { baseColors, blurple, blacks, whites, success, warning, danger, info } from "./colors";

// Rimble-Identity Theme File
const identityTheme = {
  fontSizes: [12, 14, 16, 20, 24, 32, 48, 64],
  fontWeights: [0, 300, 400, 600, 700],
  letterSpacings: [0, 1, 2, 4, 8],
  breakpoints: ["40em", "52em", "64em"],
  lineHeights: {
    solid: 1,
    title: 1.25,
    copy: 1.5,
  },
  fonts: {
    serif: fonts.serif,
    sansSerif: fonts.sansSerif,
  },
  space: [0, 4, 8, 16, 32, 64, 128, 256],
  radii: ["0", "4px", "8px", "16px"],
  width: [0, 16, 32, 64, 128, 256],
  minWidths: [0, 16, 32, 64, 128, 256],
  maxWidths: [0, 16, 32, 64, 128, 256, 512, 768, 1024, 1536],
  heights: [0, 16, 32, 64, 128, 256],
  minHeights: [0, 16, 32, 64, 128, 256],
  maxHeights: [0, 16, 32, 64, 128, 256],
  borders: [0, "1px solid transparent"],
  borderWidths: ["0", "1px", "2px", "4px"],
  shadows: ["0", "0 2px 4px rgba(50, 50, 63, 0.1)", "0 8px 16px rgba(50, 50, 63, 0.1)", "0 7px 14px rgba(50,50,63,.1)"],
  opacity: {
    disabled: 0.4,
  },
  colors: {
    text: "#111",
    background: baseColors.white,
    primary: blurple.base,
    "primary-light": blurple.light[1],
    "primary-dark": blurple.dark[1],
    blue: baseColors.consensysblue,
    black: baseColors.black,
    "near-black": "#111",
    "dark-gray": "#32323F",
    "mid-gray": "#53535F",
    grey: "#BDBDC6",
    silver: "#9797A5",
    "light-silver": "#AAAAB5",
    "moon-gray": "#BDBDC6",
    "light-gray": "#D8D8E1",
    "near-white": "#F2F2F8",
    white: baseColors.white,
    transparent: "transparent",
    blacks: [
      blacks[0],
      blacks[1],
      blacks[2],
      blacks[3],
      blacks[4],
      blacks[5],
      blacks[6],
      blacks[7],
      blacks[8],
      blacks[9],
      blacks[10],
      blacks[11],
    ],
    whites: [
      whites[0],
      whites[1],
      whites[2],
      whites[3],
      whites[4],
      whites[5],
      whites[6],
      whites[7],
      whites[8],
      whites[9],
      whites[10],
      whites[11],
    ],
    success: success.base,
    warning: warning.base,
    danger: danger.base,
    info: info.base,
  },
  zIndices: [0, 9, 99, 999, 9999],
  messageStyle: {
    base: {
      color: shade(0.4, "#AAA"),
      backgroundColor: tint(0.9, "#AAA"),
      borderColor: "#AAA",
    },
    success: {
      color: shade(0.4, success.base),
      backgroundColor: tint(0.9, success.base),
      borderColor: success.base,
    },
    warning: {
      color: shade(0.4, warning.base),
      backgroundColor: tint(0.9, warning.base),
      borderColor: warning.base,
    },
    danger: {
      color: shade(0.4, danger.base),
      backgroundColor: tint(0.9, danger.base),
      borderColor: danger.base,
    },
    info: {
      color: shade(0.4, info.base),
      backgroundColor: tint(0.9, info.base),
      borderColor: info.base,
    },
  },
  buttons: {
    primary: {
      color: blurple.text,
      backgroundColor: blurple.base,
      // use css custom props
      "--main-color": blurple.base,
      "--contrast-color": blurple.text,
    },
    success: {
      "--main-color": success.base,
      "--contrast-color": success.text,
    },
    danger: {
      "--main-color": danger.base,
      "--contrast-color": danger.text,
    },
  },
  buttonSizes: {
    small: {
      fontSize: "0.75rem",
      height: "2rem",
      minWidth: "2rem",
      padding: "0 1rem",
    },
    medium: {
      fontSize: "1rem",
      height: "3rem",
      minWidth: "3rem",
    },
    large: {
      fontSize: "1.5rem",
      height: "4rem",
      minWidth: "4rem",
    },
  },
};

export const IdentityThemeProvider: React.FunctionComponent = (props) => {
  return <ThemeProvider theme={identityTheme}>{props.children}</ThemeProvider>;
};

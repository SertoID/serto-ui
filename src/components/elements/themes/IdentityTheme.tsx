import * as React from "react";
import { ThemeProvider } from "styled-components";
import { tint, shade } from "polished";
import { fonts } from "./fonts";
import { baseColors, colors } from "./colors";

const blacks = colors.blacks;
const whites = colors.whites;
const primary = colors.primary;
const info = colors.info;
const success = colors.success;
const warning = colors.warning;
const danger = colors.danger;

// Rimble-Identity Theme File
const identityTheme = {
  fontSizes: [12, 14, 16, 20, 24, 32, 48, 64],
  fontWeights: [0, 300, 400, 600, 700],
  letterSpacings: [0, 1, 2],
  breakpoints: ["40em", "52em", "64em"],
  lineHeights: {
    solid: 1,
    title: 1.25,
    copy: 1.5,
  },
  fonts: {
    serif: fonts.serif,
    sansSerif: fonts.sansSerif,
    mono: fonts.monospace,
  },
  space: [0, 4, 8, 16, 24, 32, 64, 128, 256],
  radii: [0, 4, 8, 16, 24, 32],
  sizes: [0, 4, 8, 16, 24, 32, 64, 128, 256, 512, 768, 1024, 1536],
  borders: [
    0,
    "1px solid " + colors.moonGray,
    "1px solid " + colors.primary.border,
    "1px solid " + colors.primary.base,
  ],
  borderWidths: [0, 1, 2, 4],
  shadows: [
    "0",
    "0 2px 4px rgba(50, 50, 63, 0.1)",
    "0 8px 16px rgba(50, 50, 63, 0.1)",
    "0 7px 14px rgba(50, 50, 63, 0.1)",
  ],
  opacity: {
    disabled: 0.4,
  },
  colors: {
    text: colors.nearBlack,
    background: baseColors.white,
    primary: primary.base,
    "primary-light": primary.light[3],
    "primary-dark": primary.dark[1],
    blue: baseColors.consensysblue,
    black: baseColors.black,
    "near-black": colors.nearBlack,
    "dark-gray": colors.darkGray,
    "mid-gray": colors.midGray,
    grey: colors.grey,
    silver: colors.silver,
    "light-silver": colors.lightSilver,
    "moon-gray": colors.moonGray,
    "light-gray": colors.lightGray,
    "near-white": colors.nearWhite,
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
      color: shade(0.4, colors.lightSilver),
      backgroundColor: tint(0.9, colors.lightSilver),
      borderColor: colors.lightSilver,
    },
    success: {
      color: success.dark,
      backgroundColor: success.light,
      borderColor: success.base,
    },
    warning: {
      color: warning.dark,
      backgroundColor: warning.light,
      borderColor: warning.base,
    },
    danger: {
      color: danger.dark,
      backgroundColor: danger.light,
      borderColor: danger.base,
    },
    info: {
      color: info.dark,
      backgroundColor: info.light,
      borderColor: info.base,
    },
  },
  buttons: {
    primary: {
      color: primary.text,
      backgroundColor: primary.base,
      // use css custom props
      "--main-color": primary.base,
      "--contrast-color": primary.text,
    },
    warning: {
      "--main-color": "#FDF1E3",
      "--contrast-color": "#91622A",
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
      fontSize: "0.875rem",
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

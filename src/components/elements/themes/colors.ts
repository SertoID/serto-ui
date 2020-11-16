import { tint, shade, readableColor } from "polished";

export const baseColors = {
  black: "#000E1A",
  white: "#FFF",
  info: "#36ADF1",
  success: "#28C081",
  warning: "#F1A446",
  danger: "#E9403A",
  blurple: "#5952FF",
  consensysblue: "#3259D6",
};

export const colors = {
  nearBlack: "#111",
  darkGray: "#32323F",
  midGray: "#53535F",
  gray60: "#838393",
  grey: "#BDBDC6",
  silver: "#9797A5",
  lightSilver: "#AAAAB5",
  moonGray: "#BDBDC6",
  lightGray: "#D8D8E1",
  nearWhite: "#F2F2F8",
  blacks: [
    "rgba(0,0,0,.0125)",
    "rgba(0,0,0,.025)",
    "rgba(0,0,0,.05)",
    "rgba(0,0,0,.1)",
    "rgba(0,0,0,.2)",
    "rgba(0,0,0,.3)",
    "rgba(0,0,0,.4)",
    "rgba(0,0,0,.5)",
    "rgba(0,0,0,.6)",
    "rgba(0,0,0,.7)",
    "rgba(0,0,0,.8)",
    "rgba(0,0,0,.9)",
  ],
  whites: [
    "rgba(255,255,255,.0125)",
    "rgba(255,255,255,.025)",
    "rgba(255,255,255,.05)",
    "rgba(255,255,255,.1)",
    "rgba(255,255,255,.2)",
    "rgba(255,255,255,.3)",
    "rgba(255,255,255,.4)",
    "rgba(255,255,255,.5)",
    "rgba(255,255,255,.6)",
    "rgba(255,255,255,.7)",
    "rgba(255,255,255,.8)",
    "rgba(255,255,255,.9)",
  ],
  primary: {
    base: baseColors.blurple, // #5952FF
    text: readableColor(baseColors.blurple), // #FFF
    light: [null, tint(0.2, baseColors.blurple)], // #7A74FF
    dark: [null, shade(0.2, baseColors.blurple)], // #4741CC
    disabled: [null, tint(0.5, baseColors.blurple)], // #ACA8FF
    border: "#EDECFA",
    background: [null, tint(0.9, baseColors.blurple)], // #EEEDFF
  },
  info: {
    base: baseColors.info,
    text: readableColor(baseColors.info),
    light: [null, tint(0.9, baseColors.info)],
    dark: [null, shade(0.4, baseColors.info)],
  },
  success: {
    base: baseColors.success,
    text: baseColors.white,
    light: [null, tint(0.9, baseColors.success)],
    dark: [null, shade(0.4, baseColors.success)],
  },
  warning: {
    base: baseColors.warning,
    text: readableColor(baseColors.warning),
    light: [null, tint(0.9, baseColors.warning)],
    dark: [null, shade(0.4, baseColors.warning)],
  },
  danger: {
    base: baseColors.danger,
    text: baseColors.white,
    light: [null, tint(0.9, baseColors.danger)],
    dark: [null, shade(0.4, baseColors.danger)],
  },
};

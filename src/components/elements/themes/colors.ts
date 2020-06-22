import { tint, shade, readableColor } from "polished";

// rimble base colors
export const baseColors = {
  black: "#000E1A",
  white: "#FFF",
  info: "#36ADF1",
  success: "#28C081",
  warning: "#F1A446",
  danger: "#E9403A",
  blurple: "#4E3FCE",
  consensysblue: "#3259D6",
};

// rimble palette
// TODO:sruddy WIP don't use yet
export const colors = {
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
  greys: ["#F2F2F8", "#D8D8E1", "#BDBDC6", "#AAAAB5", "#9797A5", "#53535F", "#32323F", "#111", "", ""],
  blurple: {
    base: baseColors.blurple,
    text: readableColor(baseColors.blurple),
    light: [null, tint(0.2, baseColors.blurple)],
    dark: [null, shade(0.2, baseColors.blurple)],
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
    text: readableColor(baseColors.danger),
    light: [null, tint(0.9, baseColors.danger)],
    dark: [null, shade(0.4, baseColors.danger)],
  },
};

export const blacks = colors.blacks;
export const whites = colors.whites;
export const greys = colors.greys;
export const blurple = colors.blurple;
export const info = colors.info;
export const success = colors.success;
export const warning = colors.warning;
export const danger = colors.danger;

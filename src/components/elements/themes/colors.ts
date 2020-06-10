import { tint, shade, readableColor } from "polished";

// rimble base colors
export const baseColors = {
  black: "#000e1a",
  white: "#FFF",
  blue: "#36ADF1",
  green: "#28C081",
  yellow: "#F1A446",
  red: "#E9403A",
  blurple: "#4E3FCE",
  consensysblue: "#3259D6",
};

// rimble palette
export const colors = {
  blurple: {
    base: baseColors.blurple,
    text: readableColor(baseColors.blurple),
    light: [null, tint(0.2, baseColors.blurple)],
    dark: [null, shade(0.2, baseColors.blurple)],
  },
  blue: {
    base: baseColors.blue,
    text: readableColor(baseColors.blue),
    light: [null, tint(0.9, baseColors.blue)],
    dark: [null, shade(0.4, baseColors.blue)],
  },
  green: {
    base: baseColors.green,
    text: baseColors.white,
    light: [null, tint(0.9, baseColors.green)],
    dark: [null, shade(0.4, baseColors.green)],
  },
  yellow: {
    base: baseColors.yellow,
    text: readableColor(baseColors.yellow),
    light: [null, tint(0.9, baseColors.yellow)],
    dark: [null, shade(0.4, baseColors.yellow)],
  },
  red: {
    base: baseColors.red,
    text: readableColor(baseColors.red),
    light: [null, tint(0.9, baseColors.red)],
    dark: [null, shade(0.4, baseColors.red)],
  },
};

export const blurple = colors.blurple;
export const blue = colors.blue;
export const green = colors.green;
export const yellow = colors.yellow;
export const red = colors.red;

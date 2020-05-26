import * as React from "react";
import {ThemeProvider} from 'styled-components'
import { tint, shade } from 'polished';
import { fonts } from "./fonts";
import { blurple, baseColors, green, yellow, red, blue } from "./colors";

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
  radii: ['0', '4px', '8px', '16px'],
  width: [0, 16, 32, 64, 128, 256],
  minWidths: [0, 16, 32, 64, 128, 256],
  maxWidths: [0, 16, 32, 64, 128, 256, 512, 768, 1024, 1536],
  heights: [0, 16, 32, 64, 128, 256],
  minHeights: [0, 16, 32, 64, 128, 256],
  maxHeights: [0, 16, 32, 64, 128, 256],
  borders: [0, '1px solid transparent'],
  borderWidths: ['0', '1px', '2px', '4px'],
  shadows: [
    '0',
    '0px 2px 4px rgba(50, 50, 63, 0.1)',
    '0px 8px 16px rgba(50, 50, 63, 0.1)',
    '0 7px 14px rgba(50,50,63,.1)',
  ],
  opacity: {
    disabled: 0.4,
  },
  colors: {
    text: '#111',
    background: '#fff',
    primary: blurple.base,
    'primary-light': blurple.light[1],
    'primary-dark': blurple.dark[1],
    blue: baseColors.consensysblue,
    black: '#000e1a',
    'near-black': '#111',
    'dark-gray': '#32323F',
    'mid-gray': '#53535F',
    grey: '#BDBDC6',
    silver: '#9797A5',
    'light-silver': '#AAAAB5',
    'moon-gray': '#BDBDC6',
    'light-gray': '#D8D8E1',
    'near-white': '#F2F2F8',
    white: '#fff',
    transparent: 'transparent',
    blacks: [
      'rgba(0,0,0,.0125)',
      'rgba(0,0,0,.025)',
      'rgba(0,0,0,.05)',
      'rgba(0,0,0,.1)',
      'rgba(0,0,0,.2)',
      'rgba(0,0,0,.3)',
      'rgba(0,0,0,.4)',
      'rgba(0,0,0,.5)',
      'rgba(0,0,0,.6)',
      'rgba(0,0,0,.7)',
      'rgba(0,0,0,.8)',
      'rgba(0,0,0,.9)',
    ],
    whites: [
      'rgba(255,255,255,.0125)',
      'rgba(255,255,255,.025)',
      'rgba(255,255,255,.05)',
      'rgba(255,255,255,.1)',
      'rgba(255,255,255,.2)',
      'rgba(255,255,255,.3)',
      'rgba(255,255,255,.4)',
      'rgba(255,255,255,.5)',
      'rgba(255,255,255,.6)',
      'rgba(255,255,255,.7)',
      'rgba(255,255,255,.8)',
      'rgba(255,255,255,.9)',
    ],
    success: green.base,
    warning: yellow.base,
    danger: red.base,
    info: blue.base,
  },
  zIndices: [0, 9, 99, 999, 9999],
  messageStyle: {
    base: {
      color: shade(0.4, '#AAA'),
      backgroundColor: tint(0.9, '#AAA'),
      borderColor: '#AAA',
    },
    success: {
      color: shade(0.4, green.base),
      backgroundColor: tint(0.9, green.base),
      borderColor: green.base,
    },
    warning: {
      color: shade(0.4, yellow.base),
      backgroundColor: tint(0.9, yellow.base),
      borderColor: yellow.base,
    },
    danger: {
      color: shade(0.4, red.base),
      backgroundColor: tint(0.9, red.base),
      borderColor: red.base,
    },
    info: {
      color: shade(0.4, blue.base),
      backgroundColor: tint(0.9, blue.base),
      borderColor: blue.base,
    },
  },
  buttons: {
    primary: {
      color: blurple.text,
      backgroundColor: blurple.base,
      // use css custom props
      '--main-color': blurple.base,
      '--contrast-color': blurple.text,
    },
    success: {
      '--main-color': green.base,
      '--contrast-color': green.text,
    },
    danger: {
      '--main-color': red.base,
      '--contrast-color': red.text,
    },
  },
  buttonSizes: {
    small: {
      fontSize: '0.75rem',
      height: '2rem',
      minWidth: '2rem',
      padding: '0 1rem',
    },
    medium: {
      fontSize: '1rem',
      height: '3rem',
      minWidth: '3rem',
    },
    large: {
      fontSize: '1.5rem',
      height: '4rem',
      minWidth: '4rem',
    },
  },
};

export const IdentityThemeProvider: React.FunctionComponent = props => {
  return (
    <ThemeProvider theme={identityTheme}>
      {props.children}
    </ThemeProvider>
  );
};

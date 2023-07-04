import { extendTheme } from '@chakra-ui/react';

const global = {
  html: {
    fontFamily: 'Lato, Noto Sans JP, sans-serif',
    bg: 'bg.body',
    color: 'text.black',
    lineHeight: '100%',
  },
};

const colors = {
  ui: {
    black: '#2E2E2E',
    gray: '#C6C7CF',
    white: '#FDFDFF',
  },
  text: {
    black: '#454545',
    gray: '#A3A3A3',
    lightgray: '#CDCDCD',
  },
  border: {
    gray: '#A3A3A3',
    lightgray: '#DADADA',
    white: '#EEEEEE',
  },
  bg: {
    gray: '#EFEFEF',
    body: '#F9F8F8',
  },
  alert: {
    red: '#DA1E28',
  },
  primary: {
    pink: '#FF3263',
    lightpink: '#FFF5F7',
  },
  colors: {
    blue: '#2DA3E6',
    green: '#1BB76C',
    pink: '#FF3263',
    lightblue: '#EAF6FD',
    lightgreen: '#E8F8F0',
    lightpink: '#FFEBEF',
  },
  checkbox: {
    gray: '#CDCDCD',
  },

  // 一旦戻した。後で別の色に変える
  accent: {
    blue: '#0E4EFB',
    lightblue: '#EDF3FF',
    red: '#DA1E28',
    green: '#0E8A6C',
    lightgreen: '#007B2A0D',
    pink: '#FF3263',
    lightpink: '#FF32630D',
  },
  button: {
    hover: '#003CDF',
    disable: '#B3B5BC',
  },
  evaluation: {
    red: '#FF5555',
    green: '#00D06C',
    gray: '#454545',
    orange: '#FFBB55',
    blue: '#5555FF',
  },
  // checkBoxのチェックマーク背景色
  checkcolor: {
    500: '#FF3263',
  },
};

const zIndices = {
  hide: -1,
  auto: 'auto',
  base: 0,
  docked: 10,
  dropdown: 1000,
  sticky: 1100,
  banner: 1200,
  overlay: 1300,
  modal: 1400,
  popover: 1500,
  skipLink: 1600,
  toast: 1700,
  tooltip: 1800,
};

const fontSizes = {
  xs: '12px',
  sm: '14px',
  md: '16px',
  lg: '18px',
  xl: '24px',
  '2xl': '32px',
};

const fontWeights = {
  regular: 400,
  medium: 500,
  bold: 700,
};

const fonts = {
  body: 'Noto Sans JP',
};

const shadows = {
  card: '0px 0px 6px #ECECEC',
};

const theme = extendTheme({
  styles: {
    global: global,
  },
  colors: colors,
  zIndices: zIndices,
  fonts: fonts,
  fontSizes: fontSizes,
  fontWeights: fontWeights,
  shadows: shadows,
  components: {
    // 切り出すときかなくなる
    Checkbox: {
      defaultProps: {
        colorScheme: 'gray',
      },
    },
    Table: {
      variants: {
        striped: {
          tbody: {
            tr: {
              '&:nth-of-type(odd)': {
                td: {
                  bg: 'bg.body',
                },
              },
            },
          },
        },
      },
    },
  },
});

export default theme;

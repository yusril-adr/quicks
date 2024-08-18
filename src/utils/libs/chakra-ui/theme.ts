import { extendTheme } from '@chakra-ui/react';
import '@fontsource/lato';

const theme = extendTheme({
  fonts: {
    heading: `'lato', -apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol"`,
    body: `'lato', -apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol"`,
  },
  colors: {
    primary: {
      blue: '#2F80ED',
      black: {
        dark: '#4F4F4F',
        light: '#828282',
      },
      white: '#E0E0E0',
    },
    indicator: {
      yellow: {
        main: '#F8B76B',
        secondary: '#F2C94C',
      },
      purple: '#8785FF',
      red: '#EB5757',
    },
  },
});

export default theme;

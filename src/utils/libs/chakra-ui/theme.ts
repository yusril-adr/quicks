import { extendTheme } from '@chakra-ui/react';
import '@fontsource/lato';

const theme = extendTheme({
  styles: {
    global: {
      '::-webkit-scrollbar': {
        width: '8px',
      },

      '::-webkit-scrollbar-track': {
        boxShadow: 'inset 0 0 6px rgba(0, 0, 0, 0.5)',
        borderRadius: '10px',
      },

      '::-webkit-scrollbar-thumb': {
        backgroundColor: '#BDBDBD',
        borderRadius: '10px',
        boxShadow: 'inset 0 0 6px rgba(0, 0, 0, 0.5)',
      },
    },
  },
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
    chats: {
      yellow: {
        dark: '#E5A443',
        light: '#FCEED3',
      },
      purple: {
        dark: '#9B51E0',
        light: '#EEDCFF',
      },
      green: {
        dark: '#43B78D',
        light: '#D2F2EA',
      },
    },
  },
});

export default theme;

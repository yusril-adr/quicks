'use client';

import { ReactNode } from 'react';
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';
import theme from './theme';

export function Provider({ children }: { children: ReactNode }) {
  return (
    <>
      <ChakraProvider theme={theme}>
        <ColorModeScript />
        {children}
      </ChakraProvider>
    </>
  );
}

'use client';

import { ReactNode } from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import theme from './theme';

export function Provider({ children }: { children: ReactNode }) {
  return (
    <>
      <ChakraProvider theme={theme}>{children}</ChakraProvider>
    </>
  );
}

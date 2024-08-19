'use client';

import { FC, ReactNode } from 'react';
import { Provider as ReduxProvider } from 'react-redux';

import store from '@states';
import { Provider as ChakraProvider } from '@utils/libs/chakra-ui/providers';

const ProviderLayout: FC<{
  children: ReactNode;
}> = ({ children }) => (
  <ReduxProvider store={store}>
    <ChakraProvider>{children}</ChakraProvider>
  </ReduxProvider>
);

export default ProviderLayout;

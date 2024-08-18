'use client';

import { FC, ReactNode } from 'react';
import { Provider as ChakraProvider } from '@utils/libs/chakra-ui/providers';

const ProviderLayout: FC<{
  children: ReactNode;
}> = ({ children }) => <ChakraProvider>{children}</ChakraProvider>;

export default ProviderLayout;

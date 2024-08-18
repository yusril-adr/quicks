'use client';

import { FC, ReactNode } from 'react';

const GlobalLayout: FC<{
  children: ReactNode;
}> = ({ children }) => <>{children}</>;

export default GlobalLayout;

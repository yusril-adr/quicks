import DefaultLayout from '@app/layout/Default';
import { FC, ReactNode } from 'react';

const Layout: FC<{
  children: ReactNode;
}> = ({ children }) => <DefaultLayout>{children}</DefaultLayout>;

export default Layout;

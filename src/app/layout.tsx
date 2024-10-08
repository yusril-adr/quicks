import type { Metadata } from 'next';
import { ReactNode } from 'react';

import ProviderLayout from './layout/Provider';
import GlobalLayout from './layout/Global';

import favicon from './favicon.ico';

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <link rel="shortcut icon" href={favicon.src} type="image/x-icon" />
      <body>
        <ProviderLayout>
          <GlobalLayout>{children}</GlobalLayout>
        </ProviderLayout>
      </body>
    </html>
  );
}

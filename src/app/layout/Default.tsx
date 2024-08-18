'use client';
import { FC, ReactNode } from 'react';
import { Container, SkipNavLink } from '@chakra-ui/react';

import CONFIG from '@utils/constants/config';
import NavigationGroup from '@components/NavigationGroup';

const DefaultLayout: FC<{
  children: ReactNode;
}> = ({ children }) => {
  return (
    <>
      <SkipNavLink zIndex="9999">Skip to content</SkipNavLink>

      <Container as="main" maxW="8xl" minH={CONFIG.MIN_BODY_HEIGHT}>
        {children}
      </Container>

      <NavigationGroup />
    </>
  );
};

export default DefaultLayout;

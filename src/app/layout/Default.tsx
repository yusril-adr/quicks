'use client';
import { FC, ReactNode } from 'react';
import { Box, Container, SkipNavLink } from '@chakra-ui/react';

import CONFIG from '@utils/constants/config';
import NavigationGroup from '@components/NavigationGroup';
import { useAppDispatch } from '@hooks/redux';
import { unsetNavigationGroup } from '@states/navigationGroup';

const DefaultLayout: FC<{
  children: ReactNode;
}> = ({ children }) => {
  const dispatch = useAppDispatch();

  return (
    <>
      <Box bgColor="gray.800">
        <SkipNavLink zIndex="9999">Skip to content</SkipNavLink>

        <Container
          as="main"
          maxW="8xl"
          color="white"
          minH={CONFIG.MIN_BODY_HEIGHT}
          onClick={() => dispatch(unsetNavigationGroup())}
        >
          {children}
        </Container>

        <NavigationGroup />
      </Box>
    </>
  );
};

export default DefaultLayout;

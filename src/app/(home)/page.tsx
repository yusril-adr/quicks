'use client';

import {
  Flex,
  Image,
  Heading,
  Text,
  Code,
  SkipNavContent,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import React from 'react';
import CONFIG from '@utils/constants/config';

export default function Home(): React.ReactNode {
  return (
    <Flex
      flexDir="column"
      justifyContent="center"
      alignItems="center"
      minH={CONFIG.MIN_BODY_HEIGHT}
    >
      <SkipNavContent />

      <motion.div
        animate={{
          scale: [1, 0.5, 0.5, 1, 1],
          rotateY: [0, 0, 180, 180, 360],
        }}
        transition={{
          duration: 2,
          ease: 'easeInOut',
          repeat: Infinity,
          repeatDelay: 1,
        }}
      >
        <Image src="/chakra.svg" alt="logo" w="250px" h="250px" mb="8" />
      </motion.div>
      <Heading as="h1">Chakra UI + Next JS</Heading>
      <Text>
        Edit in <Code colorScheme="teal">src/app/(home)/page.tsx</Code>
      </Text>
    </Flex>
  );
}

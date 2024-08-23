import { Flex, Spinner, Text } from '@chakra-ui/react';
import { FC } from 'react';

const Loader: FC = () => (
  <Flex
    flexDir="column"
    justifyContent="center"
    alignItems="center"
    h="100%"
    gap="12px"
  >
    <Spinner
      thickness="8px"
      speed="0.65s"
      emptyColor="#F8F8F8"
      color="#C4C4C4"
      w="86px"
      h="86px"
    />
    <Text>Loading Chats ...</Text>
  </Flex>
);

export default Loader;

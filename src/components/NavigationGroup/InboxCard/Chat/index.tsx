import { Flex, Heading, Text } from '@chakra-ui/react';
import { FC } from 'react';
import { IoArrowBackSharp, IoCloseSharp } from 'react-icons/io5';
import ChatBox from './ChatBox';
import ChatInput from './ChatInput';

const Chat: FC = () => {
  return (
    <Flex direction="column" justifyContent="space-between" h="100%">
      <Flex
        w="100%"
        justifyContent="space-between"
        py="19px"
        px="25px"
        alignItems="center"
        borderBottom="1px"
        borderColor="#BDBDBD"
        textColor="#333333"
      >
        <Flex alignItems="center" gap="15px">
          <IoArrowBackSharp fontSize="24px" />
          <Flex direction="column">
            <Heading textColor="#2F80ED" fontSize="16px">
              I-589 - AMARKHIL, Obaidullah [Affirmative Filing with ZHN]
            </Heading>
            <Text fontSize="12px">3 Participants</Text>
          </Flex>
        </Flex>
        <IoCloseSharp fontSize="24px" />
      </Flex>
      <Flex
        direction="column"
        w="100%"
        px="30px"
        gap="10px"
        overflow="auto"
        h="320px"
      >
        <ChatBox self={true} newMessage={true} date={true} />
        <ChatBox self={false} newMessage={true} date={false} />
        <ChatBox self={true} newMessage={false} date={false} />
        <ChatBox self={false} newMessage={false} date={false} />
        <ChatBox self={false} newMessage={false} date={false} />
      </Flex>
      <ChatInput />
    </Flex>
  );
};

export default Chat;

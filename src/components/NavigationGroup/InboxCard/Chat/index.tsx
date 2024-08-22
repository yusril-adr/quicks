import { Flex, Heading, Spinner, Text } from '@chakra-ui/react';
import { FC } from 'react';
import { IoArrowBackSharp, IoCloseSharp } from 'react-icons/io5';
import ChatBox from './ChatBox';
import ChatInput from './ChatInput';

const Chat: FC = () => {
  return (
    <Flex direction="column" justifyContent="space-between" position="relative">
      <Flex
        w="100%"
        justifyContent="space-between"
        py="19px"
        px="25px"
        alignItems="center"
        borderBottom="1px"
        borderColor="#BDBDBD"
        textColor="#333333"
        position="sticky"
        top="0px"
        backgroundColor="white"
        zIndex="99"
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
        h="100%"
      >
        <ChatBox self={true} newMessage={true} date={true} />
        <ChatBox self={false} newMessage={true} date={false} />
        <ChatBox self={true} newMessage={false} date={false} />
        <ChatBox self={false} newMessage={false} date={false} />
        <ChatBox self={false} newMessage={true} date={false} />
      </Flex>

      {/* <Flex position="sticky" bottom="71px">
        <Flex justifyContent="center" w="100%">
          <Text
            textColor="#2F80ED"
            backgroundColor="#E9F3FF"
            w="fit-content"
            py="5px"
            px="10px"
            fontWeight="400"
            rounded="lg"
          >
            New Message
          </Text>
        </Flex>
      </Flex> */}

      <Flex position="sticky" bottom="60px" px="10px">
        <Flex
          w="100%"
          backgroundColor="#E9F3FF"
          p="10px"
          alignItems="center"
          rounded="lg"
        >
          <Spinner color="primary.blue" thickness="3px" />
          <Text
            textColor="#2F80ED"
            backgroundColor="#E9F3FF"
            w="fit-content"
            py="5px"
            px="10px"
            fontWeight="400"
          >
            Please wait while we connect you with one of our team ...
          </Text>
        </Flex>
      </Flex>

      <ChatInput />
    </Flex>
  );
};

export default Chat;

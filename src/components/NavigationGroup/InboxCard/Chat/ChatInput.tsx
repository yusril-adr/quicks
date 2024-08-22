import { Button, Flex, Input } from '@chakra-ui/react';

const ChatInput = () => {
  return (
    <Flex p="10px" gap="10px">
      <Input pr="4.5rem" placeholder="Enter password" />
      <Button backgroundColor="#2F80ED" textColor="white" w="76px">
        Send
      </Button>
    </Flex>
  );
};

export default ChatInput;

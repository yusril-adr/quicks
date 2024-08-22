import { Button, Flex, Input } from '@chakra-ui/react';

const ChatInput = () => {
  return (
    <Flex
      p="10px"
      gap="10px"
      position="sticky"
      bottom="0px"
      backgroundColor="white"
    >
      <Input pr="4.5rem" placeholder="Message" />
      <Button backgroundColor="#2F80ED" textColor="white" w="76px">
        Send
      </Button>
    </Flex>
  );
};

export default ChatInput;

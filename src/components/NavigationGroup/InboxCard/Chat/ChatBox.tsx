import { AbsoluteCenter, Box, Divider, Flex, Text } from '@chakra-ui/react';
import React from 'react';
import { GoKebabHorizontal } from 'react-icons/go';
import { Case, Default, Switch, When } from 'react-if';

const ChatBox: React.FC<{
  self: boolean;
  newMessage: boolean;
  date: boolean;
}> = ({ self, newMessage, date }) => {
  return (
    <>
      <When condition={date}>
        <Box position="relative" padding="10" textColor="#4F4F4F" w="100%">
          <Divider bgColor="#4F4F4F" h="2px" />
          <AbsoluteCenter bg="white" px="4">
            Today June 09, 2021
          </AbsoluteCenter>
        </Box>
      </When>

      <Switch>
        <Case condition={!self}>
          <Box
            position="relative"
            padding="10"
            textColor="#EB5757"
            w="100%"
            display={newMessage ? 'block' : 'none'}
          >
            <Divider bgColor="#EB5757" h="2px" />
            <AbsoluteCenter bg="white" px="4">
              New Message
            </AbsoluteCenter>
          </Box>

          <Flex direction="column" w="100%">
            <Text textColor="#E5A443">Sugeng</Text>
            <Flex gap="10px" textColor="#4F4F4F">
              <Flex
                direction="column"
                backgroundColor="#FCEED3"
                px="10px"
                py="7px"
                rounded="lg"
              >
                <Text>
                  No worries. It will be completed ASAP. I’ve asked him
                  yesterday.
                </Text>
                <Text>19.00</Text>
              </Flex>
              <GoKebabHorizontal />
            </Flex>
          </Flex>
        </Case>
        <Default>
          <Flex direction="column" alignItems="end" w="100%">
            <Text textColor="#9B51E0">You</Text>
            <Flex gap="10px" textColor="#4F4F4F">
              <GoKebabHorizontal />
              <Flex
                direction="column"
                backgroundColor="#EEDCFF"
                px="10px"
                py="7px"
                rounded="lg"
              >
                <Text>
                  No worries. It will be completed ASAP. I’ve asked him
                  yesterday.
                </Text>
                <Text>19.00</Text>
              </Flex>
            </Flex>
          </Flex>
        </Default>
      </Switch>
    </>
  );
};

export default ChatBox;

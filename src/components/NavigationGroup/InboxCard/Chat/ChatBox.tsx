import {
  AbsoluteCenter,
  Box,
  Divider,
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from '@chakra-ui/react';
import React from 'react';
import { GoKebabHorizontal } from 'react-icons/go';
import { Case, Default, Switch, When } from 'react-if';

import dayjs from '@utils/libs/dayjs';

const ChatBox: React.FC<{
  self: boolean;
  newMessage: boolean;
  newDate: boolean;
  sender: string;
  content: string;
  bgColor: string;
  nameColor: string;
  timestamp: string;
}> = ({
  self,
  newMessage,
  newDate,
  sender,
  content,
  bgColor,
  nameColor,
  timestamp,
}) => {
  const currentDate = dayjs(timestamp);
  let dayLabel = currentDate.format('dddd');

  if (newDate) {
    const diffDate = currentDate.diff(dayjs(), 'D');
    if (diffDate === 0) {
      dayLabel = 'Today';
    }

    if (diffDate === 1) {
      dayLabel = 'Yesterday';
    }
  }

  return (
    <>
      <When condition={newDate}>
        <Box position="relative" padding="10" textColor="#4F4F4F" w="100%">
          <Divider bgColor="#4F4F4F" h="2px" />
          <AbsoluteCenter bg="white" px="4">
            {dayLabel} {currentDate.format('MMMM DD, YYYY')}
          </AbsoluteCenter>
        </Box>
      </When>

      <Switch>
        <Case condition={!self}>
          <Box
            position="relative"
            padding="28px"
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
            <Text textColor={nameColor} fontSize="13px">
              {sender}
            </Text>
            <Flex gap="10px" textColor="#4F4F4F">
              <Flex
                direction="column"
                backgroundColor={bgColor}
                px="10px"
                py="7px"
                rounded="lg"
              >
                <Text fontSize="13px">{content}</Text>
                <Text fontSize="9px" mt="12px">
                  {currentDate.format('HH.mm')}
                </Text>
              </Flex>
              <Menu isLazy>
                <Flex alignItems="baseline">
                  <MenuButton>
                    <GoKebabHorizontal />
                  </MenuButton>
                  <MenuList border="1px" borderColor="#BDBDBD">
                    <MenuItem
                      textColor="#2F80ED"
                      borderBottom="1px"
                      borderColor="#BDBDBD"
                    >
                      Edit
                    </MenuItem>
                    <MenuItem textColor="#EB5757">Delete</MenuItem>
                  </MenuList>
                </Flex>
              </Menu>
            </Flex>
          </Flex>
        </Case>

        <Default>
          <Flex direction="column" alignItems="end" w="100%">
            <Text textColor={nameColor} fontSize="13px">
              You
            </Text>
            <Flex gap="10px" textColor="#4F4F4F">
              <Menu isLazy>
                <Flex alignItems="baseline">
                  <MenuButton>
                    <GoKebabHorizontal />
                  </MenuButton>
                  <MenuList border="1px" borderColor="#BDBDBD">
                    <MenuItem
                      textColor="#2F80ED"
                      borderBottom="1px"
                      borderColor="#BDBDBD"
                    >
                      Edit
                    </MenuItem>
                    <MenuItem textColor="#EB5757">Delete</MenuItem>
                  </MenuList>
                </Flex>
              </Menu>
              <Flex
                direction="column"
                backgroundColor={bgColor}
                px="10px"
                py="7px"
                rounded="lg"
              >
                <Text fontSize="13px">{content}</Text>
                <Text fontSize="9px" mt="12px">
                  {currentDate.format('HH.mm')}
                </Text>
              </Flex>
            </Flex>
          </Flex>
        </Default>
      </Switch>
    </>
  );
};

export default ChatBox;

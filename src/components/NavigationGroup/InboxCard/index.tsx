import {
  Avatar,
  AvatarGroup,
  Box,
  Button,
  Divider,
  Flex,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Spinner,
  StackDivider,
  Text,
  useToken,
  VStack,
} from '@chakra-ui/react';
import { FC, useEffect } from 'react';
import { Else, If, Then, When } from 'react-if';

import { useAppDispatch, useAppSelector } from '@hooks/redux';
import { getConversations } from '@states/chats';
import { ChatType, StateStatus } from '@utils/constants/enum';
import dayjs from '@utils/libs/dayjs';
import PersonIcon from '@utils/icons/person';
import SearchIcon from '@utils/icons/search';
import Chat from './Chat';

const InboxCard: FC = () => {
  const {
    value: { conversations },
    status: conversationStatus,
  } = useAppSelector((state) => state.chats);
  const dispatch = useAppDispatch();
  const [primaryBlue] = useToken('colors', ['primary.blue']);

  useEffect(() => {
    dispatch(getConversations('u125'));
  }, []);

  return (
    <Box h="100%">
      <InputGroup>
        <Input
          type="text"
          placeholder="Search"
          borderColor="#333"
          _hover={{ borderColor: '#333' }}
          _focus={{ borderColor: '#333' }}
          _placeholder={{ color: '#333' }}
        />
        <InputRightElement pointerEvents="none">
          <IconButton
            icon={<SearchIcon w="12px" h="12px" color="#333" />}
            aria-label="search"
          />
        </InputRightElement>
      </InputGroup>

      {/* <If condition={conversationStatus === StateStatus.SUCCESS}>
        <Then>
          <VStack align="stretch">
            {conversations.map((conversation) => (
              <Box key={conversation.chat_id} cursor="pointer" mt="26px">
                <Flex>
                  <If condition={conversation.chat_type === ChatType.GROUP}>
                    <Then>
                      <AvatarGroup position="relative" w="51px">
                        <Avatar
                          position="relative"
                          w="34px"
                          h="34px"
                          ml="17px"
                          border="none"
                          bgColor="primary.blue"
                          icon={<PersonIcon w="12px" h="12px" color="#fff" />}
                        />
                        <Avatar
                          position="absolute"
                          w="34px"
                          h="34px"
                          border="none"
                          icon={
                            <PersonIcon w="12px" h="12px" color="#EOEOEO" />
                          }
                        />
                      </AvatarGroup>
                    </Then>

                    <Else>
                      <AvatarGroup
                        position="relative"
                        w="51px"
                        justifyContent="center"
                      >
                        <Avatar
                          w="34px"
                          h="34px"
                          border="none"
                          bgColor="primary.blue"
                          src={`https://ui-avatars.com/api/?name=${conversation.last_message.sender?.username}&background=${primaryBlue.slice(1)}&color=ffffff&length=1`}
                        />
                      </AvatarGroup>
                    </Else>
                  </If>

                  <Box ml="17px" maxW="calc(100% - 177px)">
                    <Text
                      color="primary.blue"
                      fontSize="12px"
                      noOfLines={[1, 2]}
                    >
                      {conversation.group_name}
                    </Text>
                    <Text color="primary.black.dark" fontSize="12px">
                      {conversation?.last_message?.sender?.username}
                    </Text>
                    <Text
                      color="primary.black.light"
                      fontSize="10px"
                      noOfLines={1}
                    >
                      {conversation?.last_message?.text}
                    </Text>
                  </Box>

                  <Box maxW="112px" ml="auto">
                    <Text fontSize="11px" color="primary.black.dark">
                      {dayjs
                        .utc(conversation.last_message.timestamp)
                        .format('MM/DD/YYYY HH:mm')}
                    </Text>
                  </Box>
                </Flex>

                <When condition={conversation.unread_count > 0}>
                  <Box
                    position="absolute"
                    right="39px"
                    bgColor="indicator.red"
                    w="10px"
                    h="10px"
                    ml="auto"
                    rounded="50%"
                  />
                </When>

                <Divider borderColor="gray.200" mt="32px" />
              </Box>
            ))}
          </VStack>
        </Then>

        <Else>
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
        </Else>
      </If> */}

      <Chat />
    </Box>
  );
};

export default InboxCard;

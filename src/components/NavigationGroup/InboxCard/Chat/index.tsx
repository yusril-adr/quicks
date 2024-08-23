import { Flex, Heading, Spinner, Text } from '@chakra-ui/react';
import { FC, useMemo } from 'react';
import { IoArrowBackSharp, IoCloseSharp } from 'react-icons/io5';
import ChatBox from './ChatBox';
import ChatInput from './ChatInput';
import { useAppDispatch, useAppSelector } from '@hooks/redux';
import { Else, If, Then, When } from 'react-if';
import { StateStatus } from '@utils/constants/enum';
import Loader from '../Loader';
import dayjs from 'dayjs';
import { unsetNavigationGroup } from '@states/navigationGroup';
import { unsetChats } from '@states/chats';

const Chat: FC = () => {
  const {
    value: { currentChat },
    status,
  } = useAppSelector((state) => state.chats);
  const { value: user } = useAppSelector((state) => state.authUser);
  const dispatch = useAppDispatch();

  const chatColors = useMemo(() => ['yellow', 'green'], []);

  const messages = useMemo(() => {
    const usedColor: string[] = [];
    const getRandomColor = (userLength: number) => {
      const result = chatColors.at(Math.random() * chatColors.length) as string;
      if (usedColor.length < userLength && usedColor.includes(result)) {
        return getRandomColor(userLength);
      }

      usedColor.push(result);
      return result;
    };

    if (!currentChat) {
      return [];
    }

    const participants = currentChat.participants.map((participant) => {
      let color = 'purple';

      if (participant.user_id !== user?.user_id) {
        color = getRandomColor(currentChat.participants.length - 1);
      }

      return {
        ...participant,
        color,
      };
    });

    const formattedMessages = currentChat.messages.map((message) => {
      const sender = participants.find(
        ({ user_id }) => user_id === message.sender_id,
      );

      return {
        ...message,
        sender: sender,
      };
    });

    return formattedMessages.sort(
      (prev, next) =>
        dayjs(prev.timestamp).valueOf() - dayjs(next.timestamp).valueOf(),
    );
  }, [currentChat, user, chatColors]);

  return (
    <Flex
      direction="column"
      justifyContent="space-between"
      position="relative"
      h="100%"
    >
      <When condition={!!currentChat}>
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
            <IoArrowBackSharp
              fontSize="24px"
              onClick={() => {
                dispatch(unsetChats());
              }}
            />
            <Flex direction="column">
              <Heading textColor="#2F80ED" fontSize="16px">
                {currentChat?.group_name}
              </Heading>
              <Text fontSize="12px">
                {currentChat?.participants.length} Participants
              </Text>
            </Flex>
          </Flex>
          <IoCloseSharp
            fontSize="24px"
            onClick={() => {
              dispatch(unsetNavigationGroup());
            }}
          />
        </Flex>
      </When>

      <If condition={status === StateStatus.PENDING}>
        <Then>
          <Loader />
        </Then>
        <Else>
          <Flex
            direction="column"
            w="100%"
            px="30px"
            gap="10px"
            overflow="auto"
            h="100%"
          >
            {messages.map((message, idx) => {
              let newDate = false;

              if (idx === 0) {
                newDate = true;
              } else {
                const messageBefore = messages.at(idx - 1);

                newDate =
                  dayjs(message.timestamp).diff(
                    dayjs(messageBefore?.timestamp).format('YYYY-MM-DD'),
                    'd',
                  ) !== 0;

                console.log({
                  messageBefore,
                  message,
                  day: dayjs(message.timestamp).diff(
                    dayjs(messageBefore?.timestamp).format('YYYY-MM-DD'),
                    'd',
                  ),
                  d: dayjs(messageBefore?.timestamp).format('YYYY-MM-DD'),
                  a: dayjs(message.timestamp).format('YYYY-MM-DD'),
                });
              }

              return (
                <ChatBox
                  key={message.message_id}
                  self={message.sender_id === user?.user_id}
                  newMessage={
                    !message.is_read_by.includes(user?.user_id as string)
                  }
                  newDate={newDate}
                  sender={message.sender?.username || 'Deleted User'}
                  content={message.content.text}
                  bgColor={`chats.${message.sender?.color}.light`}
                  nameColor={`chats.${message.sender?.color}.dark`}
                  timestamp={message.timestamp}
                />
              );
            })}
          </Flex>
        </Else>
      </If>

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

      <When condition={status === StateStatus.PENDING}>
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
      </When>

      <ChatInput />
    </Flex>
  );
};

export default Chat;

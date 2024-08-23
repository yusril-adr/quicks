import { ChatType } from '@utils/constants/enum';

export type Chat = {
  chat_id: string;
  chat_type: ChatType;
  group_name?: string;
  group_avatar_url?: null | string;
  participants: { user_id: string; username: string }[];
  messages: {
    message_id: string;
    sender_id: string;
    content: { type: string; text: string };
    timestamp: string;
    is_read_by: string[];
  }[];
};

const chats: Chat[] = [
  {
    chat_id: 'c126',
    chat_type: ChatType.GROUP,
    group_name: 'I-589 - AMARKHIL, Obaidullah [Affirmative Filing with ZHN]',
    group_avatar_url: null,
    participants: [
      { user_id: 'u123', username: 'Mary Hilda' },
      { user_id: 'u124', username: 'Obaidullah Amarkhil' },
      { user_id: 'u125', username: 'User' },
    ],
    messages: [
      {
        message_id: 'm1',
        sender_id: 'u125',
        content: {
          type: 'text',
          text: 'No worries. It will be completed ASAP. I’ve asked him yesterday.',
        },
        timestamp: '2024-08-14T12:32:00Z',
        is_read_by: ['u123', 'u124', 'u125'],
      },
      {
        message_id: 'm2',
        sender_id: 'u123',
        content: {
          type: 'text',
          text: 'Hello Obaidullah, I will be your case advisor for case #029290. I have assigned some homework for you to fill. Please keep up with the due dates. Should you have any questions, you can message me anytime. Thanks.',
        },
        timestamp: '2024-08-15T07:05:00Z',
        is_read_by: ['u123', 'u124', 'u125'],
      },
      {
        message_id: 'm3',
        sender_id: 'u125',
        content: {
          type: 'text',
          text: 'Please contact Mary for questions regarding the case bcs she will be managing your forms from now on! Thanks Mary.',
        },
        timestamp: '2024-08-15T07:32:01Z',
        is_read_by: ['u123', 'u124', 'u125'],
      },
      {
        message_id: 'm4',
        sender_id: 'u123',
        content: {
          type: 'text',
          text: 'Sure thing, Claren',
        },
        timestamp: '2024-08-15T07:32:02Z',
        is_read_by: ['u123', 'u124', 'u125'],
      },

      {
        message_id: 'm5',
        sender_id: 'u124',
        content: {
          type: 'text',
          text: 'Morning. I’ll try to do them. Thanks',
        },
        timestamp: '2024-08-15T08:05:03Z',
        is_read_by: ['u124'],
      },
    ],
  },
  {
    chat_id: 'c125',
    chat_type: ChatType.GROUP,
    group_name: '109220-Naturalization',
    group_avatar_url: null,
    participants: [
      { user_id: 'u123', username: 'Cameron Philips' },
      { user_id: 'u124', username: 'jane_doe' },
      { user_id: 'u125', username: 'User' },
    ],
    messages: [
      {
        message_id: 'm1',
        sender_id: 'u123',
        content: { type: 'text', text: 'Please check it out!' },
        timestamp: '2024-08-15T12:05:00Z',
        is_read_by: ['u123', 'u124'],
      },
    ],
  },
  {
    chat_id: 'c124',
    chat_type: ChatType.GROUP,
    group_name:
      'Jeannette Moraima Guaman Chamba (Hutto I-589) [ Hutto Follow Up - Brief Service ]',
    group_avatar_url: null,
    participants: [
      { user_id: 'u123', username: 'Cameron Philips' },
      { user_id: 'u124', username: 'Ellen' },
      { user_id: 'u125', username: 'User' },
    ],
    messages: [
      {
        message_id: 'm1',
        sender_id: 'u124',
        content: { type: 'text', text: 'Hey, please read!' },
        timestamp: '2024-08-15T12:04:00Z',
        is_read_by: ['u123', 'u125'],
      },
    ],
  },
  {
    chat_id: 'c123',
    chat_type: ChatType.GROUP,
    group_name: '8405-Diana SALAZAR MUNGUIA',
    group_avatar_url: null,
    participants: [
      { user_id: 'u123', username: 'Cameron Philips' },
      { user_id: 'u124', username: 'Ellen' },
      { user_id: 'u125', username: 'User' },
    ],
    messages: [
      {
        message_id: 'm1',
        sender_id: 'u123',
        content: {
          type: 'text',
          text: 'I understand your initial concerns and thats very valid, Elizabeth. But you Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus blanditiis voluptates illo incidunt harum iusto dicta porro beatae officiis accusantium!',
        },
        timestamp: '2024-08-15T12:03:00Z',
        is_read_by: ['u123', 'u124'],
      },
    ],
  },
  {
    chat_id: 'c122',
    chat_type: ChatType.INDIVIDUAL,
    participants: [
      { user_id: 'u123', username: 'FastVisa Support' },
      { user_id: 'u125', username: 'User' },
    ],
    messages: [
      {
        message_id: 'm1',
        sender_id: 'u125',
        content: { type: 'text', text: 'Test.' },
        timestamp: '2024-08-15T12:01:00Z',
        is_read_by: ['u123'],
      },
      {
        message_id: 'm2',
        sender_id: 'u123',
        content: { type: 'text', text: 'Hey there! Welcome to your inbox.' },
        timestamp: '2024-08-15T12:02:00Z',
        is_read_by: ['u123'],
      },
    ],
  },
];

export type Conversation = {
  chat_id: string;
  chat_type: ChatType;
  group_name: string;
  last_message: {
    sender:
      | {
          user_id: string;
          username: string;
        }
      | null
      | undefined;
    message_id: string | undefined;
    text: string | undefined;
    timestamp: string | undefined;
  };
  unread_count: number;
};

const ChatService = {
  getConversations(user: string): Promise<Conversation[]> {
    const conversations = chats.map((chat) => {
      const last_message = chat.messages.at(-1);

      const sender = last_message
        ? chat.participants.find(
            ({ user_id }) => user_id === last_message.sender_id,
          )
        : null;

      let unread_count = 0;
      chat.messages.forEach((message) => {
        if (!message.is_read_by.includes(user)) {
          unread_count += 1;
        }
      });

      return {
        chat_id: chat.chat_id,
        chat_type: chat.chat_type,
        group_name: chat.group_name || (sender?.username as string),
        last_message: {
          sender,
          message_id: last_message?.message_id,
          text: last_message?.content.text,
          timestamp: last_message?.timestamp,
        },
        unread_count,
      };
    });

    return new Promise((resolve) => {
      setTimeout(() => resolve(conversations), 1000 * 3);
    });
  },

  getChatById(chatId: string): Promise<Chat | undefined | null> {
    const currentChat = chats.find((chat) => chat.chat_id === chatId);

    return new Promise((resolve) => {
      setTimeout(() => resolve(currentChat), 1000 * 3);
    });
  },
};

export default ChatService;

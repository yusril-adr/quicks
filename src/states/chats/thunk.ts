import { createAsyncThunk } from '@reduxjs/toolkit';

import ChatService, {
  Chat,
  Conversation,
} from '@services/api/quicks/ChatService';

export const getConversations = createAsyncThunk<
  Conversation[],
  string,
  {
    rejectValue: Error | unknown;
  }
>('chats/getConversations', async (userId: string, { rejectWithValue }) => {
  try {
    const conversations = await ChatService.getConversations(userId);
    return conversations;
  } catch (error) {
    return rejectWithValue(error);
  }
});

export const getChatById = createAsyncThunk<
  Chat | null | undefined,
  string,
  {
    rejectValue: Error | unknown;
  }
>('chats/getChatById', async (chatId: string, { rejectWithValue }) => {
  try {
    const chat = await ChatService.getChatById(chatId);
    return chat;
  } catch (error) {
    return rejectWithValue(error);
  }
});

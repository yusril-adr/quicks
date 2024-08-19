import { createAsyncThunk } from '@reduxjs/toolkit';

import ChatService, { Conversation } from '@services/api/chats/ChatService';

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

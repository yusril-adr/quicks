import { createSlice } from '@reduxjs/toolkit';
import { getChatById, getConversations } from './thunk';
import { StateStatus } from '@utils/constants/enum';
import { Conversation, Chat } from '@services/api/quicks/ChatService';

export type StateType = {
  value: {
    conversations: Conversation[];
    currentChat: Chat | null | undefined;
    selectedChatId: string | null | undefined;
  };
  status: StateStatus;
  error: Error | null | unknown;
};

export const initialState: StateType = {
  value: {
    conversations: [],
    currentChat: null,
    selectedChatId: null,
  },
  status: StateStatus.IDLE,
  error: null,
};

export const chatsSlicer = createSlice({
  name: 'chats',
  initialState,
  reducers: {
    setChats(state, action) {
      return {
        ...state,
        value: action.payload,
      };
    },
    unsetChats() {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    // getConversations
    builder.addCase(getConversations.pending, (state) => ({
      ...state,
      status: StateStatus.PENDING,
    }));
    builder.addCase(getConversations.fulfilled, (state, action) => ({
      ...state,
      error: initialState.error,
      status: StateStatus.SUCCESS,
      value: {
        ...state.value,
        conversations: action.payload,
      },
    }));
    builder.addCase(getConversations.rejected, (state, action) => {
      return {
        ...state,
        status: StateStatus.REJECTED,
        value: {
          ...state.value,
          conversations: [],
        },
        error: action.payload,
      };
    });

    // getChat
    builder.addCase(getChatById.pending, (state, action) => ({
      ...state,
      status: StateStatus.PENDING,
      value: {
        ...state.value,
        selectedChatId: action.meta.arg,
      },
    }));
    builder.addCase(getChatById.fulfilled, (state, action) => ({
      ...state,
      error: initialState.error,
      status: StateStatus.SUCCESS,
      value: {
        ...state.value,
        currentChat: action.payload,
      },
    }));
    builder.addCase(getChatById.rejected, (state, action) => {
      return {
        ...state,
        status: StateStatus.REJECTED,
        value: {
          ...state.value,
          currentChat: null,
          selectedChatId: null,
        },
        error: action.payload,
      };
    });
  },
});

export const { setChats, unsetChats } = chatsSlicer.actions;

export default chatsSlicer.reducer;

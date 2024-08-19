import { createSlice } from '@reduxjs/toolkit';
import { getConversations } from './thunk';
import { StateStatus } from '@utils/constants/enum';
import { Conversation } from '@services/api/chats/ChatService';

export type StateType = {
  value: {
    conversations: Conversation[];
  };
  status: StateStatus;
  error: Error | null | unknown;
};

export const initialState: StateType = {
  value: {
    conversations: [],
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
  },
});

export const { setChats, unsetChats } = chatsSlicer.actions;

export default chatsSlicer.reducer;

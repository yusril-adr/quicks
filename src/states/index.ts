import { configureStore } from '@reduxjs/toolkit';

import navigationGroupReducer from './navigationGroup';
import chatsReducer from './chats';

const store = configureStore({
  reducer: {
    navigationGroup: navigationGroupReducer,
    chats: chatsReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export default store;

import { configureStore } from '@reduxjs/toolkit';

import authUserReducer from './authUser';
import navigationGroupReducer from './navigationGroup';
import chatsReducer from './chats';
import tasksReducer from './tasks';

const store = configureStore({
  reducer: {
    authUser: authUserReducer,
    navigationGroup: navigationGroupReducer,
    chats: chatsReducer,
    tasks: tasksReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export default store;

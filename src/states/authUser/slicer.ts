import { createSlice } from '@reduxjs/toolkit';
import { StateStatus } from '@utils/constants/enum';

export type StateType = {
  value: {
    user_id: string;
  } | null;
  status: StateStatus;
  error: Error | null | unknown;
};

export const initialState: StateType = {
  value: null,
  status: StateStatus.IDLE,
  error: null,
};

export const authUserSlicer = createSlice({
  name: 'authUser',
  initialState,
  reducers: {
    setAuthUser(state, action) {
      return {
        ...state,
        value: action.payload,
      };
    },
    unsetAuthUser() {
      return initialState;
    },
    loginUserById(state, action) {
      return {
        ...state,
        value: {
          ...state.value,
          user_id: action.payload,
        },
        status: StateStatus.SUCCESS,
      };
    },
  },
});

export const { setAuthUser, unsetAuthUser, loginUserById } =
  authUserSlicer.actions;

export default authUserSlicer.reducer;

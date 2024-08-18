import { createSlice } from '@reduxjs/toolkit';
import { NavigationName, StateStatus } from '@utils/constants/enum';

export type StateType = {
  value: {
    curr: NavigationName | null;
    prev: NavigationName | null;
    isOpen: boolean;
  };
  status: StateStatus;
  error: Error | null | unknown;
};

export const initialState: StateType = {
  value: {
    curr: null,
    prev: null,
    isOpen: false,
  },
  status: StateStatus.SUCCESS,
  error: null,
};

export const navigationGroupSlicer = createSlice({
  name: 'navigationGroup',
  initialState,
  reducers: {
    setNavigationGroup(state, action) {
      return {
        ...state,
        value: {
          ...state.value,
          ...action.payload,
        },
      };
    },
    unsetNavigationGroup() {
      return initialState;
    },
  },
});

export const { setNavigationGroup, unsetNavigationGroup } =
  navigationGroupSlicer.actions;

export default navigationGroupSlicer.reducer;

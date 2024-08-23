import { createSlice } from '@reduxjs/toolkit';
import { getTasks, updateTaskById, deleteTaskById } from './thunk';
import { StateStatus } from '@utils/constants/enum';
import { Task } from '@services/api/quicks/TaskService';

export type StateType = {
  value: Task[];
  status: StateStatus;
  error: Error | null | unknown;
};

export const initialState: StateType = {
  value: [],
  status: StateStatus.IDLE,
  error: null,
};

export const tasksSlicer = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    setTasks(state, action) {
      return {
        ...state,
        value: action.payload,
      };
    },
    unsetTasks() {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    // getTasks
    builder.addCase(getTasks.pending, (state) => ({
      ...state,
      status: StateStatus.PENDING,
    }));
    builder.addCase(getTasks.fulfilled, (state, action) => ({
      ...state,
      error: initialState.error,
      status: StateStatus.SUCCESS,
      value: action.payload,
    }));
    builder.addCase(getTasks.rejected, (state, action) => {
      return {
        ...state,
        status: StateStatus.REJECTED,
        error: action.payload,
      };
    });

    // updateTaskById
    builder.addCase(updateTaskById.pending, (state) => ({
      ...state,
      status: StateStatus.PENDING,
    }));
    builder.addCase(updateTaskById.rejected, (state, action) => {
      return {
        ...state,
        status: StateStatus.REJECTED,
        error: action.payload,
      };
    });

    // deleteTaskById
    builder.addCase(deleteTaskById.pending, (state) => ({
      ...state,
      status: StateStatus.PENDING,
    }));
    builder.addCase(deleteTaskById.rejected, (state, action) => {
      return {
        ...state,
        status: StateStatus.REJECTED,
        error: action.payload,
      };
    });
  },
});

export const { setTasks, unsetTasks } = tasksSlicer.actions;

export default tasksSlicer.reducer;

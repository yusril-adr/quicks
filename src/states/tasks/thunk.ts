import { createAsyncThunk } from '@reduxjs/toolkit';

import TaskService, { Task } from '@services/api/quicks/TaskService';

export const getTasks = createAsyncThunk<
  Task[],
  string,
  {
    rejectValue: Error | unknown;
  }
>('tasks/getTasks', async (userId: string, { rejectWithValue }) => {
  try {
    const tasks = await TaskService.getTasks(userId);
    return tasks;
  } catch (error) {
    return rejectWithValue(error);
  }
});

export const updateTaskById = createAsyncThunk<
  void,
  { taskId: string; payload: Partial<Task>; userId: string },
  {
    rejectValue: Error | unknown;
  }
>(
  'tasks/updateTaskById',
  async ({ taskId, payload, userId }, { dispatch, rejectWithValue }) => {
    try {
      await TaskService.updateTaskById(taskId, payload);
      dispatch(getTasks(userId));
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const deleteTaskById = createAsyncThunk<
  void,
  { taskId: string; userId: string },
  {
    rejectValue: Error | unknown;
  }
>(
  'tasks/deleteTaskById',
  async ({ taskId, userId }, { dispatch, rejectWithValue }) => {
    try {
      await TaskService.deleteTaskById(taskId);
      dispatch(getTasks(userId));
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

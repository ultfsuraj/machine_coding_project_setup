import { removeUser } from '@/redux/userSlice';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const fetchTasks = createAsyncThunk('tasks/fetchTasks', async () => {
  const data = await new Promise((res) => setTimeout(() => res(''), 2000));
  if (!data) {
    throw new Error('no data');
  }
  return data;
});

export const taskSlice = createSlice({
  name: 'tasks',
  initialState: {},
  reducers: {
    addTask: () => {},
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTasks.rejected, () => {});
    builder.addCase(removeUser, () => {});
  },
});

export const { addTask } = taskSlice.actions;

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'users',
  initialState: {},
  reducers: {
    removeUser: (state, action: PayloadAction<number>) => {},
  },
});

export const { removeUser } = userSlice.actions;

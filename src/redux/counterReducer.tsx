import { createReducer, createAction } from '@reduxjs/toolkit';

type counterState = {
  value: 0;
};

export const increment = createAction('INCREMENT');
export const decrement = createAction('DECREMENT');
export const reset = createAction('RESET');
export const addRandom = createAction('ADD_RANDOM', (min: number, max: number) => {
  return { payload: { min, max } };
});

type CounterAction =
  | ReturnType<typeof increment>
  | ReturnType<typeof decrement>
  | ReturnType<typeof reset>
  | ReturnType<typeof addRandom>;

export const initialState: counterState = { value: 0 };

export const counterReducer = createReducer(initialState, (builder) => {
  builder.addCase(increment, (state) => {
    state.value += 1;
  });
  builder.addCase(decrement, (state) => {
    state.value -= 1;
  });
  builder.addCase(reset, (state) => {
    state.value = 0;
  });
  builder.addCase(addRandom, (state, action) => {
    const { min, max } = action.payload;
    state.value += Math.floor(Math.random() * (max > min ? max - min : 0));
  });
});

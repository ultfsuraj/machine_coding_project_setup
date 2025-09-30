'use client';

import {
  counterReducer,
  initialState,
  increment,
  decrement,
  reset,
  addRandom,
} from '@/redux/counterReducer';
import { useReducer } from 'react';
import { compose } from 'redux';

const Counter = () => {
  const [state, dispatch] = useReducer(counterReducer, initialState);
  const actions = {
    increment: compose(dispatch, increment),
    decrement: compose(dispatch, decrement),
    reset: compose(dispatch, reset),
    addRandom: compose(dispatch, addRandom),
  };

  function submitHandler(formData: FormData) {
    const { min, max } = Object.fromEntries(formData.entries());
    // dispatch(addRandom(+min, +max));
    actions.addRandom(+min, +max);
  }

  return (
    <div className="w-full cursor-pointer p-2">
      <div className="flex w-full items-center justify-center gap-4 p-2">
        <div
          className="w-9 bg-amber-900 px-2 py-1 text-center font-bold text-neutral-50"
          onClick={() => dispatch(increment())}
        >
          +
        </div>
        <p className="border border-amber-950 px-4 py-2 text-2xl font-bold text-amber-900">
          {state.value}
        </p>
        <div
          className="w-9 bg-amber-900 px-2 py-1 text-center font-bold text-neutral-50"
          onClick={() => dispatch(decrement())}
        >
          -
        </div>
      </div>
      <form action={submitHandler} className="flex w-full items-center justify-center gap-4 p-2">
        <fieldset className="border border-amber-950 px-2 py-1">
          <legend className="px-2 text-amber-900">Min</legend>
          <input
            className="w-full border-none px-2 outline-none focus:outline-none"
            type="number"
            name="min"
          />
        </fieldset>
        <button
          type="submit"
          className="bg-amber-900 px-2 py-1 text-center font-bold text-neutral-50"
        >
          Add Random
        </button>
        <fieldset className="border border-amber-950 px-2 py-1">
          <legend className="px-2 text-amber-900">Max</legend>
          <input
            className="w-full border-none px-2 outline-none focus:outline-none"
            type="number"
            name="max"
          />
        </fieldset>
      </form>
      <div className="flex w-full items-center justify-center gap-4 p-2">
        <div
          className="bg-amber-900 px-2 py-1 text-center font-bold text-neutral-50"
          onClick={() => dispatch(reset())}
        >
          Reset
        </div>
      </div>
    </div>
  );
};

export default Counter;

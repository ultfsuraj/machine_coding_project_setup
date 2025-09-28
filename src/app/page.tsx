'use client';

import Data from '@/components/Data';
import LocalStorage from '@/components/LocalStorage';
import Optimistic from '@/components/Optimistic';
import { useReducer } from 'react';

export default function Home() {
  const [state] = useReducer((state, action) => {
    return state;
  }, {});

  return (
    <div className="flex-center-col w-2/3 border border-black p-2">
      <LocalStorage keyName="name" initialValue={''} />
      <Data />
      <Optimistic />
    </div>
  );
}

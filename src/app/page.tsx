'use client';

import LocalStorage from '@/components/LocalStorage';
import { useReducer } from 'react';

export default function Home() {
  const [state] = useReducer((state, action) => {
    return state;
  }, {});

  return (
    <div className="flex-center-col w-2/3 border border-black p-2">
      <LocalStorage keyName="name" initialValue={''} />
    </div>
  );
}

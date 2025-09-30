'use client';

import Counter from '@/components/Counter';
import Todos from '@/components/Todos';
import { todoClient } from '@/redux/todoQueries';
import { cn } from '@/utils/util';
import { QueryClientProvider } from '@tanstack/react-query';

export default function Home() {
  return (
    <div
      className={cn(
        'flex max-w-[700px] flex-col items-center gap-4 p-4',
        'mt-4 ml-4 bg-amber-50',
        'drop-shadow-md drop-shadow-neutral-700'
      )}
    >
      <Counter />
      <QueryClientProvider client={todoClient}>
        <Todos />
      </QueryClientProvider>
    </div>
  );
}

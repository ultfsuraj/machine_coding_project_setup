import Counter from '@/components/Counter';
import { cn } from '@/utils/util';

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
    </div>
  );
}

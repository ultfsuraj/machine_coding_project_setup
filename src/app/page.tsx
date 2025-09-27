import { cn } from '@/utils/util';

export default function Home() {
  return (
    <div
      className={cn(
        'flex h-20 w-20 items-center justify-center',
        'm-auto mt-4 bg-amber-50',
        'drop-shadow-md drop-shadow-neutral-700'
      )}
    >
      Home
    </div>
  );
}

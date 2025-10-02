import InfiniteImage from '@/components/InfiniteImage';

export default function Home() {
  return (
    <div className="mt-8 ml-6 w-[700px] bg-amber-50 p-8">
      <InfiniteImage bunch={4} />
    </div>
  );
}

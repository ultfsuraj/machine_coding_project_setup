'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useInView } from 'react-intersection-observer';

const InfiniteImage = ({ bunch = 3 }: { bunch?: number }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { ref, inView, entry } = useInView({
    root: containerRef.current,
    triggerOnce: true,
    rootMargin: '0px 0px -100px 0px',
    threshold: 0.1,
  });
  const [refIndex, setRefIndex] = useState<number>(bunch - 2);

  useEffect(() => {
    setRefIndex((prev) => prev + 4);
    console.log(entry);
  }, [inView]);

  return (
    <div
      ref={containerRef}
      className="flex h-[500px] w-1/2 flex-col items-center gap-6 overflow-x-hidden overflow-y-scroll bg-neutral-800 p-4"
    >
      {Array.from({ length: refIndex + 2 }, (_, index) => (
        <img
          ref={index == refIndex ? ref : null}
          key={index}
          className="h-[300px] w-[200px]"
          src={`https://picsum.photos/id/${index * 7}/200/300`}
        />
      ))}
    </div>
  );
};

export default InfiniteImage;

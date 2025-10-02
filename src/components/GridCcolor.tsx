'use client';

import { cn } from '@/utils/util';
import { useEffect, useState } from 'react';

const GridCcolor = ({ size = 3 }: { size?: number }) => {
  // 2d array
  const [colorMap, setColorMap] = useState<Array<Array<boolean>>>(() =>
    Array.from({ length: size }, () => Array.from({ length: size }, () => false))
  );
  const [order, setOrder] = useState<number[]>([]);
  const [remove, setRemove] = useState<boolean>(false);

  useEffect(() => {
    if (remove) {
      order.forEach((o, index) => {
        setTimeout(
          () => {
            setColorMap((prev) => {
              const newMap = [...prev];
              newMap[Math.floor(o / size)][o % size] = false;
              return newMap;
            });
          },
          (size * size - index) * 500
        );
      });
      setTimeout(
        () => {
          setRemove(false);
          setOrder([]);
        },
        size * size * 500
      );
    }
  }, [remove]);

  useEffect(() => {
    console.log(order.length);
    if (order.length === size * size) {
      setRemove(true);
    }
  }, [order]);

  return (
    <div
      className={cn('grid justify-items-center gap-2 bg-black p-2', `grid-cols-${size}`)}
      style={{ gridTemplateColumns: Array.from({ length: size }, () => 'max-content').join(' ') }}
    >
      {Array.from({ length: size * size }, (_, index) => (
        <div
          key={index}
          className={cn(
            'h-12 w-12 border',
            colorMap[Math.floor(index / size)][index % size]
              ? 'bg-amber-300'
              : 'border-neutral-400 bg-transparent',
            remove ? 'pointer-events-none' : ''
          )}
          onClick={() => {
            if (!colorMap[Math.floor(index / size)][index % size]) {
              setOrder((prev) => [...prev, index]);
              setColorMap((prev) => {
                const newMap = [...prev];
                newMap[Math.floor(index / size)][index % size] = true;
                return newMap;
              });
            }
          }}
        ></div>
      ))}
    </div>
  );
};

export default GridCcolor;

'use client';

import { cn } from '@/utils/util';
import { useRef, useState } from 'react';

const OTP = ({ digits = 4 }: { digits?: number }) => {
  const [values, setValues] = useState<number[]>(() => Array.from({ length: digits }, () => -1));
  const containerRef = useRef<HTMLDivElement>(null);
  const inputs = containerRef.current?.querySelectorAll('input');

  return (
    <div ref={containerRef} className="flex gap-2 bg-neutral-800 p-4">
      {Array.from({ length: digits }, (_, index) => (
        <input
          key={index}
          type="number"
          value={values[index] >= 0 && values[index] <= 9 ? values[index] : ''}
          min={0}
          max={9}
          maxLength={1}
          onChange={() => {}}
          onKeyDown={(e) => {
            console.log('pressed', e.key);

            if (e.key == 'Backspace') {
              setValues((prev) => {
                return [...prev].fill(-1, index);
              });
              if (inputs && inputs[index - 1]) {
                inputs[index - 1].focus();
              }
            } else if (+e.key >= 0 && +e.key <= 9) {
              setValues((prev) => {
                const updated = [...prev];
                updated[index] = +e.key;
                return updated;
              });
              if (inputs && inputs[index + 1]) {
                inputs[index + 1].focus();
              }
            }
          }}
          className={cn(
            '[appearance:textfield] border-2 bg-neutral-100 p-2 text-center outline-none focus:border-amber-300 focus:outline-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0'
          )}
        />
      ))}
    </div>
  );
};

export default OTP;

'use client';

import React, { useState } from 'react';
import { Star } from 'lucide-react';

const StarRating = ({ count = 5, selected = -1 }: { count?: number; selected?: number }) => {
  const [rating, setRating] = useState<number>(selected);
  const [hoverIndex, setHoverIndex] = useState<number>(-1);

  return (
    <div className="flex p-4">
      {Array.from({ length: count }, (_, index) => (
        <div
          key={index}
          className="p-1"
          onClick={() => {
            setRating(index);
          }}
          onMouseLeave={() => {
            setHoverIndex(-1);
          }}
          onMouseEnter={() => {
            setHoverIndex(index);
          }}
        >
          <Star
            fill={
              hoverIndex >= 0
                ? index <= hoverIndex
                  ? 'yellow'
                  : 'black'
                : index <= rating
                  ? 'yellow'
                  : 'black'
            }
          />
        </div>
      ))}
    </div>
  );
};

export default StarRating;

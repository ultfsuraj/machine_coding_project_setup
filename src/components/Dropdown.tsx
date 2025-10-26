'use client';

import { cn } from '@/utils/util';
import { useEffect, useRef, useState } from 'react';

const Dropdown = ({
  searchTerm = '',
  searchResults = [],
  onChange = () => {},
  onSelect = () => {},
}: {
  searchTerm?: string;
  searchResults?: { id: string | number; name: string }[];
  onChange?: (label: string) => void;
  onSelect?: (items: (string | number)[]) => void;
}) => {
  const [internalvalue, setInternalValue] = useState<string>(searchTerm);
  const [selectedItems, setSelectedItems] = useState<(string | number)[]>([]);
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const containerRef = useRef<HTMLUListElement | null>(null);
  const optionsRefs = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    onChange(internalvalue);
  }, [internalvalue]);

  useEffect(() => {
    onSelect(selectedItems);
  }, [selectedItems]);

  // useEffect(() => {
  //   optionsRefs.current = containerRef.current?.children;
  // }, searchResults);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      const nextIndex = (highlightedIndex + 1) % searchResults.length;
      setHighlightedIndex(nextIndex);
      optionsRefs.current[nextIndex]?.focus();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      const prevIndex = (highlightedIndex - 1 + searchResults.length) % searchResults.length;
      setHighlightedIndex(prevIndex);
      optionsRefs.current[prevIndex]?.focus();
    }
  };

  return (
    <div className="flex w-full flex-col gap-4 bg-white px-4 py-2" tabIndex={0}>
      {/* search input */}
      <input
        type="text"
        placeholder="serach..."
        className="w-full border-none px-2 py-1 focus:outline-none"
        onChange={(e) => setInternalValue(e.target.value)}
        value={internalvalue}
      />
      {/* dropdown */}
      {searchResults.length > 0 && (
        <ul
          role="listbox"
          className="flex w-full flex-col gap-2 px-4 py-1"
          onKeyDown={onKeyDown}
          ref={containerRef}
        >
          {searchResults?.map(({ id, name: value }, index) => {
            return (
              <li
                role="option"
                // ref={(el) => (optionsRefs.current[index] = el)}
                aria-selected={selectedItems.includes(id)}
                className={cn(
                  'w-full px-2 py-1',
                  selectedItems.includes(id) ? 'bg-neutral-200' : 'bg-white'
                )}
                key={id}
                tabIndex={index == 0 ? 0 : -1}
                onClick={() =>
                  setSelectedItems((prevItems) => {
                    // toggle selection
                    if (prevItems.includes(id)) {
                      return prevItems.filter((item) => item !== id);
                    } else {
                      return [...prevItems, id];
                    }
                  })
                }
              >
                {value}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;

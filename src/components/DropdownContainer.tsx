'use client';

import Dropdown from '@/components/Dropdown';
import { useEffect, useState } from 'react';

const DropdownContainer = () => {
  const [search, setSearch] = useState<string>('');
  const [selectedItems, setSelectedItems] = useState<(string | number)[]>([]);
  const [cachedResults, setCachedResults] = useState<
    Record<string, { id: string | number; name: string }[]>
  >({});

  useEffect(() => {
    if (search.trim().length && !cachedResults[search]) {
      const timer = setTimeout(() => {
        fetch('https://dummyjson.com/recipes/search?q=' + search.trim() + '&select=name,id')
          .then((res) => res.json())
          .then((data) => {
            setCachedResults((prevCache) => ({
              ...prevCache,
              [search]: data.recipes,
            }));
          });
      }, 300);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [search]);

  useEffect(() => {
    console.log('selected items', selectedItems);
  }, [selectedItems]);

  useEffect(() => {
    console.log('cached results ', cachedResults);
  }, [cachedResults]);

  return (
    <div className="mt-10 ml-20 w-[400px] border border-black bg-neutral-800 px-4 py-2">
      <Dropdown
        searchTerm={search}
        searchResults={cachedResults[search]}
        onChange={(label) => {
          setSearch(label);
        }}
        onSelect={(items) => {
          setSelectedItems((prev) => [...prev, ...items]);
        }}
      />
    </div>
  );
};

export default DropdownContainer;

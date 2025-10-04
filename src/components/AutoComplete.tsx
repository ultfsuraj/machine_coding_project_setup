'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';

const AutoComplete = () => {
  const [search, setSearch] = useState<string>('');
  const [cache, setCache] = useState<Record<string, string[]>>({});
  const [results, setResults] = useState<string[]>([]);

  const storeKey = 'autocomplete';

  useEffect(() => {
    const val = localStorage.getItem(storeKey);
    const record = JSON.parse(val || '{}');
    setCache(record);
    console.log(record);
  }, []);

  useEffect(() => {
    localStorage.setItem(storeKey, JSON.stringify(cache));
  }, [cache]);

  useEffect(() => {
    let timer = null;

    if (cache[search]) {
      setResults(cache[search]);
    } else {
      timer = setTimeout(() => {
        if (search.trim().length > 0)
          axios
            .get(`https://dummyjson.com/recipes/search?q=${search.trim()}&select=name`)
            .then((res) => {
              const results = res.data.recipes.map((item) => item.name);
              setResults(results);
              setCache((prev) => ({ ...prev, [search]: results }));
            })
            .catch((e) => {});
        else setResults([]);
      }, 300);
    }

    return () => clearTimeout(timer);
  }, [search]);

  return (
    <div className="w-4/5 bg-neutral-800 p-2">
      <input
        className="w my-4 w-full bg-white px-3 py-2 focus:outline-none"
        type="text"
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
        }}
      />
      <div className="max-h-[400px] overflow-scroll">
        {results.map((result, index) => (
          <p key={index} className="my-1 bg-amber-50 px-2 py-1 hover:bg-amber-100">
            {result}
          </p>
        ))}
      </div>
    </div>
  );
};

export default AutoComplete;

import { Dispatch, SetStateAction, useDebugValue, useEffect, useState } from 'react';

function getInitialValue(initialValue: string | (() => string)) {
  if (initialValue instanceof Function) {
    return initialValue();
  }
  return String(initialValue);
}

export function useLocalStorage(key: string, initialValue: string | (() => string)) {
  const [value, setValue] = useState(() => getInitialValue(initialValue));
  // see on right side of component that uses it in dev tools
  useDebugValue({ [key]: value });

  useEffect(() => {
    localStorage.setItem(key, value);
  }, [value]);

  return [value, setValue] as [string, Dispatch<SetStateAction<string>>];
}

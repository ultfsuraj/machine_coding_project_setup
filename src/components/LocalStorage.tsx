import Button from '@/components/Button';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { useDeferredValue, useEffect, useRef } from 'react';

const LocalStorage = ({
  keyName,
  initialValue,
}: {
  keyName: string;
  initialValue: string | (() => string);
}) => {
  const [localName, setLocalName] = useLocalStorage(keyName, initialValue);
  const inputRef = useRef<HTMLInputElement | null>(null);
  //   const deferredLocalName = useDeferredValue(localName);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetch('https://dummyjson.com/users/?limit=' + localName.length)
        .then((res) => res.json())
        .then(console.log);
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [localName]);

  //   useEffect(() => {
  //     fetch('https://dummyjson.com/users/?limit=' + deferredLocalName.length)
  //       .then((res) => res.json())
  //       .then(console.log);
  //   }, [deferredLocalName]);

  return (
    <div className="w-full">
      <form className="flex items-center justify-around">
        {keyName}
        <fieldset className="w-1/3 border border-neutral-600 px-2 py-1">
          <legend className="px-2">value</legend>
          <input
            onChange={() => {
              setLocalName(inputRef?.current?.value || '');
            }}
            ref={inputRef}
            type="text"
            className="outline:none w-full focus:outline-none"
          />
        </fieldset>
        <Button
          type="submit"
          size={'small'}
          intent={'danger'}
          onClick={(e) => {
            e.preventDefault();
            setLocalName(inputRef?.current?.value || '');
          }}
        >
          Save
        </Button>
      </form>
      <div className="w-full">{}</div>
    </div>
  );
};

export default LocalStorage;

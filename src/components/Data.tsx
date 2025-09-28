'use client';

import Button from '@/components/Button';
import ErrorBoundary from '@/components/ErrorBoundary';
import { Suspense, use, useEffect, useRef, useState } from 'react';

const Data = () => {
  // const [details, setDetails] = useState<string>('users')

  const [data, setData] = useState<object>({});
  const inputRef = useRef<HTMLInputElement | null>(null);

  function submitHandler(formData: FormData) {
    const details = formData.get('details');
    fetch('https://dummyjson.com/' + details + '/?limit=5')
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((e) => console.log(e));
  }

  return (
    <form action={submitHandler} className="flex-center-col w-full border border-neutral-500 p-4">
      <fieldset className="borde-neutral-600 flex w-full items-center justify-around border px-2 py-1">
        <legend className="px-2">Resource Name</legend>
        <input
          placeholder="users"
          ref={inputRef}
          type="text"
          name="details"
          className="w-2/3 border-none px-2 outline-none focus:outline-none"
        />
        <Button
          type="submit"
          intent={'primary'}
          size={'small'}
          // onClick={() => {
          //   setDetails(inputRef.current?.value || '');
          // }}
        >
          Get Details
        </Button>
      </fieldset>
      <ErrorBoundary
        fallback={<div className="font-bold text-red-700">Something went wrong !</div>}
      >
        <Suspense fallback={<div>Loading...</div>}>
          {/* <Show details={details} /> */}
          <Show data={data} />
        </Suspense>
      </ErrorBoundary>
    </form>
  );
};

export default Data;

// function Show({ details }: { details: string }) {
//   console.log(details);
//   let data = {};
//   data = use(fetch('https://dummyjson.com/' + details + '/?limit=5').then((res) => res.json()));

//   return (
//     <pre className="max-h-[400px] w-full overflow-auto overflow-x-hidden">
//       {JSON.stringify(data, null, 2)}
//     </pre>
//   );
// }

function Show({ data = {} }: { data: object }) {
  return (
    <pre className="max-h-[400px] w-full overflow-auto overflow-x-hidden">
      {JSON.stringify(data, null, 2)}
    </pre>
  );
}

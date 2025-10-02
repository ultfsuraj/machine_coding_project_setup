'use client';

import TabContextProvider, { formData, TabContext } from '@/containers/TabContextProvider';
import Profile from '@/containers/Profile';
import Education from '@/containers/Education';
import Experience from '@/containers/Experience';
import React, { useContext, useState } from 'react';
import { cn } from '@/utils/util';

const ComponentMap: Array<{
  name: keyof formData;
  component: typeof Profile | typeof Education | typeof Experience;
}> = [
  { name: 'profile', component: Profile },
  { name: 'education', component: Education },
  { name: 'experience', component: Experience },
];

const SlotManager = () => {
  const { data } = useContext(TabContext);
  const [activeId, setActiveId] = useState<number>(0);
  const [newActiveId, setNewActiveId] = useState<number>(0);
  const [validate, setValidate] = useState<boolean>(false);
  const SlotComponent = ComponentMap[activeId].component;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-6 p-2">
        {ComponentMap.map(({ name }, index) => (
          <p
            key={index}
            className={cn('cursor-pointer p-2', index == activeId ? 'bg-neutral-300' : '')}
            onClick={() => setActiveId(index)}
          >
            {name}
          </p>
        ))}
      </div>
      {<SlotComponent validate={validate} newActiveId={newActiveId} />}
      <div className="flex gap-6 p-2">
        {activeId > 0 && (
          <button
            onClick={() => {
              // setValidate(true);
              // setNewActiveId(activeId - 1);
              setActiveId((prev) => prev - 1);
            }}
          >
            Prev
          </button>
        )}

        {activeId < ComponentMap.length - 1 && (
          <button
            onClick={() => {
              // setValidate(true);
              // setNewActiveId(activeId - 1);
              setActiveId((prev) => prev + 1);
            }}
          >
            Next
          </button>
        )}
        {activeId == ComponentMap.length - 1 && (
          <button
            onClick={() => {
              // check if validate then submit form data, not change in active id
              console.log('form data ', data);
            }}
          >
            Submit
          </button>
        )}
      </div>
    </div>
  );
};

const TabForm = () => {
  return (
    <TabContextProvider>
      <SlotManager />
    </TabContextProvider>
  );
};

export default TabForm;

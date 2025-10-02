'use client';

import { TabContext } from '@/containers/TabContextProvider';
import { useContext } from 'react';

const Education = ({ validate, newActiveId }: { validate: boolean; newActiveId: number }) => {
  const { setEducationData } = useContext(TabContext);

  return (
    <form>
      <input
        className="border border-black"
        type="text"
        name="education"
        onChange={(e) => {
          if (setEducationData) setEducationData({ education: e.target.value });
        }}
      />
    </form>
  );
};

export default Education;

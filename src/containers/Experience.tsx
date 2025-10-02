'use client';

import { TabContext } from '@/containers/TabContextProvider';
import { useContext } from 'react';

const Experience = ({ validate, newActiveId }: { validate: boolean; newActiveId: number }) => {
  const { setExperienceData } = useContext(TabContext);

  return (
    <form>
      <input
        className="border border-black"
        type="text"
        name="education"
        onChange={(e) => {
          if (setExperienceData) setExperienceData({ education: e.target.value });
        }}
      />
    </form>
  );
};

export default Experience;

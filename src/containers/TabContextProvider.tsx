'use client';

import { createContext, useState } from 'react';

export type formData = {
  profile: object;
  education: object;
  experience: object;
};

type contextType = {
  data: formData;
  setProfileData?: (data: formData['profile']) => void;
  setEducationData?: (data: formData['education']) => void;
  setExperienceData?: (data: formData['experience']) => void;
};

const dummyData: formData = {
  profile: {},
  education: {},
  experience: {},
};

export const TabContext = createContext<contextType>({ data: dummyData });

const TabContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [data, setData] = useState<formData>(dummyData);

  const setProfileData = (profileData: formData['profile']) => {
    setData((prev) => {
      const newData = { ...prev };
      newData['profile'] = profileData;
      return newData;
    });
  };
  const setEducationData = (educationData: formData['education']) => {
    setData((prev) => {
      const newData = { ...prev };
      newData['education'] = educationData;
      return newData;
    });
  };
  const setExperienceData = (experienceData: formData['experience']) => {
    setData((prev) => {
      const newData = { ...prev };
      newData['experience'] = experienceData;
      return newData;
    });
  };

  return (
    <TabContext.Provider value={{ data, setProfileData, setEducationData, setExperienceData }}>
      {children}
    </TabContext.Provider>
  );
};

export default TabContextProvider;

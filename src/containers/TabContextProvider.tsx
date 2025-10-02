'use client';

import { createContext, useState } from 'react';

type formData = {
  profile: object;
  education: object;
  experience: object;
};

type contextType = {
  data: formData | undefined;
  setProfileData: (data: formData['profile']) => void;
  setEducationData: (data: formData['education']) => void;
  setExperienceData: (data: formData['experience']) => void;
};

export const TabContext = createContext<contextType | undefined>(undefined);

const TabContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [data, setData] = useState<formData>();

  const setProfileData = (profileData: formData['profile']) => {
    setData((prev) => {
      const newData = { ...prev };
      newData['profile'] = profileData;
      return newData as formData | undefined;
    });
  };
  const setEducationData = (educationData: formData['education']) => {
    setData((prev) => {
      const newData = { ...prev };
      newData['education'] = educationData;
      return newData as formData | undefined;
    });
  };
  const setExperienceData = (experienceData: formData['experience']) => {
    setData((prev) => {
      const newData = { ...prev };
      newData['experience'] = experienceData;
      return newData as formData | undefined;
    });
  };

  return (
    <TabContext.Provider value={{ data, setProfileData, setEducationData, setExperienceData }}>
      {children}
    </TabContext.Provider>
  );
};

export default TabContextProvider;

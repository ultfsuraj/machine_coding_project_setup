'use client';

import { TabContext } from '@/containers/TabContextProvider';
import { useContext } from 'react';

const Profile = ({ validate, newActiveId }: { validate: boolean; newActiveId: number }) => {
  const { setProfileData } = useContext(TabContext);

  return (
    <form>
      <input
        className="border border-black"
        type="text"
        name="profile"
        onChange={(e) => {
          if (setProfileData) setProfileData({ profile: e.target.value });
        }}
      />
    </form>
  );
};

export default Profile;

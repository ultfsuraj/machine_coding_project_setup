'use client';

import TabContextProvider from '@/containers/TabContextProvider';

const SlotManager = () => {
  return <div className=""></div>;
};

const TabForm = () => {
  return (
    <TabContextProvider>
      <TabForm />
    </TabContextProvider>
  );
};

export default TabForm;

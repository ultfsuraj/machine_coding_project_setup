'use client';

import Notification from '@/components/Notification';

export default function Home() {
  return (
    <div className="mt-8 ml-6 bg-amber-50 p-8">
      <Notification text="Aravind Srinivas leads Perplexity" size={'small'} animation="pop" />
      <Notification
        text="Aravind Srinivas leads Perplexity"
        size={'small'}
        type="warning"
        animation="pop"
      />
      <Notification text="Aravind Srinivas leads Perplexity" size={'small'} type={'error'} />
      <Notification text="Aravind Srinivas leads Perplexity" size={'small'} type={'success'} />
    </div>
  );
}

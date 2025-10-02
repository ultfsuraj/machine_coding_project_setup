import React from 'react';

type comments = Record<
  number,
  {
    id: number;
    title: string;
    parentId: number | null;
    replyIds: Set<number> | null;
  }
>;

const Comments = () => {
  return <div>Comments</div>;
};

export default Comments;

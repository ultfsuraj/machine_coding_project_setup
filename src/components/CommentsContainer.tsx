'use client';

import Comments, { CommentType } from '@/components/Comments';
import { useCallback, useState } from 'react';
import { nanoid } from 'nanoid';
import { cn } from '@/utils/util';

const data: CommentType[] = [
  { id: nanoid(), title: 'that was amazing', parentId: null, replyIds: [] },
  { id: nanoid(), title: 'bro is afraid of nothing', parentId: null, replyIds: [] },
];

const CommentsContainer = () => {
  const [comments, setComments] = useState<Record<CommentType['id'], CommentType>>(() =>
    data.reduce((acc: Record<CommentType['id'], CommentType>, comment) => {
      acc[comment.id] = comment;
      return acc;
    }, {})
  );
  const [rootCommentIds, setRootCommentIds] = useState<CommentType['replyIds']>(() =>
    data.filter(({ parentId }) => !parentId).map(({ id }) => id)
  );
  const [replyId, setReplyId] = useState<string | null>(null);

  function deleteId(id: string) {
    setComments((prev) => {
      const newComments = { ...prev };
      const parentId = newComments[id].parentId;
      if (parentId) {
        newComments[parentId].replyIds = newComments[parentId].replyIds.filter(
          (replyId) => replyId != id
        );
      } else {
        setRootCommentIds((prev) => prev.filter((replyId) => replyId != id));
      }
      return newComments;
    });
  }

  console.log(comments);
  console.log(rootCommentIds);

  // instead of function submitHandler... some issue with reference, state updates repeat somehow

  const submitHandler = useCallback(
    (data: FormData) => {
      console.log('submitted');
      const comment: CommentType = {
        id: nanoid(),
        title: data.get('title') as string,
        parentId: replyId,
        replyIds: [],
      };

      const newComments = { ...comments, [comment.id]: comment };

      if (replyId) {
        newComments[replyId].replyIds.push(comment.id);
      } else {
        setRootCommentIds((prev) => [...prev, comment.id]);
      }

      setComments(newComments);

      //   setComments((prev) => {
      //     //   const newComments = { ...prev, [comment.id]: comment };
      //     console.log('pushed'); // this happened twice without useCallback and even if removing setRootCommentIds to outside
      //     const newComments = { ...prev };
      //     newComments[comment.id] = comment;

      //     if (replyId) {
      //       newComments[replyId].replyIds.push(comment.id);
      //     }
      //     //   else {
      //     //     setRootCommentIds((prev) => [...prev, comment.id]);
      //     //   }
      //     return newComments;
      //   });

      //   //   if (!replyId) setRootCommentIds((prev) => [...prev, comment.id]);

      setReplyId(null);
    },
    [comments, replyId]
  );

  return (
    <div className="flex w-full flex-col items-center">
      <button
        className="self-start bg-black px-3 py-1 text-lg font-bold text-white"
        onClick={() => {
          setReplyId(null);
        }}
      >
        Add New Comment
      </button>
      <div className="max-h-[400px] w-full overflow-scroll p-2">
        <Comments
          comments={comments}
          replyIds={rootCommentIds}
          setReplyId={(id: CommentType['id']) => setReplyId(id)}
          deleteId={deleteId}
        />
      </div>
      <form
        // action={submitHandler}
        onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.currentTarget);
          submitHandler(formData);
          e.currentTarget.reset();
        }}
        className={cn(
          'flex w-full justify-between bg-neutral-400 p-2',
          replyId ? 'drop-shadow-lg drop-shadow-amber-800' : ''
        )}
      >
        <input type="text" className="w-2/3 bg-white px-2 py-1 focus:outline-none" name="title" />
        <button className="bg-black px-2 py-1 text-white" type="submit">
          Add Comment
        </button>
      </form>
    </div>
  );
};

export default CommentsContainer;

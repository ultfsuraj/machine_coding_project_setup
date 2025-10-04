'use client';

export type CommentType = {
  id: string;
  title: string;
  parentId: string | null;
  replyIds: string[];
};

const Comments = ({
  comments,
  replyIds,
  setReplyId,
  deleteId,
}: {
  comments: Record<CommentType['id'], CommentType>;
  replyIds: CommentType['replyIds'];
  setReplyId: (id: CommentType['id']) => void;
  deleteId: (id: string) => void;
}) => {
  return (
    <div className="flex w-full flex-col py-1">
      {replyIds.map((id) => (
        <div key={id} className="">
          <div className="flex justify-between py-1 hover:bg-amber-100">
            <p className="">{comments[id].title}</p>
            <div className="">
              <button className="px-2 text-cyan-700" onClick={() => setReplyId(id)}>
                Reply
              </button>
              <button className="px-2 text-red-800" onClick={() => deleteId(id)}>
                Delete
              </button>
            </div>
          </div>
          {comments[id].replyIds.length > 0 && (
            <div className="border-l border-neutral-500 pl-4">
              <Comments
                comments={comments}
                replyIds={comments[id].replyIds || []}
                setReplyId={setReplyId}
                deleteId={deleteId}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Comments;

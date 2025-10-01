'use client';

import { useDeletePostMutation, useGetPostByIdQuery, useGetPostsQuery } from '@/redux/postApi';
import { useState } from 'react';

const Posts = () => {
  const [id, setId] = useState<number>(0);
  const { data, error, isFetching, refetch: refreshAll } = useGetPostsQuery(undefined);
  const [deletePost, { isLoading: deleting, error: deleteError }] = useDeletePostMutation();
  const { data: post, isLoading, isError, refetch: refetchPost } = useGetPostByIdQuery(id);

  return (
    <div className="flex min-h-[200px] w-full flex-col items-center gap-4 overflow-auto bg-neutral-800 px-4 py-4">
      <h2 className="w-full text-center text-xl font-bold text-white">
        CreteApi Posts
        <button className="bg-amber-800 px-2 py-1 text-base" onClick={() => refreshAll()}>
          Refresh
        </button>
      </h2>
      <div className="flex h-[300px] flex-col items-center gap-4 overflow-auto">
        {isFetching ? (
          <p className="text-white">Loading Posts</p>
        ) : error ? (
          <p className="bg-amber-50 text-amber-700">something went wrong</p>
        ) : data ? (
          data.map(({ id, title }) => (
            <div
              key={id}
              className="flex w-full items-center justify-between bg-amber-50 px-2 py-1 drop-shadow-md"
            >
              <p className="max-w-[80%]">{title}</p>
              <button
                className="bg-amber-900 px-2 py-1 text-white hover:bg-amber-700"
                onClick={() => {
                  deletePost(id)
                    .unwrap()
                    .then((data) => console.log('deleted', data));
                }}
              >
                Delete
              </button>
            </div>
          ))
        ) : null}
      </div>
      <div className="min-h-[200px] w-full">
        <div className="mb-6 flex w-full items-center justify-around bg-amber-50 p-2">
          <input
            type="number"
            className="w-2/3 border border-black px-2 py-1"
            onChange={(e) => {
              setId(+e.target.value);
            }}
          />
          <button
            className="bg-amber-900 px-2 py-1 text-white"
            onClick={() => {
              refetchPost();
            }}
          >
            Get Post
          </button>
        </div>
        {post && (
          <div className="flex w-full items-center justify-between bg-amber-50 px-2 py-1 drop-shadow-md">
            <p className="max-w-[80%]">{post.title}</p>
            <button
              className="bg-amber-900 px-2 py-1 text-white hover:bg-amber-700"
              onClick={() => {
                deletePost(id);
              }}
            >
              Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Posts;

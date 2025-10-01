import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const postApi = createApi({
  reducerPath: 'postApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://dummyjson.com',
    prepareHeaders: (header) => {
      header.set('X-Custom-Header', 'Custom value');
      return header;
    },
  }),
  tagTypes: ['posts'],
  endpoints: (builder) => ({
    getPosts: builder.query({
      query: (limit) => (limit > 0 ? `/posts?limit=${limit}` : '/posts'),
      keepUnusedDataFor: 300,
      transformResponse: (data) => {
        console.log('fetched posts ', data);
        return data.posts;
      },
      providesTags: (result) =>
        result
          ? [...result.map(({ id }) => ({ id, type: 'posts' })), { id: 'LIST', type: 'posts' }]
          : [{ id: 'LIST', type: 'posts' }],
    }),

    getPostById: builder.query({
      query: (id) => `/posts/${id}`,
      keepUnusedDataFor: 300,
      providesTags: (result, error, id) => [{ type: 'posts', id }],
    }),

    updatePost: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/posts/${id}`,
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: data,
      }),
      invalidatesTags: (result, error, id) => [{ type: 'posts', id }],
    }),

    deletePost: builder.mutation({
      query: (id) => ({
        url: `/posts/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, id) => [{ type: 'posts', id: 'LIST' }],
    }),
  }),
});

export const {
  useGetPostsQuery,
  useGetPostByIdQuery,
  useUpdatePostMutation,
  useDeletePostMutation,
} = postApi;

'use client';

import { deleteTodo, fetchTodoById, fetchTodos, todoClient } from '@/redux/todoQueries';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';

type Todo = {
  id: string | number;
  todo: string;
  completed: boolean;
};

const Todos = () => {
  const todoClient = useQueryClient();
  const [id, setId] = useState<number>(0);

  const {
    data,
    isFetching,
    isPending,
    error,
    refetch: fetchAllTodos,
  } = useQuery(
    {
      queryKey: ['todos'],
      queryFn: fetchTodos,
      refetchOnMount: true,
      staleTime: 5000,
      select: (data) => {
        console.log('fetched todos', data.todos);
        return data.todos.map(({ id, todo, completed }) => ({ id, todo, completed }));
      },
      enabled: false,
    }
    // todoClient
  );

  const todoId = useQuery({
    queryKey: ['todos', id],
    queryFn: () => fetchTodoById(id),
    // enabled: !!id,
    enabled: false,
    staleTime: 1000,
  });

  const { mutate: deleteTodoById } = useMutation({
    mutationFn: deleteTodo,
    onSuccess: (data) => {
      console.log('successfully deleted todo ', data);
      todoClient.invalidateQueries();
    },
    onError: (error) => {
      console.log(error.message);
    },
  });

  return (
    <div className="flex min-h-[200px] w-full flex-col items-center gap-4 overflow-auto bg-neutral-800 px-4 py-4">
      <h2 className="w-full text-center text-xl font-bold text-white">
        Tanstack Query Todos{' '}
        <button className="bg-amber-800 px-2 py-1 text-base" onClick={() => fetchAllTodos()}>
          Refresh
        </button>
      </h2>
      <div className="flex h-[300px] flex-col items-center gap-4 overflow-auto">
        {isFetching || isPending ? (
          <p className="text-white">Loading Todos</p>
        ) : error ? (
          <p className="bg-amber-50 text-amber-700">{error.message}</p>
        ) : data ? (
          data.map(({ id, todo }: Todo) => (
            <div
              key={id}
              className="flex w-full items-center justify-between bg-amber-50 px-2 py-1 drop-shadow-md"
            >
              <p className="max-w-[80%]">{todo}</p>
              <button
                className="bg-amber-900 px-2 py-1 text-white hover:bg-amber-700"
                onClick={() => {
                  deleteTodoById(id);
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
              todoId.refetch();
            }}
          >
            Get Todo
          </button>
        </div>
        {todoId.data && (
          <div className="flex w-full items-center justify-between bg-amber-50 px-2 py-1 drop-shadow-md">
            <p className="max-w-[80%]">{todoId.data.todo}</p>
            <button
              className="bg-amber-900 px-2 py-1 text-white hover:bg-amber-700"
              onClick={() => {
                deleteTodoById(todoId.data.id);
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

export default Todos;

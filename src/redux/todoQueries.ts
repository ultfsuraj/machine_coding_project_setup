import axios from 'axios';
import { QueryClient } from '@tanstack/react-query';

export const todoClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5000,
      retry: 3,
    },
  },
});

const todoBaseUrl = 'https://dummyjson.com';

export const fetchTodos = async () => {
  const res = await axios.get(todoBaseUrl + '/todos');
  if (!res.data) {
    throw new Error("Couldn't fetch Todos");
  }
  return res.data;
};

export const fetchTodoById = async (id: number | string) => {
  const res = await axios.get(todoBaseUrl + '/todos/' + id);
  if (!res.data) {
    throw new Error("Couldn't fetch Todo " + id);
  }
  return res.data;
};

export const updateTodo = async (id: number | string, data: object) => {
  const res = await axios.put(todoBaseUrl + '/todos/' + id, data, {
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!res.data) {
    throw new Error(`Couldn't update Todo ${id} with `, data);
  }
  return res.data;
};

export const deleteTodo = async (id: number | string) => {
  const res = await axios.delete(todoBaseUrl + '/todos/' + id);
  if (!res.data) {
    throw new Error(`Couldn't delete Todo ${id} with `);
  }
  return res.data;
};

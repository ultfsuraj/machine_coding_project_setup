import Button from '@/components/Button';
import { useOptimistic, useState } from 'react';

type Todo = {
  id: string;
  title: string;
};

async function createNewTodo(title: string, id: number): Promise<Todo> {
  //   try {
  //     await new Promise((res, rej) => setTimeout(() => rej(''), 2000));
  //   } catch (e) {}
  await new Promise((res) => setTimeout(() => res(''), 2000));
  return { id: '#' + id, title };
}

const Optimistic = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [optimisticTodos, setOptimisticTodos] = useOptimistic(todos);

  async function submitHandler(formData: FormData) {
    const title = formData.get('title') as string;
    if (title.trim().length == 0) return;

    setOptimisticTodos((prev) => [...prev, { id: '' + todos.length, title: title + ' to be' }]);
    const newTodo = await createNewTodo(title, todos.length);
    setTodos((prev) => [...prev, newTodo]);
  }

  return (
    <div className="flex-center-col w-full">
      <form action={submitHandler} className="flex w-full items-center justify-around">
        <fieldset className="borde-neutral-600 flex w-full items-center justify-around border px-2 py-1">
          <legend className="px-2">Resource Name</legend>
          <input
            type="text"
            name="title"
            className="w-2/3 border-none px-2 outline-none focus:outline-none"
          />
          <Button type="submit" intent={'primary'} size={'small'} onClick={() => {}}>
            Add Todo
          </Button>
        </fieldset>
      </form>
      {optimisticTodos.map(({ title, id }) => (
        <p key={id} className="px=6 py=2">
          {title}
        </p>
      ))}
    </div>
  );
};

export default Optimistic;

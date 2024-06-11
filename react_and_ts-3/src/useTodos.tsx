import { useCallback, useEffect } from "react";
import { createGlobalState } from "react-use";

interface Todo {
  id: number;
  done: boolean;
  text: string;
}

const useGlobalTodos = createGlobalState<Todo[]>([]);

export function useTodos(initialTodos: Todo[]): {
  todos: Todo[];
  addTodo: (text: string) => void;
  removeTodo: (id: number) => void;
} {
  const [todos, setTodos] = useGlobalTodos();

  // Initialize todos with initialTodos if not already initialized
  useEffect(() => {
    setTodos(initialTodos);
  }, [initialTodos, setTodos]);

  const addTodo = useCallback((text: string) => {
    setTodos((todos) => [
      ...todos,
      {
        id: todos.length,
        text: text,
        done: false,
      },
    ]);
  }, [setTodos]);

  const removeTodo = useCallback((removeId: number) => {
    setTodos((todos) => todos.filter(({ id }) => id !== removeId));
  }, [setTodos]);

  return { todos, addTodo, removeTodo };
}

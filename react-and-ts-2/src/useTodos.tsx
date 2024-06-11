import { createContext, useCallback, useContext, useReducer } from "react";
// Interface for Todo items
interface Todo {
  id: number;
  done: boolean;
  text: string;
}

type UseTodosManagerResult = ReturnType<typeof useTodosManager>;

const TodoContext = createContext<UseTodosManagerResult>({
  todos: [],
  addTodo: () => {},
  removeTodo: () => {},
});

// Action types for the reducer
type ActionType =
  | { type: "ADD"; text: string }
  | { type: "REMOVE"; id: number };

function useTodosManager(initialTodos: Todo[]): {
  todos: Todo[];
  addTodo: (text: string) => void;
  removeTodo: (id: number) => void;
} {
  // Reducer to manage the todo list state
  const [todos, dispatch] = useReducer(
    (state: Todo[], action: ActionType): Todo[] => {
      switch (action.type) {
        case "ADD":
          return [
            ...state,
            {
              id: state.length,
              text: action.text,
              done: false,
            },
          ];
        case "REMOVE":
          return state.filter(({ id }) => id !== action.id);
        default:
          throw new Error();
      }
    },
    initialTodos
  );

  const addTodo = useCallback((text: string) => {
    dispatch({
      type: "ADD",
      text,
    });
  }, []);

  const removeTodo = useCallback((id: number) => {
    dispatch({
      type: "REMOVE",
      id,
    });
  }, []);

  return { todos, addTodo, removeTodo };
}

export const TodosProvider: React.FunctionComponent<{
  initialTodos: Todo[];
  children: React.ReactNode;
}> = ({ initialTodos, children }) => (
  <TodoContext.Provider value={useTodosManager(initialTodos)}>
    {children}
  </TodoContext.Provider>
);


export const useAddTodos=():UseTodosManagerResult["addTodo"]=>{
  const {addTodo} = useContext(TodoContext)
  return addTodo
}

export const useRemoveTodos=():UseTodosManagerResult["removeTodo"]=>{
  const {removeTodo} = useContext(TodoContext)
  return removeTodo
}

export const useTodos=():Todo[]=>{
  const {todos} = useContext(TodoContext)
  return todos
}
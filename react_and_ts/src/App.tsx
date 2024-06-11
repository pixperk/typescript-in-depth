import React, { useCallback, useEffect, useReducer, useRef, useState } from "react";
import "./App.css";

// Define a simple interface for components that accept children
interface ForChildren {
  children?: React.ReactNode;
}

// Functional component Heading with typed props
const Heading = ({ title }: { title: string }) => {
  return <h2>{title}</h2>;
};

// Inline styles for the button component
const buttonStyle: React.CSSProperties = {
  backgroundColor: "#007bff",
  color: "white",
  border: "none",
  borderRadius: "4px",
  padding: "10px 20px",
  fontSize: "16px",
  cursor: "pointer",
  transition: "background-color 0.3s ease",
};

const hoverStyle: React.CSSProperties = {
  backgroundColor: "#0056b3",
};

const activeStyle: React.CSSProperties = {
  backgroundColor: "#004494",
};

const disabledStyle: React.CSSProperties = {
  backgroundColor: "#cccccc",
  cursor: "not-allowed",
};

// Button component with extended props for HTMLButtonElement and custom title prop
const Button: React.FunctionComponent<
  React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > & {
    title?: string;
  }
> = ({ title, children, style, ...rest }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isActive, setIsActive] = useState(false);

  const combinedStyle = {
    ...style,
    ...buttonStyle,
    ...(isHovered ? hoverStyle : {}),
    ...(isActive ? activeStyle : {}),
    ...(rest.disabled ? disabledStyle : {}),
  };

  return (
    <button
      {...rest}
      style={combinedStyle}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseDown={() => setIsActive(true)}
      onMouseUp={() => setIsActive(false)}
    >
      {title ?? children}
    </button>
  );
};

// Box component with children prop
const Box: React.FunctionComponent<ForChildren> = ({ children }) => (
  <div
    style={{
      padding: "1rem",
      fontWeight: "bold",
    }}
  >
    {children}
  </div>
);

// List component with items array and optional onClick handler
const List: React.FunctionComponent<{
  items: string[];
  onClick?: (item: string) => void;
}> = ({ items, onClick }) => (
  <ul>
    {items.map((item, index) => (
      <li key={index} onClick={() => onClick?.(item)}>
        {item}
      </li>
    ))}
  </ul>
);

// Interface for Payload
interface Payload {
  text: string;
}

// Interface for Todo items
interface Todo {
  id: number;
  done: boolean;
  text: string;
}

// Action types for the reducer
type ActionType =
  | { type: "ADD"; text: string }
  | { type: "REMOVE"; id: number };

// Incrementer component to demonstrate use of state with custom hooks
const Incrementer: React.FunctionComponent<{
  value: UseNumberValue;
  setValue: UseNumberSetValue;
}> = ({ value, setValue }) => (
  <Button
    onClick={() => setValue((prev) => prev + 1)}
    title={`Add - ${value}`}
  />
);

// Custom hook to manage a number state
const useNumber = (initialValue: number) => useState<number>(initialValue);

// Types for the custom hook's return values
type UseNumberValue = ReturnType<typeof useNumber>[0];
type UseNumberSetValue = ReturnType<typeof useNumber>[1];

function App() {
  // Callback for list item clicks
  const onListClick = useCallback((item: string) => {
    alert(item);
  }, []);

  // State to hold payload data
  const [payload, setPayload] = useState<Payload | null>(null);

  // Effect to fetch data from a JSON file
  useEffect(() => {
    fetch("/data.json")
      .then((res) => res.json())
      .then((data) => setPayload(data));
  }, []);

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
    []
  );

  // Ref for the new todo input
  const newTodoRef = useRef<HTMLInputElement>(null);

  // Callback to add a new todo item
  const onAddTodo = useCallback(() => {
    if (newTodoRef.current) {
      dispatch({
        type: "ADD",
        text: newTodoRef.current.value,
      });
      newTodoRef.current.value = "";
    }
  }, []);

  // Custom hook to manage a number state
  const [value, setValue] = useNumber(0);

  return (
    <>
      <Heading title="Introduction" />
      <Box>Hello There</Box>
      <List items={["React", "Node", "PostgreSQL"]} onClick={onListClick} />
      <Box>{JSON.stringify(payload)}</Box>

      <Incrementer value={value} setValue={setValue} />
      <Heading title="Todo List" />
      {todos.map((todo) => (
        <div key={todo.id}>
          {todo.text}
          <button
            onClick={() =>
              dispatch({
                type: "REMOVE",
                id: todo.id,
              })
            }
          >
            Remove
          </button>
        </div>
      ))}
      <div>
        <input type="text" ref={newTodoRef} />
        <Button onClick={onAddTodo}>Add</Button>
      </div>
    </>
  );
}

export default App;

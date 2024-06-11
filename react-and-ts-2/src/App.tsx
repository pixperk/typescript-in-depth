import React, { useCallback, useRef, useState } from "react";
import "./App.css";
import { useTodos } from "./useTodos";

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

function App() {
  const { todos, addTodo, removeTodo } = useTodos([
    { id: 0, text: "Write your first todo", done: false },
  ]);

  // Ref for the new todo input
  const newTodoRef = useRef<HTMLInputElement>(null);

  // Callback to add a new todo item
  const onAddTodo = useCallback(() => {
    if (newTodoRef.current) {
      addTodo(newTodoRef.current.value);
      newTodoRef.current.value = "";
    }
  }, [addTodo]);

  return (
    <>
      <Heading title="Introduction" />
      <Box>Hello There</Box>
      <Heading title="Todo List" />
      {todos.map((todo) => (
        <div key={todo.id}>
          {todo.text}
          <Button onClick={() => removeTodo(todo.id)}>Remove</Button>
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

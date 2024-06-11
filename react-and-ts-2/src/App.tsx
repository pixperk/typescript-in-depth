import React, { useCallback, useEffect, useRef, useState } from "react";
import "./App.css";
import {
  useRemoveTodos,
  useAddTodos,
  useTodos,
  TodosProvider,
} from "./useTodos";

// Define a simple interface for components that accept children
interface ForChildren {
  children?: React.ReactNode;
}

// Functional component Heading with typed props
const Heading = ({ title }: { title: string }) => {
  return <h2 style={headingStyle}>{title}</h2>;
};

// Styles for the heading
const headingStyle: React.CSSProperties = {
  fontSize: "2rem",
  color: "#2c3e50",
  borderBottom: "3px solid #3498db",
  paddingBottom: "0.5rem",
  marginBottom: "1rem",
  fontWeight: "bold",
  textAlign: "center",
  fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
};

// Inline styles for the button component
const buttonStyle: React.CSSProperties = {
  backgroundColor: "#3498db",
  color: "white",
  border: "none",
  borderRadius: "4px",
  padding: "12px 24px",
  fontSize: "16px",
  cursor: "pointer",
  transition: "background-color 0.3s ease, transform 0.3s ease",
  margin: "0 0.5rem",
};

const hoverStyle: React.CSSProperties = {
  backgroundColor: "#2980b9",
};

const activeStyle: React.CSSProperties = {
  backgroundColor: "#1c6ea4",
  transform: "scale(0.98)",
};

const disabledStyle: React.CSSProperties = {
  backgroundColor: "#bdc3c7",
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
      backgroundColor: "#ecf0f1",
      borderRadius: "8px",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      marginBottom: "1rem",
      textAlign: "center",
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      color: "#2c3e50",
    }}
  >
    {children}
  </div>
);

// Generic UL component
function UL<T>({
  items,
  render,
  liststyle,
  itemstyle,
  itemClick,
}: {
  items: T[]; // Accepts an array of items of type T
  render: (item: T) => React.ReactNode; // Function to render each item, taking an item of type T and returning a React node
  liststyle: React.CSSProperties; // Style for the list
  itemstyle: React.CSSProperties; // Style for each item
  itemClick: (item: T) => void; // Function to handle item click, taking an item of type T
}) {
  return (
    <ul style={liststyle}>
      {items.map((item, index) => (
        <li onClick={() => itemClick(item)} style={itemstyle} key={index}>
          {render(item)}
        </li>
      ))}
    </ul>
  );
}

function App() {
  const todos = useTodos();
  const addTodo = useAddTodos();
  const removeTodo = useRemoveTodos();

  // Ref for the new todo input
  const newTodoRef = useRef<HTMLInputElement>(null);

  // Callback to add a new todo item
  const onAddTodo = useCallback(() => {
    if (newTodoRef.current) {
      addTodo(newTodoRef.current.value);
      newTodoRef.current.value = "";
    }
  }, [addTodo]);

  // State for the current date and time
  const [dateTime, setDateTime] = useState(new Date());

  // Update the date and time every second
  useEffect(() => {
    const intervalId = setInterval(() => {
      setDateTime(new Date());
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div style={appContainerStyle}>
      <Heading title="Todofy it!" />
      <Box>{dateTime.toLocaleString()}</Box>
      <Heading title="Achieve Your Goals" />
      <UL
        itemClick={(item) => alert(item.text)} // Function to handle item click, with item inferred as Todo type
        itemstyle={todoItemStyle}
        liststyle={todoListStyle}
        items={todos} // Passing todos as items, inferred as Todo[] type
        render={(todo) => (
          <>
            {todo.text}
            <Button onClick={() => removeTodo(todo.id)}>Remove</Button>
          </>
        )}
      />
      <div style={inputContainerStyle}>
        <input type="text" ref={newTodoRef} style={inputStyle} placeholder="Add a new task..." />
        <Button onClick={onAddTodo}>Add</Button>
      </div>
    </div>
  );
}

const JustShowTodos = () => {
  const todos = useTodos();
  return (
    <UL
      itemClick={() => { }}
      itemstyle={todoItemStyle}
      liststyle={todoListStyle}
      items={todos} // Passing todos as items, inferred as Todo[] type
      render={(todo) => <>{todo.text}</>}
    />
  );
};

const AppWrapper = () => (
  <TodosProvider
    initialTodos={[{ id: 0, text: "Write your first todo", done: false }]}
  >
    <div style={appWrapperStyle}>
      <App />
      <JustShowTodos />
    </div>
  </TodosProvider>
);

export default AppWrapper;

// Additional styling for the app container, todo list, input, etc.
const appContainerStyle: React.CSSProperties = {
  maxWidth: "800px",
  margin: "2rem auto",
  padding: "2rem",
  fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  backgroundColor: "#fff",
  borderRadius: "8px",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
};

const appWrapperStyle: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: "2rem",
  padding: "2rem",
  backgroundColor: "#ecf0f1",
};

const todoListStyle: React.CSSProperties = {
  marginBottom: "1rem",
  padding: "0",
  listStyleType: "none",
};

const todoItemStyle: React.CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "1rem",
  borderBottom: "1px solid #ddd",
  backgroundColor: "#f9f9f9",
  borderRadius: "4px",
  marginBottom: "0.5rem",
  transition: "background-color 0.3s ease",
};

const inputContainerStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  marginTop: "1rem",
};

const inputStyle: React.CSSProperties = {
  flex: 1,
  padding: "0.75rem",
  fontSize: "16px",
  borderRadius: "4px",
  border: "1px solid #ddd",
  marginRight: "0.5rem",
  transition: "border-color 0.3s ease",
};


// Additional styling for the input placeholder
const inputPlaceholderStyle: React.CSSProperties = {
  color: "#95a5a6",
  fontStyle: "italic",
};

// Set inputStyle placeholder
(inputStyle as any)["::placeholder"] = inputPlaceholderStyle;

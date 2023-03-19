import "./App.css";
import React, { useState, useEffect } from "react";

import { createTodo, getTodos } from "./services/apiClient";

function App() {
  const [todos, setTodos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    const todos = await getTodos();
    setTodos(todos);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const onSubmit = async (event) => {
    event.preventDefault();
    const { todo } = event.target.elements;
    const newTodo = await createTodo({ description: todo.value });
    setTodos([...todos, newTodo]);
    todo.value = "";
    todo.focus();
  };

  if (isLoading) {
    return (
      <div className="app">
        <h1>Todos</h1>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="app">
      <h1>Todos</h1>

      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>{todo.description}</li>
        ))}
      </ul>

      <form onSubmit={onSubmit}>
        <input type="text" id="todo" />
        <button type="submit">Create todo</button>
      </form>
    </div>
  );
}

export default App;

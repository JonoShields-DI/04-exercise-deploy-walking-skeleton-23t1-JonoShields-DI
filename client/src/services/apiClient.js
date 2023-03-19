const API_URL = process.env.REACT_APP_API_URL

const createTodo = async (body) => {
  const response = await fetch(`${API_URL}/todos`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  const todo = await response.json();
  return todo;
};

const getTodos = async () => {
  const response = await fetch(`${API_URL}/todos`);
  const todos = await response.json();
  return todos;
};

export { createTodo, getTodos };

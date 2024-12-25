const express = require("express");
const app = express();

// Middleware to parse JSON request bodies
app.use(express.json());

let todos = [];

// Endpoint to create a new todo
app.post("/", (req, res) => {
  const { title } = req.body; // Extract the title from the request body
  const id = Math.random().toString(36).substring(2, 9); // Generate a random ID
  const newTodo = { id, title };

  todos.push(newTodo); // Add the new todo to the array
  res.status(201).json({ message: "Todo created", todo: newTodo });
});

// Endpoint to get all todos
app.get("/", (req, res) => {
  res.json(todos); // Respond with the list of todos
});

// Endpoint to delete a todo by ID
app.delete("/:id", (req, res) => {
  const { id } = req.params; // Extract the ID from the request params
  const initialLength = todos.length;

  todos = todos.filter((todo) => todo.id !== id); // Remove the todo with the specified ID

  if (todos.length < initialLength) {
    res.json({ message: "Todo deleted" });
  } else {
    res.status(404).json({ message: "Todo not found" });
  }
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const PORT = 3001;

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Store tasks
let tasks = [];

app.get("/tasks", (req, res) => {
  res.json(tasks);
});

app.post("/tasks", (req, res) => {
  const { title } = req.body;
  const newTask = { id: tasks.length + 1, title };
  tasks.push(newTask);
  res.status(201).json(newTask);
});

app.get("/tasks/:id", (req, res) => {
  const taskId = parseInt(req.params.id);
  const task = tasks.find((task) => task.id === taskId);
  if (!task) {
    res.status(404).json({ message: "Task not found" });
  } else {
    res.json(task);
  }
});

app.put("/tasks/:id", (req, res) => {
  const taskId = parseInt(req.params.id);
  const { title } = req.body;
  const taskIndex = tasks.findIndex((task) => task.id === taskId);
  if (taskIndex === -1) {
    res.status(404).json({ message: "Task not found" });
  } else {
    tasks[taskIndex] = { ...tasks[taskIndex], title };
    res.json(tasks[taskIndex]);
  }
});

app.delete("/tasks/:id", (req, res) => {
  const taskId = parseInt(req.params.id);
  const taskIndex = tasks.findIndex((task) => task.id === taskId);
  if (taskIndex === -1) {
    res.status(404).json({ message: "Task not found" });
  } else {
    tasks.splice(taskIndex, 1);
    res.json({ message: "Task deleted successfully" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

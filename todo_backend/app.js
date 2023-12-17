const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

// 存储todos的数组
let todos = [];
let todoIdCounter = 1;

// 获取所有Todos
app.get("/todos", (req, res) => {
  res.json({ todos });
});

// 获取特定ID的Todo
app.get("/todos/:id", (req, res) => {
  const todoId = parseInt(req.params.id, 10);
  const todo = todos.find((todo) => todo.id === todoId);

  if (todo) {
    res.json({ todo });
  } else {
    res.status(404).json({ message: "Todo not found" });
  }
});

// 添加Todo
app.post("/todos", (req, res) => {
  console.log("add new todos", req.body);
  const todoText = req.body.text;

  if (todoText) {
    const newTodo = {
      id: todoIdCounter++,
      text: todoText,
    };

    todos.push(newTodo);
    res.status(201).json({
      success: true,
      message: "Todo added successfully",
      todo: newTodo,
    });
  } else {
    res.status(400).json({ success: false, message: "Todo text is required" });
  }
});

// 更新Todo
app.put("/todos/:id", (req, res) => {
  const todoId = parseInt(req.params.id, 10);
  const index = todos.findIndex((todo) => todo.id === todoId);

  if (index !== -1) {
    const updatedTodo = { id: todoId, text: req.body.text };
    todos[index] = updatedTodo;
    res.json({
      success: true,
      message: "Todo updated successfully",
      todo: updatedTodo,
    });
  } else {
    res.status(404).json({ success: false, message: "Todo not found" });
  }
});

// 删除Todo
app.delete("/todos/:id", (req, res) => {
  const todoId = parseInt(req.params.id, 10);
  const index = todos.findIndex((todo) => todo.id === todoId);

  if (index !== -1) {
    const deletedTodo = todos.splice(index, 1);
    res.json({
      success: true,
      message: "Todo deleted successfully",
      deletedTodo,
    });
  } else {
    res.status(404).json({ success: false, message: "Todo not found" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

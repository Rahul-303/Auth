import express from "express";
import { authenticate } from "../middleware/verifyUser";
import { Todo } from "../db/todo.model";

const router = express.Router();

interface TodoType {
  title: string;
  description: string;
}

router.get("/gettodos", authenticate, async (req, res) => {
  const userId = req.headers["userId"];
  try {
    const todos = await Todo.find({ userId });
    res.json(todos);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve todos" });
  }
});

router.post("/create", authenticate, async (req, res) => {
  const userId = req.headers["userId"];
  const { title, description }: TodoType = req.body;
  try {
    const todo = new Todo({ title, description, done: false, userId });
    const savedTodo = await todo.save();

    res.status(201).json(savedTodo);
  } catch (error) {
    res.status(500).json({ error: "Failed to create todo" });
  }
});

router.patch("/mark/:todoId", authenticate, async (req, res) => {  
  const {todoId} = req.params;
  const userId = req.headers["userId"];
  
  try {
    const updatedTodo = await Todo.findOneAndUpdate(
      { _id: todoId, userId },
      { done: true },
      { new: true }
    );
    if (!updatedTodo) {
      return res.status(404).json({ error: "Todo not found" });
    }
    res.json(updatedTodo);
  } catch (err) {
    res.status(500).json({ error: "Failed to update todo" });
  }
});

export default router;

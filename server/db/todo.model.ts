import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
    title: String,
    description: String,
    done: Boolean,
    userId: String,
})

export const Todo = mongoose.model('Todo', todoSchema);
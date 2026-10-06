import db from "./database.js";
import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

let tasks = [];
let nextId = 1;

// GET all tasks
app.get("/api/tasks", (req, res) => {
    const tasks = db.prepare("SELECT * FROM tasks").all();

    const formattedTasks = tasks.map((task) => ({
        id: task.id,
        title: task.title,
        completed: Boolean(task.completed),
    }));

    res.json(formattedTasks);
});
// POST new task
app.post("/api/tasks", (req, res) => {
    const { title, completed = false } = req.body;

    const result = db.prepare(`
    INSERT INTO tasks (title, completed)
    VALUES (?, ?)
  `).run(title, completed ? 1 : 0);

    const newTask = {
        id: result.lastInsertRowid,
        title,
        completed: Boolean(completed),
    };

    res.status(201).json(newTask);
});

// PUT update task
app.put("/api/tasks/:id", (req, res) => {
    const id = Number(req.params.id);
    const { completed } = req.body;

    const result = db
        .prepare("UPDATE tasks SET completed = ? WHERE id = ?")
        .run(completed ? 1 : 0, id);

    if (result.changes === 0) {
        return res.status(404).json({
            message: "Task not found",
        });
    }

    const updatedTask = db
        .prepare("SELECT * FROM tasks WHERE id = ?")
        .get(id);

    res.json({
        id: updatedTask.id,
        title: updatedTask.title,
        completed: Boolean(updatedTask.completed),
    });
});
// DELETE task
app.delete("/api/tasks/:id", (req, res) => {
    const id = Number(req.params.id);

    const result = db
        .prepare("DELETE FROM tasks WHERE id = ?")
        .run(id);

    if (result.changes === 0) {
        return res.status(404).json({
            message: "Task not found",
        });
    }

    res.json({
        message: "Task deleted successfully",
    });
});
// Start server
app.listen(5000, () => {
    console.log("Backend running on port 5000");
});
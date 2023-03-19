const express = require("express")
const app = express()
const cors = require("cors")
const get_todos_crud = require("./todos_crud.js")
let crud = null;

// middleware
app.use(cors())
app.use(express.json())

// ensuring crud (create, read, update, delete) is set
app.use(async (req, res, next) => {
    if (crud === null) {
        crud = await get_todos_crud()
    }

    next()
})

// get all todos
app.get("/todos", async (req, res) => {
    try {
        const todos = await crud.read_all()
        res.json(todos);
    } catch (e) {
        return res.status(500).json({ error: e.message });
    }
})

// create a todo
app.post("/todos", async (req, res) => {
    try {
        const { description } = req.body;
        const todo = await crud.create(description);
        return res.json(todo);
    } catch (e) {
        return res.status(500).json({ error: e.message });
    }
})

// get a todo
app.get("/todos/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const todo = await crud.read_one(id);
        res.json(todo);
    } catch (e) {
        return res.status(500).json({ error: e.message });
    }
})

//update a todo
app.put("/todos/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { description } = req.body;
        const todo = await crud.update(id, description);
        res.json(todo);
    } catch (e) {
        return res.status(500).json({ error: e.message });
    }
})

//delete a todo
app.delete("/todos/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const todo = await crud.delete(id);
        res.json(todo);
    } catch (e) {
        return res.status(500).json({ error: e.message });
    }
})

module.exports = app
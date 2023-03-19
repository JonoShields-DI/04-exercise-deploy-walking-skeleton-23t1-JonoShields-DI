const get_db = require("./db")

async function get_todos_crud() {
    const db = await get_db()

    return {
        async create(description) {
            const newTodo = await db.query(
                'INSERT INTO todos (description) VALUES($1) RETURNING *',
                [description]
            );

            return newTodo.rows[0];
        },

        async read_all() {
            const todos = await db.query('SELECT * FROM todos');
            return todos.rows;
        },

        async read_one(id) {
            const todo = await db.query('SELECT * FROM todos WHERE id = $1', [id]);
            return todo.rows[0];
        },

        async update(id, description) {
            await db.query('UPDATE todos SET description = $1 WHERE id = $2', [
                description,
                id,
            ]);

            return 'Todo was updated!';
        },

        async delete(id) {
            await db.query('DELETE FROM todos WHERE id = $1', [id]);

            return 'Todo was deleted!';
        }
    }
}

module.exports = get_todos_crud
import { readFile, writeFile } from "node:fs/promises"

const path = 'src/storage/todos.json'

export async function findTodos(){
    const data = await readFile(path, 'utf8')
    return JSON.parse(data)
}

export async function createTodo({ title, completed = false }) {
    const todo = { title, completed, id: Date.now() }
    const todos = [todo, ...await findTodos()]
    await writeFile(path, JSON.stringify(todos,null, 2))
    return todo
}

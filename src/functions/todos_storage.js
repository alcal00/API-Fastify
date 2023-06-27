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

export async function removeTodo(id) {
    const todos = await findTodos()
    // On regarde si l'id existe s'il existe pas findIndex renvoie -1
    const todo = todos.findIndex(todo => todo.id === id)
    if (todo === -1) {
        throw new Error("L'id est invalide")
    }
    //On garde les todos qui ont un id différent
    await writeFile(path, JSON.stringify(todos.filter(todo => todo.id !== id),null, 2))
}

export async function updateTodo(id, partialTodo) {
    const todos = await findTodos()
    const todo = todos.find(todo => todo.id === id)
    if (todo === undefined){
        throw new Error()
    }
    Object.assign(todo, partialTodo)
    await writeFile(path, JSON.stringify(todos,null, 2))
    return todo
}

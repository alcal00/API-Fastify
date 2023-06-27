import { readFile } from "node:fs/promises"

const path = 'src/storage/todos.json'

export async function findTodos(){
    const data = await readFile(path, 'utf8')
    return JSON.parse(data)
}
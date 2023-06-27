import fastify from "fastify";
import { createTodo, findTodos, removeTodo } from "./functions/todos_storage.js";


const fast = fastify({
    logger: false
})

fast.get('/todos', async (request, reply) => {
    return findTodos()
})

fast.post('/todos', async (request, reply) => {
    return createTodo(request.body)
})

fast.delete('/todos', async (request, reply) =>{
    const url = new URL(request.url, `http://${request.hostname}`)
    return removeTodo(parseInt(url.searchParams.get('id'),10))
    reply.statusCode = 204
})

const start = async () => {
    try {
        await fast.listen({ port: 3000 })
    } catch (err) {
        fast.log.error(err)
        process.exit(1)
    }
}
start()
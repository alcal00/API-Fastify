import fastify from "fastify";
import { createTodo, findTodos, removeTodo, updateTodo } from "./functions/todos_storage.js";


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
    reply.statusCode = 204
    return removeTodo(parseInt(url.searchParams.get('id'),10))
    
})

fast.put('/todos', async (request, reply) => {
    const url = new URL(request.url, `http://${request.hostname}`)
    return updateTodo(parseInt(url.searchParams.get('id'),10), request.body)
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
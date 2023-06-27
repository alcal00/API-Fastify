import fastify from "fastify";
import { createTodo, findTodos } from "./functions/todos_storage.js";


const fast = fastify({
    logger: false
})

fast.get('/todos', async (request, reply) => {
    return findTodos()
})

fast.post('/todos', async (request, reply) => {
    return createTodo(request.body)
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
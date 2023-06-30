import fastify from "fastify";
import { createTodo, findTodos, removeTodo, updateTodo } from "./functions/todos_storage.js";


export const fast = fastify({
    logger: false
})

fast.get('/todos', async (request, reply) => {
    return findTodos()
})

fast.post('/todos', async (request, reply) => {
    return createTodo(request.body)
})

fast.delete('/todos', async (request, reply) => {
    const { id } = request.query
    await removeTodo(parseInt(id, 10))
    reply.code(204).send()

})

fast.put('/todos', async (request, reply) => {
    const { id } = request.query
    return updateTodo(parseInt(id, 10), request.body)
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
import fastify from "fastify";
import { findTodos } from "./functions/todos_storage.js";


const fast = fastify({
    logger: true
})


fast.get('/todos', async (request, reply) => {
     return findTodos()
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
import fastify from "fastify";
import fastifyCors from "@fastify/cors";
import { createTodo, findTodos, removeTodo, updateTodo } from "./functions/todos_storage.js";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export const fast = fastify({
    logger: false
})

fast.register(fastifyCors, {
    origin: "*",
    methods: "GET, POST, PUT, DELETE"
});

fast.get('/todos', async (request, reply) => {
    const todos = await prisma.todo.findMany()
    reply.send(todos)
})

fast.post('/todos', async (request, reply) => {
    const { title } = request.body
    const {completed} = request.body
    const createPrismaTodo = await prisma.todo.create({
        data: {
            title,
            completed
        }
    })
    reply.send(createPrismaTodo)
})

fast.delete('/todos', async (request, reply) => {
    const id  = parseInt(request.query.id, 10)
    await prisma.todo.delete({
        where: {
            id,
        }
    })
    reply.code(204).send()
})

fast.put('/todos', async (request, reply) => {
    const id  = parseInt(request.query.id, 10)
    const { title, completed } = request.body
   const updatePrismaTodo = await prisma.todo.update({
        where:{
            id
        },
        data:{
            title,
            completed
        }
    })
    reply.send(updatePrismaTodo)
})

const start = async () => {
    try {
        await fast.listen({ port: 8000 })
    } catch (err) {
        fast.log.error(err)
        process.exit(1)
    }
}
start()
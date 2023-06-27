import fastify from "fastify";

const fast = fastify({
    logger: true
})

fast.get('/', async (request, reply) => {
    return { hello: 'world' }
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
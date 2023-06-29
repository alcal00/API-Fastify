const request = require('supertest')
const baseUrl ='http://localhost:3000'
const todos = require('../storage/todos.json')


describe('Test Todos', () => {
    it('Test GET/todos', async() => {
        const expected = [{
            "id": expect.any(Number),
            "title": expect.any(String),
            "completed": expect.any(Boolean)
        }]
        const response = await request(baseUrl).get('/todos')
        expect(response.headers).toBeDefined()
        expect(response.statusCode).toBe(200)
        expect(response.body).toMatchObject(todos)
        expect(response.body).toEqual(expect.arrayContaining(expected))
    })
})
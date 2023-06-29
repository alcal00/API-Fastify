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
    it('Test POST/todos voir si on créé bien une todo', async() => {
        const newTodo = {
            "title": 'Test Todo',
            "completed": false
        }
        const response = await request(baseUrl).post('/todos').send(newTodo)
        expect(response.statusCode).toBe(200)
        expect(response.body.id).toBeDefined()
        expect(response.body.title).toBe(newTodo.title)
        expect(response.body.completed).toBe(newTodo.completed)
        console.log(response.body)
    })
    
})
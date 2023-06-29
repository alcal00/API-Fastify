const request = require('supertest')
const baseUrl = 'http://localhost:3000'
const todos = require('../storage/todos.json')


describe('Test Todos', () => {
    it('Test GET/todos', async () => {
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
    it('Test POST/todos voir si on créé bien une todo', async () => {
        const newTodo = {
            "title": 'Test Todo1',
            "completed": false
        }
        const response = await request(baseUrl).post('/todos').send(newTodo)
        expect(response.statusCode).toBe(200)
        expect(response.body.id).toBeDefined()
        expect(response.body.title).toBe(newTodo.title)
        expect(response.body.completed).toBe(newTodo.completed)
    })
    it('Test DELETE/todos voir si on supprime bien une todo', async () => {
        const deleteTodo = 1688049451959
        const response = await request(baseUrl).delete(`/todos?id=${deleteTodo}`)
        expect(response.statusCode).toBe(204)
        expect(response.body).toMatchObject({})

        // Vérifier que la tâche a été supprimée
        const checkResponse = await request(baseUrl).get('/todos')
        expect(checkResponse.statusCode).toBe(200)
        expect(checkResponse.body.some(todo => todo.id === deleteTodo)).toBe(false)
    })
    it('Test PUT/todos voir si on met bien à jour la tâche', async () => {
        const updateTodoId = 1688049729007
        const todoUpdated = {
            "title": 'MaJ Todo',
            "completed": true
        }
        const response = await request(baseUrl)
            .put(`/todos?id=${updateTodoId}`)
            .send(todoUpdated)
        expect(response.statusCode).toBe(200)
        expect(response.body.id).toEqual(updateTodoId)
        expect(response.body.title).toBe(todoUpdated.title)
        expect(response.body.completed).toBe(todoUpdated.completed)
    
    })

})
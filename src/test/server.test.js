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
        const newTodoDelete = {
            "title": 'todo a delete',
            "completed": false,
        }
        const post = await request(baseUrl).post('/todos').send(newTodoDelete)
        const deleteTodoId = post.body.id
        const response = await request(baseUrl).delete(`/todos?id=${deleteTodoId}`)
        expect(response.statusCode).toBe(204)
        expect(response.body).toMatchObject({})

        // Vérifier que la tâche a été supprimée
        const checkResponse = await request(baseUrl).get('/todos')
        expect(checkResponse.statusCode).toBe(200)
        expect(checkResponse.body.some(todo => todo.id === deleteTodoId)).toBe(false)
    })
    it('Test PUT/todos voir si on met bien à jour la tâche', async () => {
        const newTodo = {
            "title": 'Test Todo1',
            "completed": false
        }
        const newTodoUpdated = {
            "title": 'MaJ Todo',
            "completed": true
        }
        const post = await request(baseUrl).post('/todos').send(newTodo)
        const updateTodoId = post.body.id
        const response = await request(baseUrl)
            .put(`/todos?id=${updateTodoId}`)
            .send(newTodoUpdated)   
        expect(response.statusCode).toBe(200)
        expect(response.body.id).toEqual(updateTodoId)
        expect(response.body.title).toBe(newTodoUpdated.title)
        expect(response.body.completed).toBe(newTodoUpdated.completed)

    })

})
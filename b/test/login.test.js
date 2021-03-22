import supertest from 'supertest'
import app from '../src/app.js'

const runningApp = supertest(app);

test('no username, no password, get status 500 and error message', async () => {
    const response = await runningApp
        .post('/login')
        .send({
            username: "",
            password: ""
        })
    expect(response.status).toBe(500)
    expect(response.body).toHaveProperty('message');
})

test('no username, get status 500 and error message', async () => {
    const response = await runningApp
        .post('/login')
        .send({
            username: "",
            password: "password"
        })
    expect(response.status).toBe(500)
    expect(response.body).toHaveProperty('message');
})

test('no password, get status 500 and error message', async () => {
    const response = await runningApp
        .post('/login')
        .send({
            username: "username",
            password: ""
        })
    expect(response.status).toBe(500)
    expect(response.body).toHaveProperty('message');
})
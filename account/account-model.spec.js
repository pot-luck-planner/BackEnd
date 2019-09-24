const request = require('supertest')
const db = require('../database/dbConfig')
const server = require('../api/server')

describe('test', () => {

    const account = {
        id: 1,
        username: "JohnDoe",
        firstname: "John",
        lastname: "Doe"
        
    }

    describe('', () => {
        it('id', () => {
            expect(account).toHaveProperty("id")
        })
        it('username', () => {
            expect(account).toHaveProperty("username")
        })
        it('firstname', () => {
            expect(account).toHaveProperty("firstname")
        })
        it('lastname', () => {
            expect(account).toHaveProperty("lastname")
        })
    })
})
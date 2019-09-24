const request = require("supertest");

const db = require("./database/dbConfig");

const server = require("./api/server");

  describe('POST register', () => {
    it('should post a new blog and return a status code of 500', () => {
      return request(server)
        .post('/accounts/register')
        .send({ blog_summary: 'Hello World!' })
        .then(response => {
          expect(response).toHaveProperty('status', 500);
        });
    });
    it('register', () => {
      return request(server)
        .post('/accounts/register')
        .send({ firstname: "John", lastname: "Doe", username: 'JohnDoe', password: "1234" })
        .then(response => {
            expect(response).toHaveProperty('status', 500);
          });
    });
  });
  describe('POST Login', () => {
    it('should post a new blog and return a status code of 500', () => {
      return request(server)
        .post('/accounts/login')
        .send({ blog_summary: 'Hello World!' })
        .then(response => {
          expect(response).toHaveProperty('status', 500);
        });
    });
    it('LOGIN', () => {
      return request(server)
        .post('/accounts/login')
        .send({ username:'JohnDoe',password:"1234" })
        .then(res => {
            expect(res.type).toMatch(/json/);
          });
    });
  })
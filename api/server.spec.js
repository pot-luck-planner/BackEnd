const request = require('supertest');

const server = require('./server.js');

describe('server.js', () => {
  describe('GET /', () => {
    it('returns 200 OK', () => {
      return request(server)
        .get('/')
        .then(res => {
          expect(res.status).toBe(200);
        });
    });

    it('text/html', done => {
      request(server)
        .get('/')
        .then(res => {
          expect(res.type).toMatch("text/html");
          done();
        });
    });
  });

  describe('GET /accounts/users', () => {
    it('returns 400 OK', () => {
      return request(server)
        .get('/accounts/users')
        .then(res => {
          expect(res.status).toBe(400);
        });
    });
    
    it('returns JSON', done => {
        request(server)
          .get('/accounts/users')
          .then(res => {
            expect(res.type).toMatch(/json/i);
            done();
          });
      });
});
})
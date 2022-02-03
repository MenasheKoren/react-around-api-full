const supertest = require('supertest');
const app = require('./app');

const request = supertest(app);

describe('Endpoints respond to requests', () => {
  it('GET "/" returns data and status 200 on request', () => request.get('/').then((response) => {
    expect(response.status).toBe(200);
    expect(response.text).toBe('Hello, world!');
  }));

  it('GET "/users" must return correct user data in JSON format and a correct status', () => request.get('/users').then((response) => {
    expect(response.status).toBe(200);
    expect(response.headers['content-type']).toMatch('application/json');
  }));

  it('POST "/signin" should return token in JSON format with correct status', () => request.post('/sigin').then((response) => {
    expect(response.status).toBe(200);
    expect(response.headers['content-type']).toMatch('application/json');
    expect(response.body.key).toBe('token');
    expect(response.body.value).toBeDefined();
  }));
});

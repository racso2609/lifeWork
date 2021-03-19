const supertest = require('supertest');
const app = require('../routes/users');

const api = supertest(app);

test('Empty Json Web Token simpleTask route', async () => {
    await api
        .get('/simple-task')
        .expect(401)
});


test('return Json simpleTask route', async () => {
    const Token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjYwMDA5YmY2MGFiYjUwNGFjODU4M2I0MSIsIkVtYWlsIjoib3NjYXJlbWlsaW9sdWdvQGdtYWlsLmNvbSIsIlJvbCI6InVzZXIiLCJQaG9uZSI6NDI0MTA5NDQ0NywiTmFtZSI6Im9zY2FyIGx1Z28ifSwiaWF0IjoxNjE2MDE4MTU5LCJleHAiOjE2MTYwMjUzNTl9.OBiIhu40bq1tVxvOJN1h784bClKQWei_NZZbL7kMAqg'

    await api
        .get('/simple-task')
        .set('Authorization', 'Bearer ' + Token) 
        .expect(200)
});
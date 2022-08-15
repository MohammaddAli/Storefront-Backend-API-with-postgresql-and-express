import app from '../../server';
import supertest from 'supertest';
import client from '../../database';

const request = supertest(app);
export let token = '';

describe('users handlers test', () => {
  it("creates a new user , app.post('/user',create)", async () => {
    const res = await request.post('/user').send({
      first_name: 'Mo',
      last_name: 'Ali',
      user_name: 'MoAli',
      password: 'M253A',
    });
    token = res.body;
    expect(res.status).toBe(200);
    expect({ id: 1, first_name: 'Mo', last_name: 'Ali', user_name: 'MoAli' });
  });

  it("gets all users , app.get('/user',index)", async () => {
    const res = await request
      .get('/user')
      .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(200);
    // console.log('im in the get all users test');
    expect({ id: 1, first_name: 'Mo', last_name: 'Ali', user_name: 'MoAli' });
  });

  it("gets user by ID ,app.get('/user/:id',show)", async () => {
    const res = await request
      .get('/user/1')
      .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.body.first_name).toBe('Mo');
    expect(res.body.last_name).toBe('Ali');
    expect(res.body.user_name).toBe('MoAli');
  });
});

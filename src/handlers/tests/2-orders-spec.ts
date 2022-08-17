import app from '../../server';
import supertest from 'supertest';
import { token } from './1-users-spec';

const request = supertest(app);

describe('orders handlers test', () => {
  it('gets current order ', async () => {
    const res = await request
      .get('/order/1')
      .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.body.status).toEqual('Active');
    expect(res.body).toEqual({
      id: 1,
      status: 'Active',
      user_id: '1',
    });
  });

  it('orders should get all orders', async () => {
    await request
      .get('/order')
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
      .expect([{ id: 1, status: 'Active', user_id: '1' }]);
  });

  it('orders should get order by ID', async () => {
    await request
      .get('/order/1')
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
      .expect({ id: 1, status: 'Active', user_id: '1' });
  });
});

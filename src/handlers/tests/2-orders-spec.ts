import app from '../../server';
import supertest from 'supertest';
import { token } from './1-users-spec';
import client from '../../database';
import { Order } from '../../models/orders';
import { Product } from '../../models/products';
import { OrderProducts } from '../../models/orders';

const request = supertest(app);

const order: Order = { status: 'Active', user_id: 1 };
const product: Product = { name: 'tommy tshirt', price: 35 };

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
    const res = await request
      .get('/order')
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
      .expect([{ id: 1, status: 'Active', user_id: '1' }]);
  });

  it('orders should get order by ID', async () => {
    const res = await request
      .get('/order/1')
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
      .expect({ id: 1, status: 'Active', user_id: '1' });
  });
});

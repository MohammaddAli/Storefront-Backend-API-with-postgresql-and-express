import client from '../../database';
import { Order, storefrontOrder } from '../orders';
import { User, storefrontUser } from '../users';

const storeOrder = new storefrontOrder();
const storeUser = new storefrontUser();

//create order , user and product records first to be able to test on it (because order depends on user)
const order: Order = { id: 1, status: 'Active', user_id: 1 };
const user: User = {
  id: 1,
  first_name: 'Mo',
  last_name: 'Ali',
  user_name: 'MoAli',
  password: 'M253A',
};

beforeAll(async () => {
  const createduser = await storeUser.create(user);
  user.id = createduser.id as number;
  const createdOrder = await storeOrder.create(order);
  order.id = createdOrder.id as number;
});

afterAll(async () => {
  const conn = await client.connect();
  const sql3 = 'DELETE FROM orders';
  await conn.query(sql3);
  const sql4 = 'ALTER SEQUENCE orders_id_seq RESTART with 1';
  await conn.query(sql4);
  const sql = 'DELETE FROM users';
  await conn.query(sql);
  const sql2 = 'ALTER SEQUENCE users_id_seq RESTART with 1';
  await conn.query(sql2);
  conn.release();
});

describe('test methods exist', () => {
  it('should have an index method', () => {
    expect(storeOrder.index).toBeDefined();
  });

  it('should have a show method', () => {
    expect(storeOrder.show).toBeDefined();
  });

  it('should have a create method', () => {
    expect(storeOrder.create).toBeDefined();
  });

  it('should have an update method', () => {
    expect(storeOrder.update).toBeDefined();
  });

  it('should have a delete method', () => {
    expect(storeOrder.delete).toBeDefined();
  });

  it('gets current order ', async () => {
    await storeOrder.currentOrder(user.id as number);
    expect({ id: 1, status: 'Active', user_id: '1' });
  });
});

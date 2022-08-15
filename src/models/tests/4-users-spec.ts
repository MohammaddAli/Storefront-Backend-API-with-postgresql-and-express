import client from '../../database';
import { User, storefrontUser } from '../users';

const userStore = new storefrontUser();

describe('users models test', () => {
  const user: User = {
    first_name: 'Mo',
    last_name: 'Ali',
    user_name: 'MoAli',
    password: 'M253A',
  };

  beforeAll(async () => {
    const createUser = await userStore.create(user);
    user.id = createUser.id;
  });
  // afterAll(async () => {
  //   const conn = await client.connect();
  //   const sql = 'DELETE FROM users';
  //   await conn.query(sql);
  //   const sql2 = 'ALTER SEQUENCE users_id_seq RESTART with 1';
  //   await conn.query(sql2);
  //   conn.release();
  // });

  it('the create methode should return a new created user', async () => {
    const createdUser = await userStore.create({
      first_name: 'Tom',
      last_name: 'Ali',
      user_name: 'TomAli',
      password: 'T253A',
    } as User);
    expect(createdUser?.first_name).toBe('Tom');
    expect(createdUser?.last_name).toBe('Ali');
    expect(createdUser?.user_name).toBe('TomAli');
  });

  it('the index methode should return all created users', async () => {
    const allUsers = await userStore.index();
    expect(allUsers?.[0].first_name).toBe('Mo');
    expect(allUsers?.[0].last_name).toBe('Ali');
    expect(allUsers?.[0].user_name).toBe('MoAli');
  });

  it('the show methode should return a user by ID', async () => {
    const showUser = await userStore.show(user.id as number);
    expect(showUser?.first_name).toBe('Mo');
    expect(showUser?.last_name).toBe('Ali');
    expect(showUser?.user_name).toBe('MoAli');
  });

  describe('test methods exist', () => {
    it('should have an index method', () => {
      expect(userStore.index).toBeDefined();
    });

    it('should have a show method', () => {
      expect(userStore.index).toBeDefined();
    });

    it('should have a create method', () => {
      expect(userStore.index).toBeDefined();
    });

    it('should have an update method', () => {
      expect(userStore.index).toBeDefined();
    });

    it('should have a delete method', () => {
      expect(userStore.index).toBeDefined();
    });

    it('should have an authenticate method', () => {
      expect(userStore.authenticate).toBeDefined();
    });
  });
});

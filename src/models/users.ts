import Client from '../database';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config();

const salt = process.env.SALT_ROUNDS;
const pepper = process.env.BCRYPT_PASSWORD;

export type User = {
  id?: number;
  first_name: string;
  last_name: string;
  user_name: string;
  password: string;
};

export class storefrontUser {
  async index(): Promise<User[]> {
    try {
      const conn = await Client.connect();
      const sql = 'SELECT * FROM users';
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Cannot get users ${err}`);
    }
  }

  async show(id: number): Promise<User> {
    try {
      const conn = await Client.connect();
      const sql = 'SELECT * FROM users WHERE id = ($1)';
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Cannot get user ${err}`);
    }
  }

  async create(user: User): Promise<User> {
    try {
      const conn = await Client.connect();
      const sql =
        'INSERT INTO users (first_name,last_name,user_name,password) VALUES($1, $2, $3, $4) RETURNING *';
      const hash = bcrypt.hashSync(
        user.password + pepper,
        parseInt(salt as string)
      );
      const result = await conn.query(sql, [
        user.first_name,
        user.last_name,
        user.user_name,
        hash,
      ]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Cannot create user ${err}`);
    }
  }

  async update(id: number, user: User): Promise<User> {
    try {
      const conn = await Client.connect();
      const sql =
        'UPDATE users SET first_name = ($1), last_name = ($2), user_name = ($3), password = ($4) WHERE id = ($5) RETURNING *';
      const hash = bcrypt.hashSync(
        `${user.password}${pepper}`,
        parseInt(salt as string)
      );
      const result = await conn.query(sql, [
        user.first_name,
        user.last_name,
        user.user_name,
        hash,
        id,
      ]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Cannot update user ${err}`);
    }
  }

  async delete(id: number): Promise<User> {
    try {
      const conn = await Client.connect();
      const sql = 'DELETE FROM users WHERE id = ($1)';
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Cannot delete user ${err}`);
    }
  }

  async authenticate(
    user_name: string,
    password: string
  ): Promise<User | null> {
    try {
      const conn = await Client.connect();
      const sql = 'SELECT password FROM users WHERE user_name=($1)';
      const result = await conn.query(sql, [user_name]);
      // conn.release();
      if (result.rows.length) {
        const retunedPass = result.rows[0];
        const isPasswordValid = bcrypt.compareSync(
          password + pepper,
          retunedPass.password
        );
        if (isPasswordValid) {
          const sql =
            'SELECT id, first_name, last_name, password FROM users WHERE user_name =($1)';
          const user = await conn.query(sql, [user_name]);
          return user.rows[0];
        }
      }
      conn.release();
      return null;
    } catch (error) {
      throw new Error(`cannot authenticate the user ${error}`);
    }
  }
}

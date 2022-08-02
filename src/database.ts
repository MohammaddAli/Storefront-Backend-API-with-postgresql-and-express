import dotenv from 'dotenv';
import { Pool } from 'pg';

dotenv.config();

let client = new Pool({});

const {
  POSTGTRES_HOST,
  POSTGTRES_DB,
  POSTGTRES_TEST_DB,
  POSTGTRES_USER,
  POSTGTRES_PASSWORD,
  ENV,
} = process.env;

console.log(`I am in the ${ENV} Environment`);

if (ENV === 'dev') {
  client = new Pool({
    host: POSTGTRES_HOST,
    database: POSTGTRES_DB,
    user: POSTGTRES_USER,
    password: POSTGTRES_PASSWORD,
  });
}

if (ENV === 'test') {
  client = new Pool({
    host: POSTGTRES_HOST,
    database: POSTGTRES_TEST_DB,
    user: POSTGTRES_USER,
    password: POSTGTRES_PASSWORD,
  });
}

export default client;

import 'colors';
import request from 'supertest';
import { app } from '../app';
import { connection } from '../config/database';

declare global {
  namespace NodeJS {
    interface Global {
      signup(): Promise<string[]>;
    }
  }
}

beforeAll(async () => {
  process.env.JWT_SECRET = 'test';
  await connection.create();
  console.log(`Connected To PostgreSQL Test Database`.blue.bold);
});

beforeEach(async () => {
  await connection.clear();
});

afterAll(async () => {
  await connection.close();
});

afterEach(async () => {
  await connection.clear();
});

global.signup = async () => {
  const email = 'test@test.com';
  const password = 'password';
  const username = 'test';

  const response = await request(app)
    .post('/signup')
    .send({ username, email, password })
    .expect(201);

  const cookie = response.get('Set-Cookie');

  return cookie;
};

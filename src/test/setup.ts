import 'colors';
import request from 'supertest';
import { app } from '../app';
import { connection } from '../config/database';

declare global {
  namespace NodeJS {
    interface Global {
      signup(
        username?: string,
        email?: string,
        password?: string,
      ): Promise<string[]>;
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

global.signup = async (
  username: string = 'test',
  email: string = 'test@test.com',
  password: string = 'password',
) => {
  const response = await request(app)
    .post('/signup')
    .send({ username, email, password })
    .expect(201);

  const cookie = response.get('Set-Cookie');

  return cookie;
};

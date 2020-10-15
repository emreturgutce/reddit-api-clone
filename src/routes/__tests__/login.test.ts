import request from 'supertest';
import { app } from '../../app';

describe('Login Route Handler Test Suite', () => {
  it('Should return 400 Bad Request for invalid email address', async () => {
    const response = await request(app)
      .post('/login')
      .send({
        email: 'notvalidemail',
        password: 'password',
      })
      .expect(400);

    expect(response.body.message).toEqual('Email must be valid');
  });

  it('Should return 400 Bad Request for invalid password', async () => {
    const response = await request(app)
      .post('/login')
      .send({
        email: 'test@test.com',
        password: '',
      })
      .expect(400);

    expect(response.body.message).toEqual(
      'Password must be between 4 and 20 characters',
    );
  });

  it('Should return 400 Bad Request for invalid email, password', async () => {
    const response = await request(app)
      .post('/login')
      .send({
        email: 'testcom',
        password: '',
      })
      .expect(400);

    expect(response.body.message).toContain('Email must be valid');
    expect(response.body.message).toContain(
      'Password must be between 4 and 20 characters',
    );
  });

  it('Should return 200 for successful login', async () => {
    const email = 'test@test.com';
    const password = 'test';

    await request(app).post('/signup').send({
      username: 'test',
      email,
      password,
    });

    await request(app)
      .post('/login')
      .send({
        email,
        password,
      })
      .expect(200);
  });
});

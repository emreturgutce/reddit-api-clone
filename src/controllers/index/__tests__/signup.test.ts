import request from 'supertest';
import { getRepository } from 'typeorm';
import { app } from '../../../app';
import { User } from '../../../models/user';

describe('Signup Route Handler Test Suite', () => {
  it('Should return 400 Bad Request for invalid email address', async () => {
    const response = await request(app)
      .post('/signup')
      .send({
        username: 'test',
        email: 'notvalidemail',
        password: 'password',
      })
      .expect(400);

    expect(response.body.message).toEqual('Email must be valid');
  });

  it('Should return 400 Bad Request for invalid password', async () => {
    const response = await request(app)
      .post('/signup')
      .send({
        username: 'test',
        email: 'test@test.com',
        password: '',
      })
      .expect(400);

    expect(response.body.message).toEqual(
      'Password must be between 4 and 20 characters',
    );
  });

  it('Should return 400 Bad Request for invalid username', async () => {
    const response = await request(app)
      .post('/signup')
      .send({
        username: '',
        email: 'test@test.com',
        password: 'password',
      })
      .expect(400);

    expect(response.body.message).toEqual('Username must be provided');
  });

  it('Should return 400 Bad Request and proper message for invalid username, password', async () => {
    const response = await request(app)
      .post('/signup')
      .send({
        username: '',
        email: 'test@test.com',
        password: '',
      })
      .expect(400);

    expect(response.body.message).toContain('Username must be provided');
    expect(response.body.message).toContain(
      'Password must be between 4 and 20 characters',
    );
  });

  it('Should return 201 for valid inputs', async () => {
    await request(app)
      .post('/signup')
      .send({
        username: 'test3',
        email: 'test3@test.com',
        password: 'test3',
      })
      .expect(201);
  });

  it('Should return 400 for not unique email', async () => {
    const email = 'test@test.com';

    await request(app).post('/signup').send({
      username: 'test',
      email,
      password: 'test',
    });

    const response = await request(app)
      .post('/signup')
      .send({
        username: 'test2',
        email,
        password: 'test',
      })
      .expect(400);

    expect(response.body.message).toEqual(
      'duplicate key value violates unique constraint',
    );
  });

  it('Should be same values in database', async () => {
    const username = 'test';
    const email = 'test@example.com';

    const response = await request(app).post('/signup').send({
      username,
      email,
      password: 'test',
    });

    const user = await getRepository(User).findOne(response.body.user.id);

    expect(user!.username).toEqual(username);
    expect(user!.email).toEqual(email);
  });

  it('Should return cookie', async () => {
    const response = await request(app).post('/signup').send({
      username: 'test',
      email: 'test@example.com',
      password: 'test',
    });

    expect(response.get('Set-Cookie')[0]).toBeDefined();
    expect(response.get('Set-Cookie')[0]).toMatch(/auth_token=.*/);
  });
});

import request from 'supertest';
import { app } from '../../../app';

describe('Index Route Handler Test Suite', () => {
  it('Should return 200 if logged in', async () => {
    await request(app)
      .get('/')
      .set('Cookie', (await global.signup())[0])
      .send()
      .expect(200);
  });

  it('Should return 401 if not logged in', async () => {
    await request(app).get('/').send().expect(401);
  });

  it('Should return 401 if token is wrong', async () => {
    await request(app).get('/').set('Cookie', 'wrongcookie').send().expect(401);
  });
});

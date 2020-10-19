import request from 'supertest';
import { app } from '../../../app';

describe('Get All Subreddits Route Handler Test Suite', () => {
  it('Should return 200 for authorized user', async () => {
    await request(app)
      .get('/r/all')
      .set('Cookie', (await global.signup())[0])
      .send()
      .expect(200);
  });

  it('Should return 401 for unauthorized user', async () => {
    await request(app)
      .get('/r/all')
      .set('Cookie', 'notavalidcookie')
      .send()
      .expect(401);
  });
});
